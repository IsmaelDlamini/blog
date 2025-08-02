export const calculateReadTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  const formattedTime = `${minutes} min${minutes > 1 ? "s" : ""}`;
  return formattedTime;
};
