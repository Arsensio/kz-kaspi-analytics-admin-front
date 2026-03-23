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
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FileUploadPage({
  title,
  description,
  fileLabel,
  accept,
  request,
  getRequestPayload = () => ({}),
  renderAdditionalFields,
  submitButtonText,
  submittingButtonText,
  successTitle,
  successDescription,
  successButtonText,
  successRedirectText,
  successMessage,
  warningText,
  uploadingTitle,
  processingText,
  chooseFileText = 'Выбрать файл',
  replaceFileText = 'Заменить файл',
  emptyFileText = 'Файл пока не выбран',
  fileRequiredError = 'Выберите файл для загрузки.',
  genericErrorMessage = 'Не удалось загрузить файл.',
  redirectPath = '/dashboard',
}) {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
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
      navigate(redirectPath, { replace: true })
    }, 2000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [navigate, redirectPath, success])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!file) {
      setError(fileRequiredError)
      setSuccess('')
      return
    }

    setIsSubmitting(true)
    setUploadProgress(0)
    setIsProcessing(false)
    setError('')
    setSuccess('')

    try {
      await request({
        file,
        ...getRequestPayload(),
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
      setSuccess(successMessage)
    } catch (requestError) {
      setIsProcessing(false)
      setError(
        requestError.response?.data?.message ||
          requestError.response?.data?.error ||
          genericErrorMessage,
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
              <Typography variant="h4">{successTitle}</Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                {successDescription}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {successRedirectText}
              </Typography>
              <Button variant="contained" onClick={() => navigate(redirectPath, { replace: true })}>
                {successButtonText}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={3}>
          <div>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </div>

          <Card>
            <CardContent>
              <Stack component="form" spacing={3} onSubmit={handleSubmit} noValidate>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {fileLabel}
                  </Typography>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    disabled={isSubmitting}
                  >
                    {file ? replaceFileText : chooseFileText}
                    <input
                      hidden
                      accept={accept}
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
                      {file ? file.name : emptyFileText}
                    </Typography>
                  </Box>
                </Box>

                {renderAdditionalFields?.({ isSubmitting })}

                {isSubmitting ? <Alert severity="warning">{warningText}</Alert> : null}
                {error ? <Alert severity="error">{error}</Alert> : null}

                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? submittingButtonText : submitButtonText}
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
          <Typography variant="h6">{uploadingTitle}</Typography>
          <Box sx={{ width: '100%', maxWidth: 360 }}>
            <LinearProgress
              variant={isProcessing ? 'indeterminate' : 'determinate'}
              value={isProcessing ? undefined : uploadProgress}
              color="inherit"
            />
          </Box>
          <Typography variant="body2" sx={{ maxWidth: 360, textAlign: 'center' }}>
            {processingText}
          </Typography>
        </Stack>
      </Backdrop>
    </>
  )
}

export default FileUploadPage
