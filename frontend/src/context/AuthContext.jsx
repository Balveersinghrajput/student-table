/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(
    () => localStorage.getItem("adminToken") || null
  );
  const [studentSession, setStudentSession] = useState(
    () => JSON.parse(localStorage.getItem("studentSession") || "null")
  );

  const adminLogin = (token) => {
    setAdminToken(token);
    localStorage.setItem("adminToken", token);
  };

  const adminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem("adminToken");
  };

  const studentLogin = (student) => {
    setStudentSession(student);
    localStorage.setItem("studentSession", JSON.stringify(student));
  };

  const studentLogout = () => {
    setStudentSession(null);
    localStorage.removeItem("studentSession");
  };

  return (
    <AuthContext.Provider
      value={{
        adminToken,
        studentSession,
        isAdminLoggedIn: !!adminToken,
        isStudentLoggedIn: !!studentSession,
        adminLogin,
        adminLogout,
        studentLogin,
        studentLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}