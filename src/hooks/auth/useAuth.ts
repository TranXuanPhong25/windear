import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthContextType } from "../../types/AuthContextType";
export function useAuth():AuthContextType{
   return useContext(AuthContext) ;
}