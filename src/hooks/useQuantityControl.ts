// hooks/useQuantityControl.ts
import { UseFormSetValue, UseFormWatch, FieldPath, FieldValues } from 'react-hook-form';

export function useQuantityControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  setValue: UseFormSetValue<TFieldValues>,
  watch: UseFormWatch<TFieldValues>,
  fieldName: TName = 'quantity' as TName,
  minQuantity = 1
) {
  const quantity = watch(fieldName);

  const increment = () => {
    setValue(fieldName, (quantity + 1) as any);
  };

  const decrement = () => {
    if (quantity > minQuantity) {
      setValue(fieldName, (quantity - 1) as any);
    }
  };

  return {
    quantity,
    increment,
    decrement,
  };
}
