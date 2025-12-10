import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseNoShowFormResult, UseNoShowMenuFormResult } from '@/types/noShowPanelType';
import { CloudCog } from 'lucide-react';

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

          <div className='flex flex-row gap-[2px]'>
            <Button 
              type='button' 
              variant={quantity <= 1 ? 'outline' : 'destructive'} 
              size='xs' 
              onClick={decrement}
            >
              -
            </Button>

            <Controller
              control={control}
              name='quantity'
              render={({ field }) => (
                <>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 1) field.onChange(value);
                    }}
                    className='w-[60px] h-[38px] rounded text-center bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  />
                  {errors.quantity && <p className='text-red-500 text-sm'>{errors.quantity?.message}</p>}
                </>
              )}
            />

            <Button 
              type='button' 
              size='xs' 
              variant={'destructive'} 
              onClick={increment}
            >
              +
            </Button>
          </div>
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

          <div className='flex flex-row gap-2'>
            <Button 
              type='button'
              size='xs' 
              variant={menu.quantity <= 1 ? 'outline' : 'destructive'} 
              disabled={menu.quantity <= 1}
              onClick={() => decrement(index)}
            >
              -
            </Button>

            <Controller
              control={control}
              name={`menus.${index}.quantity`}
              render={({ field }) => (
                <>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 1 && value <= menu.maxQty) field.onChange(value);
                    }}
                    className='w-[60px] h-[38px] rounded text-center bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  />
                  {errors.menus?.[index]?.quantity && (
                    <p className='text-red-500 text-sm'>{errors.menus[index]?.quantity?.message}</p>
                  )}
                </>
              )}
            />

            <Button 
              type='button' 
              size='xs' 
              variant={menu.quantity >= menu.maxQty ? 'outline' : 'destructive'}
              disabled={menu.quantity >= menu.maxQty}
              onClick={() => increment(index)}
            >
              +
            </Button>
          </div>

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
