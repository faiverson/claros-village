import * as fs from 'fs'
import * as path from 'path'
import csv from 'csv-parser'
import XLSX from 'xlsx'

// create a list of users and save them in an excel file and a json file

const csvFilePath = path.join(process.cwd(), 'static/privates/users.csv')
const jsonFilePath = path.join(process.cwd(), 'static/privates/users.json')
const xlsxFilePath = path.join(process.cwd(), 'static/privates/users.xlsx')

let results = []

const userSort = (a, b) =>
{
  // Compare the "manzana" values first
  const manzanaComparison = a.manzana.localeCompare(b.manzana)

  // If "manzana" values are equal, compare the "lote" values
  if (manzanaComparison === 0) {
    const [numericA, letterA] = a.lote.match(/^(\d+)([A-Za-z]*)$/).slice(1)
    const [numericB, letterB] = b.lote.match(/^(\d+)([A-Za-z]*)$/).slice(1)

    // Compare numeric parts as integers
    const numericComparison = parseInt(numericA, 10) - parseInt(numericB, 10)

    if (numericComparison === 0) {
      // Compare letter parts if numeric parts are equal
      return letterA.localeCompare(letterB)
    }

    return numericComparison
  }

  return manzanaComparison
}

const transformKeys = obj =>
{
  const transformedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const transformedKey = key.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, match => match.toUpperCase());
      transformedObj[transformedKey] = obj[key];
    }
  }
  return transformedObj;
}

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) =>
  {
    results.push(data)
  })
  .on('end', () =>
  {
    const users = results.map(item =>
    {
      const id = item.INMUEBLE.slice(-3);
      const manzana = item.MANZANA.trim()
      const telefono = item.TELEFONO.trim().replace(/\D/g, '')
      const lote = item.LOTE.trim()
      return {
        id,
        nombre: item.RAZONSOCIAL.trim().replace(/-/g, ' - ').split(/\s+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
        unidad: `M${ manzana } L${ lote }`,
        manzana,
        lote,
        email_propietario: item.EMAIL.trim().toLowerCase().replace(/;\s+/g, ';'),
        email_expensas: item.EXPENSAEMAIL.trim().toLowerCase().replace(/;\s+/g, ';'),
        propietario: !!item.EXPENSAEMAIL ? false : true,
        telefono,
        numero_expensas: item.EXPENSA.trim() ?? null,
        direccion: item.DIRECCION.trim().split(/\s+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') + ' ' + item.DIRNUMERO.trim(),
        piso: item.PISO.trim() ?? null,
        departamento: item.DEPARTAMENTO.trim() ?? null,
        barrio: item.BARRIO.trim().split(/\s+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
      }
    }).filter(item => !!item.manzana).sort(userSort)

    fs.writeFile(jsonFilePath, JSON.stringify(users), 'utf8', (err) =>
    {
      if (err) {
        console.error('Error writing destination file:', err)
      }
    })

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(users.map(({ telefono, direccion, numero_expensas, piso, departamento, barrio, ...rest }) => rest).map(transformKeys))
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, xlsxFilePath)
  })
  .on('error', (error) => console.error('Error reading and parsing the CSV file:', error))

