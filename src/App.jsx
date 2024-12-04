import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Navs/Home";
import About from "./pages/Navs/About";
import Contact from "./pages/Navs/Contact";
import Login from "./pages/Navs/Login";
import NotFound from "./pages/Navs/NotFound";
import Admin from "./pages/Dashboards/Admin";
import Manager from "./pages/Dashboards/Manager";
import User from "./pages/Dashboards/User";
import Staff from "./pages/Dashboards/Staff";
import Faculity from "./pages/Dashboards/Faculity";
import Technician from "./pages/Dashboards/Technician";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // Array of paths where the Header should be displayed
  const validPaths = ["/", "/about", "/contact-us", "/login"];

  // Check if the current path is in the array of valid paths
  const shouldShowHeader = validPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/user"
          element={<ProtectedRoute component={User} requiredRole="user" />}
        />
        <Route
          path="/staff"
          element={<ProtectedRoute component={Staff} requiredRole="staff" />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute component={Admin} requiredRole="admin" />}
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute component={Manager} requiredRole="manager" />
          }
        />
        <Route
          path="/faculity"
          element={
            <ProtectedRoute component={Faculity} requiredRole="faculity" />
          }
        />
        <Route
          path="/technician"
          element={
            <ProtectedRoute component={Technician} requiredRole="technician" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
