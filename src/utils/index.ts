export const diffDays = (first: Date, second: Date) => {
  return Math.round((second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
} 

export const diffToString = (diff: number) => {
  switch (diff) {
    case 0:
      return 'Сегодня';
    case 1:
      return 'Вчера';
    default:
      return `${diff} дня назад`;
  }
}