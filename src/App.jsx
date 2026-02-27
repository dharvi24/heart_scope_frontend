import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Predict from './pages/Predict';
import About from './pages/About';
import Performance from './pages/Performance';
import Dataset from './pages/Dataset';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="predict" element={<Predict />} />
            <Route path="about" element={<About />} />
            <Route path="performance" element={<Performance />} />
            <Route path="dataset" element={<Dataset />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
