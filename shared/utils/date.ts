interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup' | undefined;
  weekday?: 'long' | 'short' | 'narrow' | undefined;
  era?: 'long' | 'short' | 'narrow' | undefined;
  year?: 'numeric' | '2-digit' | undefined;
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day?: 'numeric' | '2-digit' | undefined;
  hour?: 'numeric' | '2-digit' | undefined;
  minute?: 'numeric' | '2-digit' | undefined;
  second?: 'numeric' | '2-digit' | undefined;
  timeZoneName?: 'long' | 'short' | undefined;
  formatMatcher?: 'best fit' | 'basic' | undefined;
  hour12?: boolean | undefined;
  timeZone?: string | undefined;
}

const format = (inputDate: string, options: DateTimeFormatOptions) => {
  const [date, time] = inputDate.split(' ');
  const [year, month, day] = date.split('-');
  const [hour, min] = time.split(':');

  const dateUTC = Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min));

  const formatter = new Intl.DateTimeFormat('ko-KR', options).formatToParts(new Date(dateUTC));

  const formattedDate = formatter.map(({ value }) => value).join('');
  return formattedDate.replace('  ', ' ');
};

export const formatDatetime = (inputDate: string) => {
  return format(inputDate, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const formatDate = (inputDate: string) => {
  return format(inputDate, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
