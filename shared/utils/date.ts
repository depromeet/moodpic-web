export const formatDatetime = (date: string) => {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h24',
  }).formatToParts(new Date(`${date}Z`));

  const formattedDate = formatter.map(({ type, value }) => (type === 'dayPeriod' ? '' : value)).join('');
  return formattedDate.replace('  ', ' ');
};
