import { CalendarDate, DateFormatter } from '@internationalized/date'

export const transformKeys = (obj: {
  [key: string]: any
}): { [key: string]: any } => {
  const transformedObj: { [key: string]: any } = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const transformedKey = key
        .replace(/_/g, ' ')
        .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())
      transformedObj[transformedKey] = obj[key]
    }
  }
  return transformedObj
}

export const parseDate = (dateAt: Date) => {
  const formatter = new DateFormatter('es-AR', {
    day: 'numeric',
    month: 'long',
  })

  const parts = formatter.formatToParts(dateAt)
  const day = parts.find((part) => part.type === 'day')?.value
  const month = parts.find((part) => part.type === 'month')?.value

  return `${day} de ${month}`
}
