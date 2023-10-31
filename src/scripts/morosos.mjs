import * as fs from 'fs'
import * as path from 'path'
import pdf from 'pdf-extraction'
import XLSX from 'xlsx'

const pdfPath = path.join(process.cwd(), 'static/privates/morosos.pdf')
const jsonFilePath = path.join(process.cwd(), 'static/privates/users.json')
const xlsxFilePath = path.join(process.cwd(), 'static/privates/morosos.xlsx')

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

fs.readFile(jsonFilePath, 'utf8', (err, data) =>
{
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  try {
    const users = JSON.parse(data)

    let dataBuffer = fs.readFileSync(pdfPath)
    pdf(dataBuffer).then(function (data)
    {
      const lines = data.text.split('\n').filter(line => line.trim() !== '')
      const morosos = new Map();

      lines.forEach(line =>
      {
        if (line.indexOf('LOTE') >= 0) {
          const { 0: unidad, 3: expensas } = line.split(/\s{2,}/)
          if (expensas > 2) {
            const [, lote, , manzana] = unidad.replace(/(\d+)\s*([A-Z])\s*MZA/g, "$1$2 MZA").split(' ')

            const manzanaKey = manzana.replace(/\s+/g, '');
            const loteKey = lote.replace(/\s+/g, '');

            morosos.set(`M${ manzanaKey }-L${ loteKey }`, { expensas });
          }
        }
        return null;
      })

      const filteredUsers = users.filter(user =>
      {
        const moroso = morosos.get(`M${ user.manzana }-L${ user.lote }`)
        if (moroso) {
          user.expensas_adeudadas = moroso.expensas
          return true;
        }
        return false;
      })

      if (morosos.size !== filteredUsers.length) {
        const itemsNotInFilteredUsers = [];
        morosos.forEach((value, key) =>
        {
          if (!filteredUsers.some(user => `M${ user.manzana }-L${ user.lote }` === key)) {
            itemsNotInFilteredUsers.push({ unidad: key, expensas: value });
          }
        })
        console.error('There are some morosos not founded', itemsNotInFilteredUsers);
      }

      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(filteredUsers.map(({ id, unidad, expensas_adeudadas, ...rest }) => ({ id, unidad, expensas_adeudadas })).map(transformKeys))
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      XLSX.writeFile(workbook, xlsxFilePath)
    })
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
