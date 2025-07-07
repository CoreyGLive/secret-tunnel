import { createContext, useContext, useState, useEffect } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const signup = async (username) => {
    try {
      const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json();
      setToken(data.token);
      sessionStorage.setItem("token", data.token);
      setLocation("TABLET");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const authenticate = async () => {
    try {
      if (!token) throw new Error("No token available");

      const res = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Authentication failed");

      setLocation("TUNNEL");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const value = { location, signup, authenticate, error };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}

