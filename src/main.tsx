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

// Pages
  // Root
import App from "./App.tsx";
  // Auth
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Reset from "./pages/auth/Reset.tsx";
  // Settings
import SettingsLayout from "./pages/settings/layout.tsx";
import SettingsProfilePage from "./pages/settings/page.tsx";
import SettingsAccountPage from "./pages/settings/account/page.tsx"; 
import SettingsAppearancePage from "./pages/settings/appearance/page.tsx";
import SettingsNotificationsPage from "./pages/settings/notifications/page.tsx";

// theme 
import { ThemeProvider } from "@/components/theme-provider"

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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<Reset />} />
        </Route>
        <Route
          path="settings"
          element={<SettingsLayout />}
        >
          <Route index element={<SettingsProfilePage />} />
          <Route path='profile' element={<SettingsProfilePage />} />
          <Route path='account' element={<SettingsAccountPage />} />
          <Route path='appearance' element={<SettingsAppearancePage />} />
          <Route path='notifications' element={<SettingsNotificationsPage />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
