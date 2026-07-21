import {
    createContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
import { AuthContextType, AuthProviderProps } from "../dto/context/auth-context-dto";
import { IUserDto } from "../dto/response/auth-response-dto";
  

 
  export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
  );
  

  export function AuthProvider({
    children,
  }: AuthProviderProps) {
    // Initialize from localStorage
    const [token, setToken] = useState<string | null>(() => {
      return localStorage.getItem("token");
    });
  
    const [user, setUser] = useState<IUserDto | null>(() => {
      const storedUser = localStorage.getItem("user");
  
      return storedUser
        ? JSON.parse(storedUser)
        : null;
    });
  
    const login = (
      token: string,
      user: IUserDto
    ) => {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
  
      setToken(token);
      setUser(user);
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
  
      setToken(null);
      setUser(null);
    };
  
    useEffect(() => {
      if (!token) {
        return;
      }
  
    }, [token]);
  
    return (
      <AuthContext.Provider
        value={{
          token,
          user,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }