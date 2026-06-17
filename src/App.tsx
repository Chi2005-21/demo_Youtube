import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import OverviewPage from './pages/OverviewPage';
import StudyModePage from './pages/StudyModePage';
import GoalHomepagePage from './pages/GoalHomepagePage';
import StudyNotesPage from './pages/StudyNotesPage';
import LessAdsPage from './pages/LessAdsPage';
import IntegratedDemoPage from './pages/IntegratedDemoPage';

function DemoNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Tổng quan' },
    { path: '/study-mode', label: 'Study Mode' },
    { path: '/goal-homepage', label: 'Mục tiêu xem' },
    { path: '/study-notes', label: 'Study Notes' },
    { path: '/less-ads', label: 'Quảng cáo' },
    { path: '/integrated', label: 'Tổng hợp 4 cải tiến', highlight: true },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg px-2 py-2 flex items-center gap-1 overflow-x-auto" style={{ maxWidth: 'calc(100vw - 32px)' }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.path} to={item.path} className="flex-shrink-0">
            <motion.button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-red-600 text-white'
                  : item.highlight
                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    : 'hover:bg-gray-100 text-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          </Link>
        );
      })}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/study-mode" element={<StudyModePage />} />
          <Route path="/goal-homepage" element={<GoalHomepagePage />} />
          <Route path="/study-notes" element={<StudyNotesPage />} />
          <Route path="/less-ads" element={<LessAdsPage />} />
          <Route path="/integrated" element={<IntegratedDemoPage />} />
        </Routes>
      </AnimatePresence>
      <DemoNav />
    </BrowserRouter>
  );
}

export default App;
