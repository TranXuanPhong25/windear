export interface AuthContextType {
   isAuthenticated: boolean;
   role:string;
   user:string;
   signin: (user: string, callback: VoidFunction) => void;
   signout: (callback: VoidFunction) => void;
}
