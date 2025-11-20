import Image from 'next/image';

export default function KakaoPayIcon({ className }: { className?: string }) {
  return <Image src='/images/kakaoPay.svg' alt='카카오페이' width={20} height={20} className={className} />;
}
