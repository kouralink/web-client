import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from './layouts/Root.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      // loader={rootLoader}
      // action={rootAction}
      // errorElement={<ErrorPage />}
    >
      <Route 
      // errorElement={<ErrorPage />}
      >
        <Route 
        index element={<App />} 
        />
        <Route
          path=""
          // element={<Contact />}
          // loader={contactLoader}
          // action={contactAction}
        />
        <Route
          path=""
          // element={<EditContact />}
          // loader={contactLoader}
          // action={editAction}
        />
      </Route>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
