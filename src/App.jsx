import "./App.css";
import { X } from "lucide-react";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Protect from "./components/ProtectedRoute";
import { useState } from "react";
import Error from "./error";

function App() {
  // to check if user is already logged in
  const [authState, setauthState] = useState(false);
  // setting it false

  // function for handling login
  const loginCheck = (status) => {
    console.log("User login status:", status);
    setauthState(status);
  };

  return (
    <Router>
      <div className="h-screen p-0 m-0">
        <Routes>
          {/* check functioning */}
          <Route
            path="/"
            element={
              authState ? (
                <Navigate to="/home" replace />
              ) : (
                <Login onLogin={loginCheck} />
              )
            }
          />

          {/* Protectecting home route*/}
          <Route
            path="/home"
            element={
              <Protect isAuthenticated={authState}>
                <Home />
              </Protect>
            }
          />

          {/*404 page for other links*/}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
