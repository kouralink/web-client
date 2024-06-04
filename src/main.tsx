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
  Navigate,
} from "react-router-dom";

// theme
import { ThemeProvider } from "@/components/theme-provider";

// Layouts
import RootLyout from "./layouts/RootLyout.tsx";
import AuthLayout from "./layouts/AuthLyout.tsx";
import DefaultNavLayout from "./layouts/DefaultNavLayout.tsx";
import DefaultNavFooterLayout from "./layouts/DefaultNavFooterLayout.tsx";

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
// Teams
import { TeamPage } from "./pages/team/TeamPage.tsx";
import TeamLayout from "./layouts/TeamLayout.tsx";
import TeamSearchPage from "./pages/team/TeamSearchPage.tsx";
import CreateTeam from "./pages/team/CreateTeam.tsx";
import UpdateTeam from "./pages/team/UpdateTeam.tsx";

// Tounaments
import TournamentLayout from "./layouts/TournamentLayout.tsx";
import TournamentSearchPage from "./pages/Tournament/TournamentSearchPage.tsx";
import { TournamentPage } from "./pages/Tournament/TournamentPage.tsx";
import TournamentBrackets from "./pages/Tournament/TournamentBrackets.tsx";
import CreateTournament from "./pages/Tournament/CreateTournament.tsx";
// users
import UserProfile from "./pages/profile/UserProfile.tsx";
import UserSearchPage from "./pages/profile/UserSearchPage.tsx";
// Match
import MatchPage from "./pages/match/MatchPage.tsx";

// other
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";

// 404
import ErrorPage from "./pages/ErrorPage.tsx";

// private route
export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = store.getState().auth.user !== null;
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

// account type coach route
export const CoachRoute = ({ children }: { children: React.ReactNode }) => {
  const user = store.getState().auth.user;
  return user?.accountType === "coach" ? children : <Navigate to="/" />;
};

// account type tournement_manager route
export const TournamentManagerRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = store.getState().auth.user;
  return user?.accountType === "tournement_manager" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

// account type refree route
export const RefreeRoute = ({ children }: { children: React.ReactNode }) => {
  const user = store.getState().auth.user;
  return user?.accountType === "refree" ? children : <Navigate to="/" />;
};

// redirect if logged in
export const RedirectIfLoggedIn = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isAuthenticated = store.getState().auth.user !== null;
  return isAuthenticated ? <Navigate to="/" /> : children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      // loader={rootLoader}
      // action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route element={<RootLyout />} errorElement={<ErrorPage />}>
        <Route index element={<App />} />
        <Route
          path="auth"
          element={
            <RedirectIfLoggedIn>
              <AuthLayout />
            </RedirectIfLoggedIn>
          }
          // loader={rootLoader}
          // action={rootAction}
          errorElement={<ErrorPage />}
        >
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<Reset />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route
          path="settings"
          element={
            <PrivateRoute>
              <SettingsLayout />
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        >
          <Route index element={<SettingsProfilePage />} />
          <Route path="profile" element={<SettingsProfilePage />} />
          <Route path="account" element={<SettingsAccountPage />} />
          <Route path="appearance" element={<SettingsAppearancePage />} />
          <Route path="notifications" element={<SettingsNotificationsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        {/* -------------- Team Routes --------------- */}
        <Route
          path="team"
          element={
            <PrivateRoute>
              <TeamLayout />
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        >
          <Route index element={<TeamSearchPage />} />
          <Route path="search" element={<TeamSearchPage />} />
          <Route
            path="create"
            element={
              <CoachRoute>
                {" "}
                <CreateTeam />{" "}
              </CoachRoute>
            }
          />
          <Route
            path="update/:paramteamname"
            element={
              <CoachRoute>
                {" "}
                <UpdateTeam />{" "}
              </CoachRoute>
            }
          />
          <Route path="page/:paramteamname" element={<TeamPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        {/* -------------- Tournament Routes --------------- */}
        <Route
          path="tournament"
          element={
            <PrivateRoute>
              <TournamentLayout />
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        >
          <Route index element={<TournamentSearchPage />} />
          <Route
            path="CreateTournement"
            element={
              <TournamentManagerRoute>
                <CreateTournament />
              </TournamentManagerRoute>
            }
          />
          <Route path="tournamentBrackets" element={<TournamentBrackets />} />
          <Route path=":tournamentId" element={<TournamentPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route
          path="users"
          element={<DefaultNavLayout />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<UserSearchPage />} />
          <Route path="search" element={<UserSearchPage />} />
          <Route path="profile/:username" element={<UserProfile />} />
        </Route>
        <Route
          path="matches"
          element={<DefaultNavLayout />}
          errorElement={<ErrorPage />}
        >
          <Route path="page/:matchId" element={<MatchPage />} />
        </Route>
        <Route path="/" element={<DefaultNavFooterLayout />}>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        {/* <Route path="profile/:username" element={<UserProfile />} />        */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
