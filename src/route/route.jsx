import {
  GuestProvider,
  ProtectedProvider,
} from "@/components/provider/auth-provider"
import ExplorePage from "@/pages/expore-page"
import HomePage from "@/pages/home-page"
import LeaderBoardPage from "@/pages/leaderboard-page"
import LoginPage from "@/pages/login-page"
import NotFoundGuestPage from "@/pages/not-found-page"
import ProfilePage from "@/pages/profile-page"
import RegisterPage from "@/pages/register-page"
import { Route, Routes } from "react-router-dom"

export default function AppRoute() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundGuestPage />} />
      <Route element={<GuestProvider />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedProvider />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
      </Route>
    </Routes>
  )
}
