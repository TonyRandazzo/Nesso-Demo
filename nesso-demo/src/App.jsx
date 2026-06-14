import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ScopriPage from './pages/ScopriPage';
import MessaggiPage from './pages/MessaggiPage';
import ConnessioniPage from './pages/ConnessioniPage';
import TeamPage from './pages/TeamPage';
import ProfiloPage from './pages/ProfiloPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AttributionsPage from './pages/AttributionsPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/attributions" element={<AttributionsPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard/scopri" element={<ScopriPage />} />
            <Route path="/dashboard/messaggi" element={<MessaggiPage />} />
            <Route path="/dashboard/connessioni" element={<ConnessioniPage />} />
            <Route path="/dashboard/team" element={<TeamPage />} />
            <Route path="/dashboard/profilo" element={<ProfiloPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}

export default App