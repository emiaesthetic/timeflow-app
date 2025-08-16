export const dateApi = {
  locale: 'en-US',

  isSameDay(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  },

  getLocalDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
  },

  formatDateForInput(date: Date): string {
    return new Intl.DateTimeFormat(this.locale, {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  },

  formatTimeForInput(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  },

  formatDateForDisplay(date: Date): string {
    return new Intl.DateTimeFormat(this.locale, {
      month: 'long',
      day: 'numeric',
    }).format(date);
  },

  formatTimeForDisplay(date: Date): string {
    return new Intl.DateTimeFormat(this.locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  },

  formatDateForHtmlAttr(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  },

  formatTimeForHtmlAttr(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  },
};
