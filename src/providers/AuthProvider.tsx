import {
   useState
} from "react";
import { fakeAuthProvider } from "../services/auth/auth";
import { AuthContext } from "../contexts/AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
   // const [user, setUser] = useState<string>("");
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [role, setRole] = useState<string>("");
   const signin = (newUser: string, callback: VoidFunction) => {
      return fakeAuthProvider.signin(() => {
         // setUser(newUser);
         setIsAuthenticated(true);
         setRole(fakeAuthProvider.role);
         callback();
      });
   };

   const signout = (callback: VoidFunction) => {
      return fakeAuthProvider.signout(() => {
         // setUser("");
         setIsAuthenticated(false);
         setRole("");
         callback();
      });
   };

   const value = { isAuthenticated,role, signin, signout };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
