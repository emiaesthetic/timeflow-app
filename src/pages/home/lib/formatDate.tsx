export const formatDate = (date: string) => {
  if (!date) return;

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};
