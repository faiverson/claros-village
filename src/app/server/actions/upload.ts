'use server'

import * as fs from 'fs'
import * as path from 'path'
// @ts-ignore
import * as pdf from 'pdf-extraction'

const jsonFilePath = path.join(process.cwd(), 'static/privates/users.json')

export interface User {
  id: string
  nombre: string
  unidad: string
  manzana: string
  lote: string
  expensas_adeudadas?: string
}

export interface MorososResult {
  morosos: User[]
  notFounded: {
    unidad: string
    expensas_adeudadas: string
  }[]
}

async function processPDF(dataBuffer: Buffer, jsonFilePath: string): Promise<MorososResult> {
  try {
    const data = await pdf(dataBuffer);
    const lines = data.text.toString().split('\n').filter((line: string) => line.trim() !== '');
    const morosos = new Map<string, { expensas_adeudadas: string }>();

    lines.forEach((line: string) => {
      if (line.indexOf('LOTE') >= 0) {
        const { 0: unidad, 3: expensas } = line.split(/\s{3,}/)
        if (parseInt(expensas, 10) > 2) {
          const [, lote, , manzana] = unidad.replace(/(\d+)\s*([A-Z])\s*MZA/g, "$1$2 MZA").split(' ')
          const manzanaKey = manzana.replace(/\s+/g, '')
          const loteKey = lote.replace(/\s+/g, '')

          morosos.set(`M${manzanaKey}-L${loteKey}`, { expensas_adeudadas: expensas })
        }
      }
    })

    return new Promise<MorososResult>((resolve, reject) => {
      fs.readFile(jsonFilePath, 'utf8', (err, jsonData) => {
        if (err) {
          console.error('Error reading JSON file:', err);
          return;
        }

        try {
          const users: User[] = JSON.parse(jsonData)

          const filteredUsers: User[] = users.filter(user => {
            const moroso = morosos.get(`M${user.manzana}-L${user.lote}`)
            if (moroso) {
              user.expensas_adeudadas = moroso.expensas_adeudadas
              return true
            }
            return false
          })

          const itemsNotInFilteredUsers: { unidad: string; expensas_adeudadas: string }[] = [];
          if (morosos.size !== filteredUsers.length) {
            morosos.forEach((value, key) => {
              if (!filteredUsers.some(user => `M${user.manzana}-L${user.lote}` === key)) {
                itemsNotInFilteredUsers.push({ unidad: key, expensas_adeudadas: value.expensas_adeudadas });
              }
            });
          }
          resolve({morosos: filteredUsers, notFounded: itemsNotInFilteredUsers})
        } catch (parseError) {
          reject('Error parsing JSON: ' + parseError)
        }
      })
    })
  } catch (error) {
    return Promise.reject('Error processing PDF: ' + error);
  }
}

export async function upload(data: FormData) {
  const file: File | null = data.get('file') as unknown as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  const bytes = await file.arrayBuffer()
  const dataBuffer = Buffer.from(new Uint8Array(bytes))

  return await processPDF(dataBuffer, jsonFilePath)
}
