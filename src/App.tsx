// App.tsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopAnime from './components/TopAnime';
import Dashboard from './components/Profile';
import { AuthProvider } from './context/AuthContext'; 
import AnimePage from './components/AnimePage';


function Home() {
  return <div style={{ padding: '2rem', fontSize: '1.5rem', color: 'white' }}>Welcome to MyAnimeList Clone</div>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/top/anime" element={<TopAnime />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/anime/:id" element={<AnimePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
