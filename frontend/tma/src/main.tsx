import { createRoot } from 'react-dom/client';
import { App } from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const root = createRoot(document.getElementById('app') as HTMLElement);
const manifestUrl = "https://right-robin-great.ngrok-free.app/manifest.json";

root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
