export const getMissingFields = (a: any[], b: any[]) => {
  return a
    .filter((x) => !b.includes(x))
    .map((x) => x.toString() + ' is missing');
};
