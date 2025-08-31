import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../api";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await api.me();
        if (me) setUser(me);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const u = await api.login(email, password);
    setUser(u);
    return u;
  };

  const register = async (email, password, name) => {
    const u = await api.register(email, password, name);
    setUser(u);
    return u;
  };

  const logout = async () => {
    try { await api.logout(); } finally { setUser(null); }
  };

  const value = { user, loading, login, register, logout, setUser };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
