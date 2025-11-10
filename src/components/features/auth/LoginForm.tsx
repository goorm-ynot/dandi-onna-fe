// components/auth/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// 폼 유효성 검사 스키마
const loginSchema = z.object({
  userId: z.string(),
  password: z.string().min(2, '비밀번호는 최소 2자 이상이어야 합니다'),
  role: z.enum(['CUSTOMER', 'OWNER']).describe('역할을 선택해주세요'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: 'owner@example.com',
      password: 'pass123!',
      role: 'CUSTOMER',
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    if (!onSubmit) return;

    setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center'>로그인</CardTitle>
        <CardDescription className='text-center'>계정에 로그인하여 서비스를 이용하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            {/* 이메일 필드 */}
            <FormField
              control={form.control}
              name='userId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input type='userId' placeholder='userId' {...field} className='w-full' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 필드 */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='비밀번호를 입력하세요'
                        {...field}
                        className='w-full pr-10'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 역할 선택 */}
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>역할</FormLabel>
                  <FormControl>
                    <div className='flex space-x-4'>
                      <label className='flex items-center space-x-2 cursor-pointer'>
                        <input
                          type='radio'
                          value='CUSTOMER'
                          checked={field.value === 'CUSTOMER'}
                          onChange={() => field.onChange('CUSTOMER')}
                          className='w-4 h-4 text-blue-600'
                        />
                        <span>소비자</span>
                      </label>
                      <label className='flex items-center space-x-2 cursor-pointer'>
                        <input
                          type='radio'
                          value='OWNER'
                          checked={field.value === 'OWNER'}
                          onChange={() => field.onChange('OWNER')}
                          className='w-4 h-4 text-blue-600'
                        />
                        <span>사업자</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 로그인 버튼 */}
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
