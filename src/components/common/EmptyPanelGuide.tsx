/**
 * 빈 패널 가이드 컴포넌트
 * - 선택된 항목이 없을 때 표시되는 가이드
 * - 페이지별 설정을 받아서 렌더링
 */

import Notice, { NoticeContent, NoticeDescription, NoticeTitle } from '@/components/features/ui/Notice';
import { EmptyPanelConfig, EmptyPanelVariant } from '@/constants/emptyPanelConfigs';
import { Reservation } from '@/types/boardData';
import { Info } from 'lucide-react';
import clsx from 'clsx';

interface EmptyPanelGuideProps {
  /** 페이지별 설정 */
  config: EmptyPanelConfig;
  /** 예약 데이터 배열 */
  reservations: Reservation[];
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 우선순위에 따라 표시할 variant 결정
 * 우선순위: error > warning > info > default
 */
const determineVariant = (reservations: Reservation[]): EmptyPanelVariant => {
  if (!reservations || reservations.length === 0) {
    return 'info';
  }

  // error 우선순위 (나중에 구현)
  // const hasError = reservations.some((res) => res.status === 'ERROR');
  // if (hasError) return 'error';

  // warning 우선순위: LATE가 한 개라도 있는 경우
  const hasLate = reservations.some((res) => res.status === 'LATE');
  if (hasLate) return 'warning';

  // success 우선순위: NOSHOW가 있는 경우
  const hasNoShow = reservations.some((res) => res.status === 'NOSHOW');
  if (hasNoShow) return 'success';

  // default: 데이터가 없거나 모든 데이터가 PENDING인 경우
  return 'info';
};

export const EmptyPanelGuide = ({ config, reservations, className }: EmptyPanelGuideProps) => {
  const variant = determineVariant(reservations);
  const noticeContent = config[variant] || config.default || config.info;

  return (
    <div className={clsx('flex flex-col items-center w-full h-full px-20 pt-[36px] pb-20 gap-24', className)}>
      {/* 상태 알림 Notice */}
      <Notice
        variant={variant}
        icon={
          <Info
            className={clsx('icon-m', {
              'text-system-red-strong': variant === 'error',
              'text-system-yellow-strong': variant === 'warning',
              'text-system-green-strong': variant === 'success',
              'text-primitives-brand': variant === 'info',
            })}
          />
        }
        title={noticeContent?.title}
        description={noticeContent?.description}
      />

      {/* 가이드 Notice */}
      <Notice variant={'default'}>
        <NoticeContent className="px-16 py-20 flex flex-col gap-20">
          <NoticeTitle>{noticeContent.guideTitle}</NoticeTitle>
          <NoticeDescription className="pl-4">
            <ul className="list-disc flex flex-col gap-12">
              {noticeContent.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </NoticeDescription>
        </NoticeContent>
      </Notice>
    </div>
  );
};
