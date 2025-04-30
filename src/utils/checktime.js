export const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor((i + 1) / 2);
  const minutes = (i + 1) % 2 === 0 ? '00' : '30';
  const label =
    minutes === '00'
      ? `${hours}시간`
      : `${hours}시간${minutes}분`;
  const value = hours + (minutes === '30' ? 0.5 : 0);
  return { label, value };
});4
