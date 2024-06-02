import { createRoot } from 'react-dom/client';
import { App } from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const root = createRoot(document.getElementById('app') as HTMLElement);
const manifestUrl = "https://ton-wn-tma.ngrok.dev/manifest.json";

root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
