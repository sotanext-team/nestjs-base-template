export const calculateTTL = (attempt: number) => {
  const factor = 4;
  const interval = 60;
  return (interval + Math.pow(attempt, factor)) * 1000;
};
