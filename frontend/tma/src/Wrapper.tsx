import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { App } from './App';
import { Glitch } from './Glitch';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const manifestUrl = 'https://right-robin-great.ngrok-free.app/manifest.json';

export const Wrapper = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TonConnectUIProvider manifestUrl={manifestUrl}><App /></TonConnectUIProvider>} />                
                <Route path="/:id" element={<Glitch />} />
            </Routes>
        </BrowserRouter>
    );
}
