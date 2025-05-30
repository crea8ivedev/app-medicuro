import { useEffect, createContext, useState } from "react";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "../store/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const [retry,setRetry] = useState(true)

  useEffect(() => {
  let isMounted = true;

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/auth/profile", {
        withCredentials: true,
        showErrorToast: false,
      });

      if (res.status === 200 && res.data) {
        login({ user: res.data?.data });
      } else {
        logout();
      }
    } catch (error) {
      if (retry && isMounted) {
        setRetry(false);
      } else {
        logout();
      }
    }
  };

  if (retry) {
    checkAuth();
  }

  return () => {
    isMounted = false;
  };
}, [retry]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
