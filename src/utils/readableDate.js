export const readableDate = (dateString) => {
  const date = new Date(dateString);
  const readableDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return readableDate;
};
