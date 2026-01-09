
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './lib/store';

// Pages (Polymorphic imports - we will create these files next)
import SplashPage from './pages/SplashPage';
import OnboardingPage from './pages/OnboardingPage'; // Role -> Calibration
import HomePage from './pages/HomePage';
import DungeonPage from './pages/DungeonPage';
import RunSessionPage from './pages/RunSessionPage';
import IrisPage from './pages/IrisPage';
import ReportPage from './pages/ReportPage';

function App() {
  const { isOnboarded } = useGameStore();

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Entry Flows */}
          <Route path="/" element={<SplashPage />} />
          <Route path="/onboarding/*" element={<OnboardingPage />} />

          {/* Main App Flows - Guarded by Onboarding (in theory, simplified here) */}
          <Route path="/home" element={isOnboarded ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/dungeon" element={<DungeonPage />} />
          <Route path="/run" element={<RunSessionPage />} />
          <Route path="/iris" element={<IrisPage />} />
          <Route path="/report" element={<ReportPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
