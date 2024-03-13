import React from "react";
import ReactDOM from "react-dom/client";
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

// Layouts
import RootLyout from "./layouts/RootLyout.tsx";
import AuthLayout from "./layouts/AuthLyout.tsx";
import SettingsLayout from "./layouts/SettingsLayout.tsx";

// Pages
  // Root
import App from "./App.tsx";
  // Auth
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Reset from "./pages/auth/Reset.tsx";
  // Settings
import Profile from "./pages/settings/Profile.tsx";
import SettingsErrorPage from "./pages/settings/SettingsErrorPage.tsx";


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
          path="auth"
          element={<AuthLayout />}
          // loader={rootLoader}
          // action={rootAction}
          // errorElement={<ErrorPage />}
        >
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<Reset />} />
        </Route>
        <Route
          path="settings"
          element={<SettingsLayout />}
          // loader={rootLoader}
          // action={rootAction}
          errorElement={<SettingsErrorPage />}
        >
          <Route index element={<Profile />} />
          <Route path='profile' element={<Profile />} />
          <Route path="*" element={<SettingsErrorPage />} />
        </Route>
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
