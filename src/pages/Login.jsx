import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/auth";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Show notification
    const showNotification = (message, isError = false) => {
      const notification = document.createElement("div");
      notification.className = `z-9999 fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
        isError ? " bg-red-500" : "bg-primary"
      } text-white transition-opacity duration-500`;
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => document.body.removeChild(notification), 500);
      }, 1000);
    };

    try {
      const token = await login(email, password);
      if (token) {
        showNotification("User Logged in Successfully");
        console.log(token);
        onLogin(true);
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-6 -left-6 w-3xs h-96 bg-primary border-2 border-secondary "></div>
        <div className="absolute -bottom-6 -right-6 w-3xs h-96 bg-accent border-2 border-secondary "></div>

        <form
          onSubmit={handleLogin}
          className="relative z-10 flex flex-col items-start justify-center gap-5 p-6 bg-light rounded-lg border-2 border-secondary shadow-[6px_6px_0px_0px_rgba(39,43,51,1)]"
        >
          <div className="mb-4 w-full">
            <h2 className="text-2xl font-black text-primary">Welcome!</h2>
          </div>

          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 py-2 font-semibold text-secondary bg-amber-50 border-2 border-secondary rounded shadow-[4px_4px_0px_0px_rgba(39,43,51,1)] focus:border-primary  transition-all"
              required
            />
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary"
              >
                Password
              </label>
              <button
                type="button"
                className=" right-3 top-9 text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 py-2 font-semibold text-secondary bg-amber-50 border-2 border-secondary rounded shadow-[4px_4px_0px_0px_rgba(39,43,51,1)] focus:border-primary  transition-all"
              required
            />
          </div>

          {error && (
            <div className="w-full p-2 text-sm bg-red-100  text-primary ">
              {error}
            </div>
          )}

          <button
            className={`mt-6 w-full h-12 font-bold text-light bg-primary border-2 border-secondary rounded shadow-[4px_4px_0px_0px_rgba(39,43,51,1)] hover:bg-opacity-90 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Let's go →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
