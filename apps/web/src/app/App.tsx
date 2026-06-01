import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppProviders } from "./providers/AppProviders";
import { LoginPage } from "../features/auth/LoginPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import {
  DiscoverWebPage,
  FiltersWebPage,
  FlowWebPage,
  ListsWebPage,
  MapWebPage,
  NewListWebPage,
  NewPlanWebPage,
  PlaceWebPage,
  PlanWebPage,
  ProfileDetailWebPage,
  ProfileWebPage,
  SavedWebPage,
  ScreensWebPage,
  SwipeWebPage,
} from "../features/cafinder/CafinderWeb";

export function App() {
  return (
    <AppProviders>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} path="/" />
        <Route element={<ProtectedRoute><DiscoverWebPage /></ProtectedRoute>} path="/discover" />
        <Route element={<ProtectedRoute><MapWebPage /></ProtectedRoute>} path="/map" />
        <Route element={<ProtectedRoute><ListsWebPage /></ProtectedRoute>} path="/lists" />
        <Route element={<ProtectedRoute><NewListWebPage /></ProtectedRoute>} path="/lists/new" />
        <Route element={<ProtectedRoute><SavedWebPage /></ProtectedRoute>} path="/saved" />
        <Route element={<ProtectedRoute><PlanWebPage /></ProtectedRoute>} path="/plan" />
        <Route element={<ProtectedRoute><NewPlanWebPage /></ProtectedRoute>} path="/plan/new" />
        <Route element={<ProtectedRoute><ProfileWebPage /></ProtectedRoute>} path="/profile" />
        <Route element={<ProtectedRoute><ProfileDetailWebPage /></ProtectedRoute>} path="/profile/detail" />
        <Route element={<ProtectedRoute><PlaceWebPage /></ProtectedRoute>} path="/place/:id" />
        <Route element={<ProtectedRoute><FiltersWebPage /></ProtectedRoute>} path="/filters" />
        <Route element={<ProtectedRoute><SwipeWebPage /></ProtectedRoute>} path="/discover-swipe" />
        <Route element={<ProtectedRoute><ScreensWebPage /></ProtectedRoute>} path="/screens" />
        <Route element={<ProtectedRoute><FlowWebPage kind="splash" /></ProtectedRoute>} path="/flow/splash" />
        <Route element={<ProtectedRoute><FlowWebPage kind="onboarding" /></ProtectedRoute>} path="/flow/onboarding" />
        <Route element={<ProtectedRoute><FlowWebPage kind="phone" /></ProtectedRoute>} path="/flow/phone" />
        <Route element={<ProtectedRoute><FlowWebPage kind="verify" /></ProtectedRoute>} path="/flow/verify" />
        <Route element={<ProtectedRoute><FlowWebPage kind="location" /></ProtectedRoute>} path="/flow/location" />
        <Route element={<ProtectedRoute><FlowWebPage kind="city" /></ProtectedRoute>} path="/flow/city" />
        <Route element={<ProtectedRoute><FlowWebPage kind="atmosphere" /></ProtectedRoute>} path="/flow/atmosphere" />
        <Route element={<Navigate replace to="/discover" />} path="*" />
      </Routes>
    </AppProviders>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  return children;
}
