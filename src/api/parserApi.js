import { parserApi } from './api.js'

export async function uploadNicheSearchCsv({ file, year, month, onUploadProgress }) {
  const formData = new FormData()
  formData.append('file', file)

  const metaBlob = new Blob(
    [JSON.stringify({ year: Number(year), month: Number(month) })],
    {
      type: 'application/json',
    },
  )
  formData.append('meta', metaBlob)

  const response = await parserApi.post('/admin/csv/parse', formData, {
    onUploadProgress,
  })
  return response.data
}

export async function uploadProductTariffsPdf({ file, onUploadProgress }) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await parserApi.post('/admin/tariffs/pdf/parse', formData, {
    onUploadProgress,
  })

  return response.data
}
