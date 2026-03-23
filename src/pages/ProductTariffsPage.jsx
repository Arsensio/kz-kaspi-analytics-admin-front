import FileUploadPage from '../components/FileUploadPage.jsx'
import { uploadProductTariffsPdf } from '../api/parserApi.js'

function ProductTariffsPage() {
  return (
    <FileUploadPage
      title="Продуктовые тарифы"
      description="Загрузите PDF-файл с продуктовыми тарифами Kaspi. Файл будет отправлен в сервис парсинга для обработки и обновления тарифов."
      fileLabel="PDF-файл"
      accept=".pdf,application/pdf"
      request={uploadProductTariffsPdf}
      submitButtonText="Загрузить PDF"
      submittingButtonText="Загрузка..."
      successTitle="Загрузка завершена"
      successDescription="PDF-файл успешно загружен и отправлен в сервис парсинга."
      successButtonText="Перейти на главную"
      successRedirectText="Сейчас вы будете перенаправлены на главную страницу."
      successMessage="PDF-файл успешно отправлен в сервис парсинга."
      warningText="Загрузка может занять несколько минут. Не закрывайте вкладку и не обновляйте страницу до завершения запроса."
      uploadingTitle="Идет загрузка PDF"
      processingText="Запрос может выполняться более двух минут. Пожалуйста, не закрывайте вкладку до завершения обработки."
      fileRequiredError="Выберите PDF-файл для загрузки."
      genericErrorMessage="Не удалось загрузить PDF-файл в сервис парсинга."
    />
  )
}

export default ProductTariffsPage
