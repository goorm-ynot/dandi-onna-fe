import { useForm, useFieldArray, useWatch, UseFormHandleSubmit } from 'react-hook-form';
import { useEffect, useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoShowMenu, Reservation } from '@/types/boardData';
import { noShowEditFormSchema, NoShowEditFormValues, noShowFormSchema, NoShowFormValues } from '@/types/noShowFormZod';
import { roundToNext10Minutes } from '@/lib/dateParse';
import { useReservationApi } from './useReservationApi';

// 노쇼 발생 폼
export function useNoShowForm(defaultData?: Reservation) {
  const { batchNoShow } = useReservationApi();
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<NoShowFormValues | null>(null);

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
  const watchedDuringTime = useWatch({ control, name: 'duringTime' });

  const originalTotal = watchedMenus?.reduce((sum, menu) => sum + menu.price * menu.quantity, 0) || 0;
  const discountTotal = originalTotal * (1 - (watchedDiscount || 0) / 100);

  // ✅ duringTime 기반으로 visitTime 계산 (생성 모드)
  const calculatedVisitTime = watchedDuringTime
    ? roundToNext10Minutes(new Date(new Date().getTime() + watchedDuringTime * 60 * 1000))
    : new Date();

  // ✅ Dialog에서 확정했을 때 실제 제출 처리
  const handleConfirmSubmit = useCallback(() => {
    if (!pendingFormData) return;

    const now = new Date();
    const originVisitAt = new Date(now.getTime() + pendingFormData.duringTime * 60 * 1000);
    const visitAt = roundToNext10Minutes(originVisitAt);

    const items = pendingFormData.menus.map((menu) => ({
      menuId: menu.menuId,
      quantity: menu.quantity,
    }));

    const finalData = {
      items: items,
      discountPercent: pendingFormData.discount,
      expireAfterMinutes: visitAt,
    };

    console.log('✅ 확정된 제출 데이터:', finalData);
    batchNoShow(finalData);
    setIsSubmitDialogOpen(false);
    setPendingFormData(null);
  }, [pendingFormData, batchNoShow]);

  // ✅ Dialog 취소
  const handleCancelSubmit = useCallback(() => {
    setIsSubmitDialogOpen(false);
    setPendingFormData(null);
  }, []);

  const onSubmit = handleSubmit((data) => {
    // Dialog를 띄우고 데이터를 pending 상태에 저장
    setPendingFormData(data);
    setIsSubmitDialogOpen(true);
  });

  return {
    form,
    fields,
    originalTotal,
    discountTotal,
    errors,
    increment,
    decrement,
    deleteMenu,
    onSubmit,
    visitTime: calculatedVisitTime,
    // Dialog 관련
    isSubmitDialogOpen,
    setIsSubmitDialogOpen,
    handleConfirmSubmit,
    handleCancelSubmit,
    pendingFormData,
  };
}

// 노쇼 메뉴 관리 폼
export function useNoShowMenuForm(defaultData?: NoShowMenu) {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<NoShowEditFormValues | null>(null);

  const form = useForm<NoShowEditFormValues>({
    resolver: zodResolver(noShowEditFormSchema),
    defaultValues: {
      noshowPostsId: 0,
      menuId: '',
      name: '',
      quantity: 1,
      price: 0,
      discountPercent: 0,
      visitTime: new Date().toISOString(),
    },
  });

  const { control, handleSubmit, formState, setValue, watch, reset } = form;
  const { errors } = formState;

  // ✅ 서버에서 받은 원본 visitTime 저장
  const [originalVisitTime, setOriginalVisitTime] = useState<Date>(new Date());

  // ✅ defaultData가 변경되면 폼 리셋
  useEffect(() => {
    if (defaultData) {
      // ✅ visitTime 문자열을 Date로 변환
      // "2025-11-16T18:30:00+09:00" 형식 처리
      let serverVisitTime: Date;

      try {
        // 먼저 표준 파싱 시도
        serverVisitTime = new Date(defaultData.visitTime);

        // Invalid Date 체크
        if (isNaN(serverVisitTime.getTime())) {
          throw new Error('Invalid date');
        }
      } catch {
        // fallback: 수동 파싱
        console.error('❌ Standard parsing failed, using manual parsing:', defaultData.visitTime);
        try {
          const timeStr = String(defaultData.visitTime).replace(/([+-]\d{2}):(\d{2})$/, '$1$2');
          const parsed = timeStr.split(/[T+-]/);
          const [date, time] = [parsed[0], parsed[1]];
          const [year, month, day] = date.split('-').map(Number);
          const [hour, minute, second] = time.split(':').map(Number);
          serverVisitTime = new Date(year, month - 1, day, hour, minute, second || 0);

          if (isNaN(serverVisitTime.getTime())) {
            throw new Error('Manual parsing also failed');
          }
        } catch {
          console.error('❌ All parsing failed, using current date');
          serverVisitTime = new Date();
        }
      }

      console.log('✅ 파싱된 visitTime:', serverVisitTime.toISOString());
      setOriginalVisitTime(serverVisitTime); // 원본 시간 저장

      reset({
        noshowPostsId: defaultData.noshowPostsId,
        menuId: defaultData.menuId,
        name: defaultData.name,
        quantity: defaultData.quantity,
        price: defaultData.price,
        discountPercent: defaultData.discountPercent,
        visitTime: serverVisitTime.toISOString(), // ISO 문자열로 저장
      });
      console.log('폼 데이터 리셋:', defaultData);
    }
  }, [defaultData, reset]);

  // ✅ 현재 수량과 할인율 감시
  const quantity = watch('quantity');
  const price = watch('price');
  const discountPercent = watch('discountPercent');
  const duringTime = watch('duringTime');
  const visitTimeStr = watch('visitTime');

  // ✅ 계산된 visitTime (Date 객체, 항상 유효함)
  const [calculatedVisitTime, setCalculatedVisitTime] = useState<Date>(new Date());

  // ✅ duringTime이 변경되면 visitTime 재계산
  useEffect(() => {
    if (defaultData && duringTime && originalVisitTime) {
      // 기준 시간 + duringTime = 새로운 방문 시간
      const newVisitTime = new Date(originalVisitTime.getTime() + duringTime * 60 * 1000);
      setCalculatedVisitTime(newVisitTime);
    } else if (!duringTime || duringTime === 0) {
      // duringTime이 없으면 원본 시간 유지
      setCalculatedVisitTime(originalVisitTime);
    }
  }, [duringTime, defaultData, originalVisitTime]);

  // ✅ visitTimeStr이 변경될 때마다 계산된 시간 업데이트
  useEffect(() => {
    try {
      const parsedDate = new Date(visitTimeStr);
      if (!isNaN(parsedDate.getTime())) {
        setCalculatedVisitTime(parsedDate);
      }
    } catch {
      // 파싱 실패 시 기존 값 유지
    }
  }, [visitTimeStr]);

  // ✅ 수량 증가
  const increment = () => {
    setValue('quantity', quantity + 1);
  };

  // ✅ 수량 감소 (1개 이하 불가)
  const decrement = () => {
    if (quantity > 1) {
      setValue('quantity', quantity - 1);
    }
  };

  // 🔹 실시간 금액 계산
  const originalTotal = price * quantity;
  const discountTotal = originalTotal * (1 - discountPercent / 100);

  // ✅ Dialog에서 확정했을 때 실제 제출 처리
  const handleConfirmSubmit = useCallback(() => {
    if (!pendingFormData) return;

    console.log('✅ 수정 확정 데이터:', {
      ...pendingFormData,
      visitTime: calculatedVisitTime.toISOString(),
    });
    // TODO: 실제 API 호출 로직 추가
    setIsSubmitDialogOpen(false);
    setPendingFormData(null);
  }, [pendingFormData, calculatedVisitTime]);

  // ✅ Dialog 취소
  const handleCancelSubmit = useCallback(() => {
    setIsSubmitDialogOpen(false);
    setPendingFormData(null);
  }, []);

  const onSubmit = handleSubmit((data) => {
    // Dialog를 띄우고 데이터를 pending 상태에 저장
    setPendingFormData(data);
    setIsSubmitDialogOpen(true);
  });

  return {
    form,
    errors,
    quantity,
    originalTotal,
    discountTotal,
    increment,
    decrement,
    onSubmit,
    visitTime: calculatedVisitTime, // 항상 유효한 Date 객체 반환
    // Dialog 관련
    isSubmitDialogOpen,
    setIsSubmitDialogOpen,
    handleConfirmSubmit,
    handleCancelSubmit,
    pendingFormData,
  };
}
