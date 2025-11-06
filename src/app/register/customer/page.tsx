'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z, { email } from 'zod';

// zod
const userFormSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다.'),
  email: z.string({ message: '아이디는 필수입니다.' }),
  password: z.string({ message: '비밀번호는 필수입니다.' }),
  phone_number: z.number({ message: '전화번호는 필수입니다.' }),
  terms_agreed: z.boolean(),
});

type UserFormData = z.infer<typeof userFormSchema>;

export default function CustomerRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      terms_agreed: true,
    },
  });

  const onSubmit = (data: UserFormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-6 max-w-xl mx-auto'>
      <div>
        <label className='block font-medium'>이름</label>
        <input {...register('name')} className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>

      <div>
        <label className='block font-medium'>아이디</label>
        <input {...register('email')} className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>

      <div>
        <label className='block font-medium'>전화번호</label>
        <input {...register('phone_number')} className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.phone_number && <p className='text-red-500'>{errors.phone_number.message}</p>}
      </div>

      <div>
        <label className='block font-medium'>아이디</label>
        <input {...register('email')} className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>
    </form>
  );
}
