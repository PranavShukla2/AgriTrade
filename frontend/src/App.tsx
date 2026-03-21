import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
    return (
        <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
