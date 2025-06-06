import crypto from 'crypto'

export const generateEmailHash = (str: string): string => {
  const hash = crypto.createHash('sha256')
  hash.update(str)
  return hash.digest('hex')
}
