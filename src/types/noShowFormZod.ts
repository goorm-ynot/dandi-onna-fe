import { z } from 'zod';

const baseMenuSchema = z.object({
  menus: z
    .array(
      z.object({
        menuId: z.string(),
        name: z.string(),
        price: z.number().min(0),
        quantity: z.number().min(1, '1개 이상 선택해야 합니다'),
        maxQty: z.number().min(1),
      })
    )
    .nonempty('메뉴를 최소 1개 이상 선택해야 합니다')
    .superRefine((menus, ctx) => {
      menus.forEach((menu, index) => {
        if (menu.quantity > menu.maxQty) {
          ctx.addIssue({
            path: [index, 'quantity'],
            code: z.ZodIssueCode.custom,
            message: `예약 수량(${menu.maxQty})을 초과할 수 없습니다`,
          });
        }
      });
    }),
  discount: z
    .number({ message: '할인율을 입력해주세요' })
    .min(0, '할인율은 0% 이상이어야 합니다')
    .max(90, '최대 90%까지 입력 가능합니다'),
});

// 생성용 스키마 (visitTime 필수)
export const noShowFormSchema = baseMenuSchema.extend({
  visitTime: z
    .number({ message: '방문 시간을 입력해주세요' })
    .min(10, '최소 10분 이상 입력해주세요')
    .max(300, '최대 300분까지 입력 가능합니다'),
});

// 수정용 스키마 (visitTime 선택적)
export const noShowEditFormSchema = baseMenuSchema.extend({
  visitTime: z.number().min(10, '최소 10분 이상 입력해주세요').max(300, '최대 300분까지 입력 가능합니다').optional(),
});

export type NoShowFormValues = z.infer<typeof noShowFormSchema>;
export type NoShowEditFormValues = z.infer<typeof noShowEditFormSchema>;
