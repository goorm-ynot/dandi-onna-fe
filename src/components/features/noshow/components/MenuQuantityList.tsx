import React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseNoShowFormResult } from '@/types/noShowPanelType';

interface MenuQuantityListProps {
  formResult: UseNoShowFormResult;
}

export default function MenuQuantityList({ formResult }: MenuQuantityListProps) {
  const {
    fields,
    form: { control },
    errors,
    increment,
    decrement,
    deleteMenu,
  } = formResult;

  return (
    <div className='flex flex-col gap-24 px-20  '>
      {fields.map((menu, index) => (
        <div key={menu.id} className='grid grid-cols-2 gap-20 justify-items-stretch w-full'>
          <Label className='body3 text-left'>{menu.name}</Label>
          <Label className='body5 text-right'>{menu.price.toLocaleString()}원</Label>

          <div className='flex flex-row gap-2'>
            <Button type='button' size='xs' variant='default' onClick={() => decrement(index)}>
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
                    className='w-[60px] h-[38px] rounded text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  />
                  {errors.menus?.[index]?.quantity && (
                    <p className='text-red-500 text-sm'>{errors.menus[index]?.quantity?.message}</p>
                  )}
                </>
              )}
            />

            <Button type='button' size='xs' variant='secondary' onClick={() => increment(index)}>
              +
            </Button>
          </div>

          <Button
            type='button'
            size='sm'
            variant='outline'
            onClick={() => deleteMenu(index)}
            className='max-w-[68px] justify-self-end'>
            삭제
          </Button>
        </div>
      ))}
    </div>
  );
}
