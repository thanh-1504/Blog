export function useFormatDate(dateCreated) {
  const day = dateCreated?.toDate().getDate();
  const month = dateCreated?.toDate().getMonth() + 1;
  const year = dateCreated?.toDate().getFullYear();
  return {
    day,
    month,
    year,
  };
}
