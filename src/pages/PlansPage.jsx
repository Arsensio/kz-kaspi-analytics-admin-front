import { Card, CardContent, Stack, Typography } from '@mui/material'

function PlansPage() {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4" gutterBottom>
          Тарифы
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Здесь будет управление тарифами и пакетами доступа.
        </Typography>
      </div>

      <Card>
        <CardContent>
          <Typography variant="body1">
            Раздел создан и готов для подключения API тарифов.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default PlansPage
