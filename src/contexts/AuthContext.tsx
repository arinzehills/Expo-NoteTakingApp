import { useContext } from "react";
import { AuthAction, AuthState } from "./AuthProvider";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from "../navigation/AuthNavigator";


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      // login(action.payload);
      return {
        isAuthenticated: true,
        token:action.payload.token
      };
      case 'REGISTER':
        return {
        isAuthenticated: false,
        token: null,
        };
    case 'LOGOUT':
      // logout();
      return {
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

// export const login = (dispatch, email, password) => {
//      auth.signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       user.getIdToken().then((token) => {
//         dispatch({ type: 'LOGIN', payload: { token } });
//       });
//     })
//     .catch((error) => {
//       console.error('Login Error:', error.message);
//       // Handle login error here
//     });
// };

// Logout function
// export const logout = (dispatch) => {
//   auth.signOut()
//     .then(() => {
//       dispatch({ type: 'LOGOUT' });
//     })
//     .catch((error) => {
//       console.error('Logout Error:', error.message);
//       // Handle logout error here
//     });
// };