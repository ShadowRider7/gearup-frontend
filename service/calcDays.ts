export const calcDays = (start: string, end: string) => {
  if (!start || !end) return 0;
  return Math.max(
    0,
    Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / 86400000),
  );
};
