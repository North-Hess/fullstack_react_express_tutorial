import { createContext } from "react";

type AuthState = {
  username: string;
  id: number;
  status: boolean;
};

type AuthContextProps = {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
};

export const AuthContext = createContext({} as AuthContextProps);
