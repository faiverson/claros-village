import * as fs from 'fs'
import * as path from 'path'
import pdf from 'pdf-extraction'
import ExcelJS from 'exceljs'

const pdfPath = path.join(process.cwd(), 'static/privates/morosos.pdf')
const jsonFilePath = path.join(process.cwd(), 'static/privates/users.json')
const xlsxFilePath = path.join(process.cwd(), 'static/privates/morosos.xlsx')

fs.readFile(jsonFilePath, 'utf8', (err, data) =>
{
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  try {
    const users = JSON.parse(data)

    let dataBuffer = fs.readFileSync(pdfPath)
    pdf(dataBuffer).then(async function (data)
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

      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Sheet1')
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Unidad', key: 'unidad', width: 20 },
        { header: 'Expensas Adeudadas', key: 'expensas_adeudadas', width: 10 },
      ]
      console.log(filteredUsers.map(({ id, unidad, expensas_adeudadas }) => ({ id, unidad, expensas_adeudadas })))
      worksheet.addRows(filteredUsers.map(({ id, unidad, expensas_adeudadas }) => ({ id, unidad, expensas_adeudadas })))
      await workbook.xlsx.writeFile(xlsxFilePath)
    })
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
