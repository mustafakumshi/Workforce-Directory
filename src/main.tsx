import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ModuleRegistry,
  CommunityFeaturesModule,
  ClientSideRowModelModule,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeProvider';
import './styles/main.scss';

ModuleRegistry.registerModules([
  CommunityFeaturesModule,
  ClientSideRowModelModule,
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
