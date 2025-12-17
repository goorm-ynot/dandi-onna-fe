import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UseNoShowFormResult, UseNoShowMenuFormResult } from '@/types/noShowPanelType';
import NumberStepper from '@/components/features/customer/NumberStepper';

interface MenuQuantityListProps {
  formResult: UseNoShowFormResult | UseNoShowMenuFormResult;
}

export default function MenuQuantityList({ formResult }: MenuQuantityListProps) {
  const { control } = useFormContext();

  // ✅ 생성 폼인지 체크
  const isCreateForm = 'fields' in formResult;

  if (!isCreateForm) {
    // 수정 폼: 단일 메뉴
    const { errors, quantity, increment, decrement } = formResult;
    const menu = control._formValues; // 현재 폼 값

    return (
      <div className='flex flex-col gap-24 px-20'>
        <div className='grid grid-cols-2 gap-20 justify-items-stretch w-full'>
          <Label className='body3 text-foreground-normal text-left'>{menu.name}</Label>
          <Label className='body5 text-foreground-normal text-right'>{menu.price?.toLocaleString()}원</Label>

          <Controller
            control={control}
            name='quantity'
            render={({ field }) => (
              <div className='flex flex-col gap-1'>
                <NumberStepper
                  value={field.value}
                  min={1}
                  max={menu.maxQty || 100}
                  division='seller'
                  onChange={field.onChange}
                />
                {errors.quantity && <p className='text-red-500 text-sm'>{errors.quantity?.message}</p>}
              </div>
            )}
          />
        </div>
      </div>
    );
  }

  // 생성 폼: 여러 메뉴
  const { fields, errors, increment, decrement, deleteMenu } = formResult;

  return (
    <div className='flex flex-col gap-24 px-20  '>
      {fields.map((menu, index) => (
        <div key={menu.id} className='grid grid-cols-2 gap-20 justify-items-stretch w-full'>
          <Label className='body3 text-left'>{menu.name}</Label>
          <Label className='body5 text-right'>{menu.price.toLocaleString()}원</Label>

          <Controller
            control={control}
            name={`menus.${index}.quantity`}
            render={({ field }) => (
              <div className='flex flex-col gap-1'>
                <NumberStepper
                  value={field.value}
                  min={1}
                  max={menu.maxQty}
                  division='seller'
                  onChange={field.onChange}
                />
                {errors.menus?.[index]?.quantity && (
                  <p className='text-red-500 text-sm'>{errors.menus[index]?.quantity?.message}</p>
                )}
              </div>
            )}
          />

          <Button
            type='button'
            size='sm'
            variant={'outline'}
            onClick={() => deleteMenu(index)}
            className='max-w-[68px] justify-self-end'>
            삭제
          </Button>
        </div>
      ))}
    </div>
  );
}
