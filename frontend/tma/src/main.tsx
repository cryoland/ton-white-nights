import { createRoot } from 'react-dom/client';
import { Wrapper } from './Wrapper';

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <Wrapper />
);
