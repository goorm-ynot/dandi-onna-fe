'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// zod 스키마 정의
const shopFormSchema = z.object({
  shopName: z.string().min(1, '가게명은 필수입니다'),
  category: z.string(),
  phone: z
    .string()
    .regex(/^[0-9]+$/, '전화번호는 숫자만 입력해주세요')
    .min(10, '전화번호는 최소 10자리 이상입니다')
    .max(11, '전화번호는 최대 11자리까지 가능합니다'),
  address: z.string().min(1, '주소를 입력해주세요'),
  latitude: z.number({ message: '위도는 숫자여야 합니다' }),
  longitude: z.number({ message: '경도는 숫자여야 합니다' }),
  // businessHours: z.array(z.string()).length(7, '요일별 영업시간을 입력해주세요'),
  opening_hours: z.string({ message: '오픈시간은 숫자여야 합니다' }), // time
  ending_hours: z.string({ message: '오픈시간은 숫자여야 합니다' }), // time
  email: z.string().min(1, '아이디를 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

// TypeScript 타입 추출
type ShopFormData = z.infer<typeof shopFormSchema>;

export default function ShopFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShopFormData>({
    resolver: zodResolver(shopFormSchema),
    defaultValues: {
      category: '요식업',
    },
  });

  const onSubmit = (data: ShopFormData) => {
    alert(JSON.stringify(data, null, 2)); // 실제 요청으로 교체 가능
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-6 max-w-xl mx-auto'>
      <div>
        <label className='block font-medium'>가게명</label>
        <input {...register('shopName')} className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.shopName && <p className='text-red-500'>{errors.shopName.message}</p>}
      </div>

      <div>
        <label className='block font-medium'>업종</label>
        <select {...register('category')} className='border border-gray-300 rounded-lg p-2 w-full'>
          <option value='요식업'>요식업</option>
          <option value='소매업'>소매업</option>
          <option value='서비스업'>서비스업</option>
        </select>
      </div>

      <div>
        <label className='block font-medium'>전화번호</label>
        <input {...register('phone')} className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
      </div>

      <div>
        <label className='block font-medium'>주소</label>
        <input {...register('address')} className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block font-medium'>위도 (Latitude)</label>
          <input
            type='number'
            step='any'
            {...register('latitude', { valueAsNumber: true })}
            className='border border-gray-300 rounded-lg p-2 w-full'
          />
          {errors.latitude && <p className='text-red-500'>{errors.latitude.message}</p>}
        </div>

        <div>
          <label className='block font-medium'>경도 (Longitude)</label>
          <input
            type='number'
            step='any'
            {...register('longitude', { valueAsNumber: true })}
            className='border border-gray-300 rounded-lg p-2 w-full'
          />
          {errors.longitude && <p className='text-red-500'>{errors.longitude.message}</p>}
        </div>
      </div>

      <div>
        <label className='block font-medium'>오픈시간</label>
        <input {...register(`opening_hours`)} className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.opening_hours && <p className='text-red-500'>{errors.opening_hours.message}</p>}
      </div>
      <div>
        <label className='block font-medium'>마감시간</label>
        <input {...register(`ending_hours`)} className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.ending_hours && <p className='text-red-500'>{errors.ending_hours.message}</p>}
      </div>

      <div>
        <label className='block font-medium'>아이디</label>
        <input {...register('email')} defaultValue='' className='border border-gray-300 rounded-lg p-2 w-full' />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>

      <div>
        <label className='block font-medium'>비밀번호</label>
        <input
          {...register('password')}
          type='password'
          defaultValue=''
          className='border border-gray-300 rounded-lg p-2 w-full'
        />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      </div>

      <button type='submit' className='bg-green-500 text-white rounded-lg p-2 w-full btn-primary'>
        등록하기
      </button>
    </form>
  );
}
