import { createContext, useState } from "react";

interface typeContext{
    user: any,
    setUser: any
}

export const UserContext = createContext<typeContext>({
    user: null,
    setUser: null
});

export default function UserProvider({ children }:Record<string, any>){
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
