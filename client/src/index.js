import {Suspense, React} from 'react';
import ReactDOM from 'react-dom/client';
import './css/App.css';
import App from './App';
import  './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
);
