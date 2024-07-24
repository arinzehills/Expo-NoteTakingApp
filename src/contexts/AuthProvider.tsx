import { createContext, ReactNode, useReducer ,Dispatch, useContext} from "react";
import { authReducer } from "./AuthContext";

export interface AuthProviderProps {
    children: ReactNode;
  }
  export interface AuthState {
    isAuthenticated: boolean;
    token:string | null;
    // isLoading:boolean
    // user: null | UserProps; 
  }
  export type AuthAction = {type: 'REGISTER'; payload: any} |{type: 'LOGIN'; payload: any} | {type: 'LOGOUT'} ;

  interface AuthContextType {
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
      isAuthenticated: false,
      token:null
    });
    const getUser = async () => {
    //   const userFromStorage = await AsyncStorage.getItem('user');
    //   if (userFromStorage) {
    //     const user = JSON.parse(userFromStorage!) as UserProps;
    //     dispatch({
    //       type: 'LOGIN',
    //       payload: user,
    //     });
    //   }
    };
    // useEffect(() => {
    //   //TODO
    //   getUser();
    // }, []);
  
    // //console.log('Auth Context: ', state);
    const value = {state, dispatch};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };