export const formatDate = (dateString: string) => {
  if (!dateString) return;

  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateString));
};

export const formatDateParts = (dateString: string) => {
  if (!dateString) {
    return {
      displayDate: '',
      displayTime: '',
      dateAttr: '',
      timeAttr: '',
    };
  }

  const date = new Date(dateString);

  const displayDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
  }).format(date);

  const displayTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  const dateAttr = date.toISOString().split('T')[0];
  const timeAttr = date.toTimeString().slice(0, 5);

  return {
    displayDate,
    displayTime,
    dateAttr,
    timeAttr,
  };
};
