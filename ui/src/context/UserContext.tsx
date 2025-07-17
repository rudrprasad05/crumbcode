"use client";

import { axiosGlobal } from "@/lib/axios";
import { User } from "@/types";
import { LoginResponse } from "@/types/schema";
import { RegisterFormType } from "@/types/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { destroyCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterFormType) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  // 🔹 Load session from cookies on mount

  const helperHandleRedirectAfterLogin = (tmp: User) => {
    setUser(tmp);
    toast.success("Successfully logged in", {
      description: "Redirecting shortly",
    });
    if (tmp.role == "Admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  const login = async (email: string, password: string) => {
    let tempUser: User;
    console.log(redirect);
    try {
      const res = await axiosGlobal.post<LoginResponse>("auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      tempUser = {
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        token: res.data.token,
        role: res.data.role,
      };
      console.log(redirect);

      if (redirect && redirect.trim().length > 0) {
        console.log("hit");
        router.push("/" + redirect);
      } else {
        console.log("hit2");
        helperHandleRedirectAfterLogin(tempUser);
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  };

  const register = async (data: RegisterFormType) => {
    let tempUser: User;
    try {
      const res = await axiosGlobal.post<LoginResponse>("auth/register", {
        email: data.email,
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("token", res.data.token);
      tempUser = {
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        token: res.data.token,
        role: res.data.role,
      };
      setUser(tempUser);
      toast.success("Successfully registered");
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }

    // helperHandleRedirectAfterLogin(tempUser);
  };

  // 🔹 Logout function
  const logout = (unAuth = false) => {
    destroyCookie(null, "token");
    localStorage.removeItem("token");
    setUser(null);

    toast.info("Logging out");
    router.push("/");
  };

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    const isAdmin = pathname.includes("admin");
    let tempUser: User;
    console.log("trigger 1");

    if (isAdmin)
      try {
        const res = await axiosGlobal.get<LoginResponse>("auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        tempUser = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          token: res.data.token,
          role: res.data.role,
        };
      } catch (error) {
        console.log(error);
      }
  }, [pathname]);

  useEffect(() => {
    checkAuth();
  }, [pathname, router, checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use cake context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
