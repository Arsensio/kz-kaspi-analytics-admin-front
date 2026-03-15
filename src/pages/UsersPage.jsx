import { Card, CardContent, Stack, Typography } from '@mui/material'

function UsersPage() {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4" gutterBottom>
          Пользователи
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Здесь будет список пользователей, роли и административные действия.
        </Typography>
      </div>

      <Card>
        <CardContent>
          <Typography variant="body1">
            Раздел создан и готов для подключения API пользователей.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default UsersPage
