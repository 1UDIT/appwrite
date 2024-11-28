import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Route, } from 'react-router-dom';

// console.log('Base path:', basePath);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path='/login' element={<App />} />
      <Route path="/" lazy={() => import("@/Page/mainTable.tsx")} />
    </>
  ),
)

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
