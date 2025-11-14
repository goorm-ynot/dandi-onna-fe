import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Reservation } from '@/types/boardData';
import { noShowFormSchema, NoShowFormValues } from '@/types/noShowFormZod';
import { roundToNext10Minutes } from '@/lib/dateParse';

export function useNoShowForm(defaultData?: Reservation) {
  const form = useForm<NoShowFormValues>({
    resolver: zodResolver(noShowFormSchema),
    defaultValues: {
      menus:
        defaultData?.menus?.map((menu) => ({
          menuId: menu.menuId,
          name: menu.name,
          price: menu.price,
          quantity: menu.qty, // 초기값
          maxQty: menu.qty, // 원래 예약된 수량
        })) || [],
      discount: 0,
      visitTime: 10,
    },
  });

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;
  const { fields, update, remove } = useFieldArray({
    control,
    name: 'menus',
  });

  // ✅ 수량 증가
  const increment = (index: number) => {
    const item = fields[index];
    if (item.quantity < item.maxQty) {
      update(index, { ...item, quantity: item.quantity + 1 });
    }
  };

  // ✅ 수량 감소 (1개 이하 불가)
  const decrement = (index: number) => {
    const item = fields[index];
    if (item.quantity > 1) {
      update(index, { ...item, quantity: item.quantity - 1 });
    }
  };

  // ✅ 삭제 (0 입력 대체)
  const deleteMenu = (index: number) => {
    remove(index);
  };

  // 🔹 실시간 합계 계산
  const watchedMenus = useWatch({ control, name: 'menus' });
  const watchedDiscount = useWatch({ control, name: 'discount' });

  const originalTotal = watchedMenus?.reduce((sum, menu) => sum + menu.price * menu.quantity, 0) || 0;
  const discountTotal = originalTotal * (1 - (watchedDiscount || 0) / 100);

  const onSubmit = handleSubmit((data) => {
    const now = new Date();
    const originVisitAt = new Date(now.getTime() + data.visitTime * 60 * 1000);
    const visitAt = roundToNext10Minutes(originVisitAt);

    const items = data.menus.map((menu) => ({
      menuId: menu.menuId,
      quantity: menu.quantity,
    }));

    // 보낼 데이터 위처럼 가공해야함
    const finalData = {
      items: items,
      discountPercent: data.discount,
      expireAfterMinutes: visitAt,
    };
    console.log('✅ 제출 데이터:', finalData);
  });

  return { form, fields, originalTotal, discountTotal, errors, increment, decrement, deleteMenu, onSubmit };
}
