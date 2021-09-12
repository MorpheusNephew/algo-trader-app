export const getDateSecondsFromNow = (seconds: number): string => {
  const currentDate = new Date();
  currentDate.setSeconds(currentDate.getSeconds() + seconds);

  return currentDate.toISOString();
};
