import { AuthContext } from "./AuthContext";
export default function AuthProvider({ children }: { children: React.ReactNode }) {

   const value = {
      user: "user"
   }
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
