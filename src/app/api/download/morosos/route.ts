import { NextRequest, NextResponse } from 'next/server'
import fs, { Stats } from "fs"
import * as path from 'path'
import ExcelJS from 'exceljs'
import { User } from 'app/server/actions/upload'
import { ReadableOptions } from "stream"

const xlsxFilePath = path.join(process.cwd(), 'static/privates/morosos.xlsx')

const save = async (users: User[]) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet1')
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Unidad', key: 'unidad', width: 20 },
    { header: 'Expensas Adeudadas', key: 'expensas_adeudadas', width: 10 },
  ]
  worksheet.addRows(users.map(({ id, unidad, expensas_adeudadas }) => ({ id, unidad, expensas_adeudadas })))
  await workbook.xlsx.writeFile(xlsxFilePath)
};

const streamFile = (path: string, options?: ReadableOptions): ReadableStream<Uint8Array> => {
    const downloadStream = fs.createReadStream(path, options);

    return new ReadableStream({
        start(controller) {
            downloadStream.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
            downloadStream.on("end", () => controller.close());
            downloadStream.on("error", (error: NodeJS.ErrnoException) => controller.error(error));
        },
        cancel() {
            downloadStream.destroy();
        },
    });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const {morosos} = await request.json()
  await save(morosos)

  const stats: Stats = await fs.promises.stat(xlsxFilePath);
  const data: ReadableStream<Uint8Array> = streamFile(xlsxFilePath)

  return new NextResponse(data, {
    status: 200,
    headers: {
      'Content-Disposition': 'attachment; filename=morosos.xlsx',
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      "content-Length": stats.size + "",
    }
  })

}

