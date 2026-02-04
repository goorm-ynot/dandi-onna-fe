/**
 * 빈 패널 가이드 컴포넌트
 * - 선택된 항목이 없을 때 표시되는 가이드
 * - 페이지별 설정과 variant를 받아서 렌더링
 * - 범용 컴포넌트: variant 판단 로직은 부모 컴포넌트에서 처리
 */

import Notice, { NoticeContent, NoticeDescription, NoticeTitle } from '@/components/features/ui/Notice';
import { EmptyPanelConfig, EmptyPanelVariant } from '@/constants/emptyPanelConfigs';
import { Info } from 'lucide-react';
import clsx from 'clsx';

interface EmptyPanelGuideProps {
  /** 페이지별 설정 */
  config: EmptyPanelConfig;
  /** 표시할 variant (부모에서 판단하여 전달) */
  variant: EmptyPanelVariant;
  /** 추가 클래스명 */
  className?: string;
}

export const EmptyPanelGuide = ({ config, variant, className }: EmptyPanelGuideProps) => {
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
        <NoticeContent className="flex flex-col gap-20">
          {noticeContent.guideTitle && <NoticeTitle>{noticeContent.guideTitle}</NoticeTitle>}
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
