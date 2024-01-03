

export const formatDateToUI = (dateString: string): string => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, optionsDate);
  const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

  return `${formattedDate} ${formattedTime}`;
};

export const formatDateToISO = (dateString:string) => {
  const parsedDate = new Date(dateString)
  return parsedDate.toISOString();
}