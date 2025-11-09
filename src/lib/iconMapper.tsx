import { Lock, AlertCircle, type LucideIcon } from 'lucide-react';

// 아이콘 매핑 객체
export const iconMap: Record<string, LucideIcon> = {
  Lock,
  AlertCircle,
};

// 아이콘 렌더링 컴포넌트
export const DynamicIcon = ({
  name,
  size = 16,
  className = '',
}: {
  name: string;
  size?: number;
  className?: string;
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // 아이콘을 찾을 수 없는 경우 기본 아이콘 또는 null 반환
    return <AlertCircle size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};
