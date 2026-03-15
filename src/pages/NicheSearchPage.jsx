import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadNicheSearchCsv } from '../api/parserApi.js'

function NicheSearchPage() {
  const navigate = useNavigate()
  const currentDate = new Date()
  const defaultMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  const [file, setFile] = useState(null)
  const [year, setYear] = useState(String(defaultMonthDate.getFullYear()))
  const [month, setMonth] = useState(String(defaultMonthDate.getMonth() + 1))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!isSubmitting) {
      return undefined
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isSubmitting])

  useEffect(() => {
    if (!success) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      navigate('/dashboard', { replace: true })
    }, 2000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [navigate, success])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!file) {
      setError('Выберите CSV-файл для загрузки.')
      setSuccess('')
      return
    }

    setIsSubmitting(true)
    setUploadProgress(0)
    setIsProcessing(false)
    setError('')
    setSuccess('')

    try {
      await uploadNicheSearchCsv({
        file,
        year,
        month,
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) {
            return
          }

          const nextProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(Math.min(nextProgress, 100))
          if (nextProgress >= 100) {
            setIsProcessing(true)
          }
        },
      })
      setUploadProgress(100)
      setIsProcessing(false)
      setSuccess('CSV-файл успешно отправлен в сервис парсинга.')
    } catch (requestError) {
      setIsProcessing(false)
      setError(
        requestError.response?.data?.message ||
          requestError.response?.data?.error ||
          'Не удалось загрузить CSV-файл в сервис парсинга.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {success ? (
        <Card>
          <CardContent>
            <Stack spacing={2} alignItems="center" sx={{ py: 6 }}>
              <CheckCircleOutlineIcon color="success" sx={{ fontSize: 72 }} />
              <Typography variant="h4">Загрузка завершена</Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                CSV-файл успешно загружен и отправлен в сервис парсинга.
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Сейчас вы будете перенаправлены на главную страницу.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/dashboard', { replace: true })}
              >
                Перейти на главную
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={3}>
          <div>
            <Typography variant="h4" gutterBottom>
              Загрузка поиска ниш
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Администраторы загружают CSV-файл с актуальными данными продаж Kaspi.
              После отправки файл уходит в отдельный микросервис парсинга вместе с
              выбранным годом и месяцем.
            </Typography>
          </div>

          <Card>
            <CardContent>
              <Stack component="form" spacing={3} onSubmit={handleSubmit} noValidate>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    CSV-файл
                  </Typography>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    disabled={isSubmitting}
                  >
                    {file ? 'Заменить файл' : 'Выбрать файл'}
                    <input
                      hidden
                      accept=".csv,text/csv"
                      type="file"
                      onChange={(event) => {
                        const nextFile = event.target.files?.[0] || null
                        setFile(nextFile)
                      }}
                    />
                  </Button>

                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InsertDriveFileOutlinedIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {file ? file.name : 'Файл пока не выбран'}
                    </Typography>
                  </Box>
                </Box>

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

                {isSubmitting ? (
                  <Alert severity="warning">
                    Загрузка может занять несколько минут. Не закрывайте вкладку и
                    не обновляйте страницу до завершения запроса.
                  </Alert>
                ) : null}

                {error ? <Alert severity="error">{error}</Alert> : null}

                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Загрузка...' : 'Загрузить CSV'}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}

      <Backdrop
        open={isSubmitting}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Stack spacing={2} alignItems="center" sx={{ width: '100%', px: 2 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            {isProcessing ? (
              <CircularProgress color="inherit" size={56} />
            ) : (
              <>
                <CircularProgress
                  variant="determinate"
                  value={uploadProgress}
                  color="inherit"
                  size={56}
                />
                <Box
                  sx={{
                    inset: 0,
                    display: 'flex',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" component="div" color="inherit">
                    {`${uploadProgress}%`}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          <Typography variant="h6">Идет загрузка CSV</Typography>
          <Box sx={{ width: '100%', maxWidth: 360 }}>
            <LinearProgress
              variant={isProcessing ? 'indeterminate' : 'determinate'}
              value={isProcessing ? undefined : uploadProgress}
              color="inherit"
            />
          </Box>
          <Typography variant="body2" sx={{ maxWidth: 360, textAlign: 'center' }}>
            Запрос может выполняться более двух минут. Пожалуйста, не закрывайте
            вкладку до завершения обработки.
          </Typography>
        </Stack>
      </Backdrop>
    </>
  )
}

export default NicheSearchPage
