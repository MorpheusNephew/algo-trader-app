export const daysUntilExpire = (dateString: string): number => {
  const currentDate = Date.now();
  const date = new Date(dateString);

  console.log('currentDate', currentDate);
  console.log('date', date);

  return 0;
};
