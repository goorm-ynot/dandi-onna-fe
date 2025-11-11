const koDayString = ['월', '화', '수', '목', '금', '토', '일'];

// 날짜 세팅
export const getNowDateString = () => {
  const newDate = new Date();
  return `${newDate.getFullYear()}. ${newDate.getMonth() + 1}. ${newDate.getDate()} (${koDayString[newDate.getDay()]})`;
};
