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
import CreateTournament from "./pages/tournament/Create.tsx";
import { TournamentPage } from "./pages/tournament/Page.tsx";
import TournamentSearchPage from "./pages/tournament/Search.tsx";
import MatchesReferee from "./pages/referee/MatchesReferee.tsx";
import UpdateTournament from "./pages/tournament/Update.tsx";

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

// account type tournament_manager route
export const TournamentManagerRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = store.getState().auth.user;
  return user?.accountType === "tournament_manager" ? (
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
                <CreateTeam />
              </CoachRoute>
            }
          />
          <Route
            path="update/:paramteamname"
            element={
              <CoachRoute>
                <UpdateTeam />
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
              <DefaultNavLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<TournamentSearchPage />} />
          <Route path="search" element={<TournamentSearchPage />} />
          <Route
            path="page/:paramtourid"
            element={<TournamentPage />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="create"
            element={
              <TournamentManagerRoute>
                <CreateTournament />
              </TournamentManagerRoute>
            }
          />
          <Route
            path="update/:paramtourid"
            element={
              <TournamentManagerRoute>
                <UpdateTournament />
              </TournamentManagerRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        {/* -------------- User Routes --------------- */}
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

        <Route path="referee" element={<DefaultNavLayout />}>
          <Route path="matches/:refereeid" element={<MatchesReferee />} />
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
