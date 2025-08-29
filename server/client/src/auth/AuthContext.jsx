import { createContext, useContext, useEffect, useState } from "react";
import { me, login as apiLogin, register as apiRegister, logout as apiLogout } from "../api";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ (async ()=>{ setUser(await me()); setLoading(false); })(); },[]);

  const login = async (email, password) => { const u = await apiLogin({email,password}); setUser(u); };
  const register = async (email, password, name) => { const u = await apiRegister({email,password,name}); setUser(u); };
  const logout = async () => { await apiLogout(); setUser(null); };

  return (
    <AuthCtx.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
