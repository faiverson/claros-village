export type FileResident = {
  id: string
  nombre: string
  email: string
  email_propietario: string[]
  email_expensas: string[] | string
  manzana: string
  lote: string
  unidad: string
  phone: string
  telefono: string
  telefonos: string[]
  numero_expensas: string
  direccion: string
  piso: string
  departamento: string
  barrio: string
  propietario: boolean
  createdAt: Date
}
