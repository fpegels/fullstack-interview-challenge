type JSONDate = string;

export const diffDays = (_date1: JSONDate = "", _date2: JSONDate = "") => {
  const date1 = new Date(_date1);
  const date2 = new Date(_date2);

  const diff = date2.getTime() - date1.getTime();

  const days = Math.ceil(diff / (1000 * 3600 * 24));

  return days;
};
