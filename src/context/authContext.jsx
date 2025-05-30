import { useEffect, createContext } from "react";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "../store/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/auth/profile", { withCredentials: true,showErrorToast:false });
        if (res.status === 200 && res.data) {
          login({user:res.data?.data});
        } else {
          logout();
        }
      } catch (error) {
        logout(); 
      }
    };

    checkAuth();



    //populate notifications
    
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
