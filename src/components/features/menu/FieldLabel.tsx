import { Label } from '@/components/ui/label';

interface FieldLabelProps {
  title: string;
  required?: boolean;
  optional?: boolean;
}

export function FieldLabel({ title, required = false, optional = false }: FieldLabelProps) {
  return (
    <div className='mb-2 flex items-center gap-2'>
      <Label className='body2 text-[#262626]'>{title}</Label>
      {required && <span className='caption3 text-[#F05B7F]'>필수</span>}
      {optional && <span className='caption3 text-[#B8B8B8]'>선택</span>}
    </div>
  );
}
