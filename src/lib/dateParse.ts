const koDayString = ['일', '월', '화', '수', '목', '금', '토'];

// 날짜 세팅
export const getNowDateString = (date?: Date) => {
  const newDate = date || new Date();
  return `${newDate.getFullYear()}. ${newDate.getMonth() + 1}. ${newDate.getDate()} (${koDayString[newDate.getDay()]})`;
};

// 날짜 세팅 (ex: 2025-01-01)
export const getNowDateHyphenString = () => {
  const newDate = new Date();
  return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
};

// 10분 단위 올림 처리 함수
export const roundToNext10Minutes = (date: Date): Date => {
  const newDate = new Date(date);
  const minutes = newDate.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 10) * 10;

  newDate.setMinutes(roundedMinutes, 0, 0);

  // 60분을 넘어가면 시간 증가 처리
  // if (roundedMinutes >= 60) {
  //   newDate.setHours(newDate.getHours() + 1);
  //   newDate.setMinutes(0, 0, 0);
  // }

  return newDate;
};

// 시간 문자열 포맷팅
export const formatTimeString = (date: Date, hours24 = false): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: !hours24 });
};

// 시간 문자열 포맷팅 (HH시 MM분 형식)
export const formatTimeWithKoreanUnit = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}시 ${minutes}분`;
};

// 일시 문자열 포맷팅
export const formatDateTimeString = (date: Date): string => {
  return getNowDateString(date) + ' ' + formatTimeString(date, true);
};
