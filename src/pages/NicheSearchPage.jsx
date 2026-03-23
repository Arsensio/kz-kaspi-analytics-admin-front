import { Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { uploadNicheSearchCsv } from '../api/parserApi.js'
import FileUploadPage from '../components/FileUploadPage.jsx'

function NicheSearchPage() {
  const currentDate = new Date()
  const defaultMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  const [year, setYear] = useState(String(defaultMonthDate.getFullYear()))
  const [month, setMonth] = useState(String(defaultMonthDate.getMonth() + 1))

  return (
    <FileUploadPage
      title="Загрузка поиска ниш"
      description="Администраторы загружают CSV-файл с актуальными данными продаж Kaspi. После отправки файл уходит в отдельный микросервис парсинга вместе с выбранным годом и месяцем."
      fileLabel="CSV-файл"
      accept=".csv,text/csv"
      request={uploadNicheSearchCsv}
      getRequestPayload={() => ({ year, month })}
      renderAdditionalFields={({ isSubmitting }) => (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Год"
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            inputProps={{ min: 2000, max: 2100 }}
            fullWidth
            required
            disabled={isSubmitting}
          />
          <TextField
            label="Месяц"
            type="number"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            inputProps={{ min: 1, max: 12 }}
            fullWidth
            required
            disabled={isSubmitting}
          />
        </Stack>
      )}
      submitButtonText="Загрузить CSV"
      submittingButtonText="Загрузка..."
      successTitle="Загрузка завершена"
      successDescription="CSV-файл успешно загружен и отправлен в сервис парсинга."
      successButtonText="Перейти на главную"
      successRedirectText="Сейчас вы будете перенаправлены на главную страницу."
      successMessage="CSV-файл успешно отправлен в сервис парсинга."
      warningText="Загрузка может занять несколько минут. Не закрывайте вкладку и не обновляйте страницу до завершения запроса."
      uploadingTitle="Идет загрузка CSV"
      processingText="Запрос может выполняться более двух минут. Пожалуйста, не закрывайте вкладку до завершения обработки."
      fileRequiredError="Выберите CSV-файл для загрузки."
      genericErrorMessage="Не удалось загрузить CSV-файл в сервис парсинга."
    />
  )
}

export default NicheSearchPage
