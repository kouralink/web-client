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
import RootLyout from "./layouts/RootLyout.tsx";
import Counter from "./components/Counter.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Reset from "./pages/auth/Reset.tsx";
import SettingsLayout from "./layouts/SettingsLayout.tsx";
import Profile from "./pages/profile/Profile.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      // loader={rootLoader}
      // action={rootAction}
      // errorElement={<ErrorPage />}
    >
      <Route
        element={<RootLyout />}
        // errorElement={<ErrorPage />}
      >
        <Route index element={<App />} />
        <Route
          path="/test"
          element={<Counter />}
          // loader={contactLoader}
          // action={contactAction}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<Reset />} />
      </Route>
      <Route
        path="settings"
        element={<SettingsLayout />}
        // loader={rootLoader}
        // action={rootAction}
        // errorElement={<ErrorPage />}
      >
        <Route path="profile" element={<Profile />} />
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
