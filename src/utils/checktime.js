export const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, '0');
  const minutes = i % 2 === 0 ? '00' : '30';
  const label = `${hours}:${minutes}`;
  const value = `${hours}:${minutes}`;
  return { label, value };
});