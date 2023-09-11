import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './components/app/app';
import store from './services/store';
import { BrowserRouter} from 'react-router-dom';


const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </StrictMode>
);

reportWebVitals();