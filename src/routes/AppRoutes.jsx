import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import AppLayout from '../layouts/AppLayout.jsx'
import DashboardPage from '../pages/DashboardPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import NicheSearchPage from '../pages/NicheSearchPage.jsx'
import PlansPage from '../pages/PlansPage.jsx'
import ProductTariffsPage from '../pages/ProductTariffsPage.jsx'
import UsersPage from '../pages/UsersPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

function AppRoutes() {
  const { isAuthenticated } = useAuth()
  const defaultRoute = isAuthenticated ? '/dashboard' : '/login'

  return (
    <Routes>
      <Route path="/" element={<Navigate to={defaultRoute} replace />} />

      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/niche-search" element={<NicheSearchPage />} />
          <Route path="/product-tariffs" element={<ProductTariffsPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </Routes>
  )
}

export default AppRoutes
