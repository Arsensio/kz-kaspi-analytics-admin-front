import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

function DashboardPage() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="overline" color="primary">
          Защищенная зона
        </Typography>
        <Typography variant="h4" gutterBottom>
          Дашборд CRM
        </Typography>
        <Typography variant="body1" color="text.secondary">
            Эта страница работает за защищенными маршрутами. Все новые
            интеграции с backend должны идти через общий axios-клиент в
            `src/api/api.js`, чтобы токен подставлялся автоматически.
        </Typography>
      </div>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Базовый URL API
              </Typography>
              <Typography variant="h6">{apiUrl}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Авторизация
              </Typography>
              <Typography variant="h6">Authorization: Bearer token</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Архитектура
              </Typography>
              <Typography variant="h6">api / context / routes / pages</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default DashboardPage
