const koDayString = ['월', '화', '수', '목', '금', '토', '일'];

// 날짜 세팅
export const getNowDateString = () => {
  const newDate = new Date();
  return `${newDate.getFullYear()}. ${newDate.getMonth() + 1}. ${newDate.getDate()} (${koDayString[newDate.getDay()]})`;
};

// 10분 단위 올림 처리 함수
export const roundToNext10Minutes = (date: Date): Date => {
  const newDate = new Date(date);
  const minutes = newDate.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 10) * 10;

  newDate.setMinutes(roundedMinutes, 0, 0);

  // 60분을 넘어가면 시간 증가 처리
  if (roundedMinutes >= 60) {
    newDate.setHours(newDate.getHours() + 1);
    newDate.setMinutes(0, 0, 0);
  }

  return newDate;
};
