import Link from 'next/link';

// 권한 없음 페이지
export default function UnauthorizedPage() {
  return (
    <div>
      <h1>접근 권한이 없습니다</h1>
      <p>사업자 권한이 필요한 페이지입니다.</p>
      <Link href='/'>메인 페이지로 돌아가기</Link>
    </div>
  );
}
