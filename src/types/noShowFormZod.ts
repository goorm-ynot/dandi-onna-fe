import { z } from 'zod';

// 생성용 스키마 (menus는 배열)
export const noShowFormSchema = z.object({
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
  duringTime: z
    .number({ message: '방문 시간을 입력해주세요' })
    .min(10, '최소 10분 이상 입력해주세요')
    .max(300, '최대 300분까지 입력 가능합니다'),
});

// 수정용 스키마 (단일 메뉴 객체)
export const noShowEditFormSchema = z.object({
  noshowPostsId: z.number(),
  menuId: z.string(),
  name: z.string(),
  quantity: z.number().min(1, '1개 이상 선택해야 합니다'),
  price: z.number().min(0),
  discountPercent: z
    .number({ message: '할인율을 입력해주세요' })
    .min(0, '할인율은 0% 이상이어야 합니다')
    .max(90, '최대 90%까지 입력 가능합니다'),
  duringTime: z
    .union([z.number(), z.nan(), z.undefined()])
    .transform((val) => {
      if (val === undefined) return undefined;
      return Number.isNaN(val) ? 0 : val;
    })
    .refine((val) => val === undefined || val === 0 || (val >= 10 && val <= 300), {
      message: '방문 시간은 10분 이상 300분 이하여야 합니다',
    })
    .optional(),
  visitTime: z.string(), // ISO 8601 형식의 실제 방문 시간
});

export type NoShowFormValues = z.infer<typeof noShowFormSchema>;
export type NoShowEditFormValues = z.infer<typeof noShowEditFormSchema>;
