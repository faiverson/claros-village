export const transformKeys = (obj: { [key: string]: any }): { [key: string]: any } => {
  const transformedObj: { [key: string]: any } = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const transformedKey = key.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())
      transformedObj[transformedKey] = obj[key]
    }
  }
  return transformedObj;
}
