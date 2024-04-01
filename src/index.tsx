import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Context from './context/context';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>
); 