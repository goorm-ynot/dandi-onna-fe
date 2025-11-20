import Image from 'next/image';

export default function NaverPayIcon({ className }: { className?: string }) {
  return <Image src='/images/naverPay.svg' alt='네이버페이' width={24} height={24} className={className} />;
}
