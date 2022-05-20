// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyles from './styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:country" element={<App />} />
            </Routes>
        </BrowserRouter>

        <GlobalStyles />
    </React.StrictMode>
);
