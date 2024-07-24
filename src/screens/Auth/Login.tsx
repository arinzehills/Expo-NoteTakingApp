// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {firebaseConfig} from '../../config/firebaseConfig';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { useAuth } from '../../contexts/AuthProvider';
import MyButton from '../../components/MyButton/MyButton';
import { colors } from '../../utils/colors';
import { horizontalScale, verticalScale } from '../../utils/Scaling';
import MyText from '../../components/MyText/MyText';
import messagingComponent from '../../utils/messagingComponent';
import NoAccount from '../../components/NoAccount/NoAccount';
import { Formik } from 'formik';
import * as yup from 'yup';
import PasswordInput from '../../components/MyTextInput/PasswordInput';

const firebaseApp = initializeApp(firebaseConfig);

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
const LoginScreen = ({navigation}:any) => {
  const [loading, setLoading] = useState(false);
  const {dispatch: authDispatch,state} = useAuth();
  const [error, setError] = useState('');

  const auth=getAuth(firebaseApp)
  const handleLogin = async (values:any) => {
    console.log("values ere",values)

    try {
      setLoading(true)
      var res=await signInWithEmailAndPassword(auth,values.email.toLocaleLowerCase(), values.password);
      console.log(res['user'].getIdToken)
      authDispatch({type: 'LOGIN', payload: res['user']});
      setLoading(false)
      setError('')
    } catch (error:any) {
      setLoading(false)
      setError(error.message)
    }
  };

  return (
    <View style={styles.container}>
      <MyText size='xl' color={colors.myRed} textStyle={{marginVertical:verticalScale(10)}}>Login</MyText>
      <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: '',password:""}}
            onSubmit={async values => {
             await handleLogin(values);
            }}>
              {props => (<>
      <TextInput
        style={styles.input}
        placeholder="Email"
            autoCapitalize='none'
        value={props.values.email}
        onChangeText={props.handleChange('email')}
      />
      {props.touched.email && props.errors.email && (
                  <MyText color="red" size="xm">
                    {props.errors.email}
                  </MyText>
                )}
      <PasswordInput
            placeholder="Password"
            value={props.values.password}
            onChangeText={props.handleChange('password')}
            onBlur={props.handleBlur('password')}
          />
      {props.touched.password && props.errors.password && (
                  <MyText color="red" size="xm">
                    {props.errors.password}
                  </MyText>
                )}
      {error&&<MyText color={colors.danger}>{error}</MyText>}
        <MyButton
            btnStyles={{backgroundColor: colors.myRed, width: 300}}
            onPress={props.handleSubmit}
            isLoading={loading}
            textStyles={{color: 'white'}}>
              Login
            </MyButton>
            </>  
            )}
            </Formik> 
           
                <NoAccount
              preText="Don't have an account?"
              mainText="Sign up"
              onPress={() => navigation.navigate('Register')}
            />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    width: '100%',
    paddingHorizontal: 20, 
  },
  input: {
    width: '90%',
    height: verticalScale(50),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default LoginScreen;
