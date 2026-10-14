import "./App.css";
import AuthProvider from "./Context/authProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/home";
import PrivateLayout from "./layouts/PrivateLayout";
import PrivateRoute from "./Components/privateRoute";
import Vacancy from "./pages/vacancy";
import ListJob from "./pages/listJob";
import AddJob from "./pages/addJob";
import Profile from "./pages/profile";
import ChangePassword from "./pages/changePassword";
import Dashboard from "./pages/dashboard";
import VacancyDetail from "./pages/vacancyDetail";
import OnlyAdmin from "./pages/onlyAdmin";
import PageNotFound from "./pages/pageNotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Dashboard Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/vacancy" element={<Vacancy />} />
          </Route>
          <Route path="/vacancy/:id" element={<VacancyDetail />} />

          {/* Private Dashboard Pages */}
          <Route path="/onlyAdmin" element={<OnlyAdmin />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PrivateLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />

            {/* Nested Route untuk list-job */}
            <Route path="list-job" element={<ListJob />}>
              <Route path="form" element={<AddJob />} />
              <Route path="edit/:id" element={<AddJob />} />
            </Route>

            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
