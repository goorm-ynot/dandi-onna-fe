/**
 * HTTP 이미지 URL을 HTTPS 프록시로 변환
 * Mixed Content 오류 방지
 */
export function getProxiedImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return '/images/placeholder.png'; // 기본 플레이스홀더
  }

  // 이미 HTTPS이거나 상대 경로면 그대로 반환
  if (imageUrl.startsWith('https://') || imageUrl.startsWith('/')) {
    return imageUrl;
  }

  // HTTP URL이면 프록시를 통해 반환
  if (imageUrl.startsWith('http://')) {
    return `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
  }

  return imageUrl;
}

/**
 * 여러 이미지 URL을 일괄 변환
 */
export function getProxiedImageUrls(imageUrls: (string | null | undefined)[]): string[] {
  return imageUrls.map(getProxiedImageUrl);
}
