import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Route, } from 'react-router-dom';
import { Component } from './Page/HomePage/mainTable.tsx';
import Index from './Page/Auth/Index.tsx';


// console.log('Base path:', basePath);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<Component />} />
      <Route index path='/' element={<Index />} />
    </>
  ),
)

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
