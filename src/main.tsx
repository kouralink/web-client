import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// redux
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

//react router

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./layouts/Root.tsx";
import Counter from "./components/Counter.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Reset from "./pages/auth/Reset.tsx";

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
        <Route index element={<App />} />
        <Route
          path="/test"
          element={<Counter />}
          // loader={contactLoader}
          // action={contactAction}
        />
        <Route
          path="/login"
          element={<Login />}
          // loader={contactLoader}
          // action={editAction}
        />
        <Route
          path="/register"
          element={<Register />}
          // loader={contactLoader}
          // action={editAction}
        />
        <Route
          path="/reset-password"
          element={<Reset />}
          // loader={contactLoader}
          // action={editAction}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
