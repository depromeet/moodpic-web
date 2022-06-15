export const formatDatetime = (inputDate: string) => {
  const [date, time] = inputDate.split(' ');
  const [year, month, day] = date.split('-');
  const [hour, min] = time.split(':');

  const dateUTC = Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min));

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h24',
  }).formatToParts(new Date(dateUTC));

  const formattedDate = formatter.map(({ type, value }) => (type === 'dayPeriod' ? '' : value)).join('');
  return formattedDate.replace('  ', ' ');
};
