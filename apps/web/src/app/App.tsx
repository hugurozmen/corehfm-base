import { Navigate, Route, Routes } from "react-router-dom";
import { AppProviders } from "./providers/AppProviders";
import { LoginPage } from "../features/auth/LoginPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { useAuthStore } from "../features/auth/auth-store";

export function App() {
  return (
    <AppProviders>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProtectedRoute />} path="/" />
      </Routes>
    </AppProviders>
  );
}

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return <DashboardPage />;
}
