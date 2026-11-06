import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import PublicLayout from "@/layouts/PublicLayout"
import AppLayout from "@/layouts/AppLayout"
import LandingPage from "@/pages/LandingPage"
import DashboardPage from "@/pages/DashboardPage"
import ComponentsPage from "@/pages/ComponentsPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing / Landing Layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Application Dashboard Layout */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="components" element={<ComponentsPage />} />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
