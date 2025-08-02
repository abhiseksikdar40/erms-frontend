import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Header />
      <main style={{ paddingTop: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
