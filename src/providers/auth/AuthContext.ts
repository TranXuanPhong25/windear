import { createContext } from 'react';
import { AuthContextType } from '../../types/AuthContextType';

export const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>(null!);
