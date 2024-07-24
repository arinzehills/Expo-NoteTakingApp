// RegisterScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { firebaseConfig } from '../../config/firebaseConfig';
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
import usePost from '../../customhooks/usePost';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import PasswordInput from '../../components/MyTextInput/PasswordInput';

const firebaseApp = initializeApp(firebaseConfig);

const regValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
const RegisterScreen = ({ navigation }: any) => {
  const { dispatch: authDispatch, state } = useAuth();
  const { data, error, loading, postData } = usePost('/register');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (payload: any) => {
    postData(payload);
  };
  useEffect(() => {
    // This ensures that if the start prop is true the request will be sent directly.
    if (data) {
      authDispatch({ type: 'REGISTER', payload: data });
      navigation.navigate('Login');
    }
  }, [loading, data]);
  return (
    <View style={styles.container}>
      <MyText size='xl' color={colors.myRed} textStyle={{ marginVertical: verticalScale(10) }}>Register</MyText>
      <Formik
      
        // validationSchema={regValidationSchema}
        initialValues={{ fullName: '', email: '', password: "" }}
        onSubmit={async values => {
          //  await handleLogin(values);
          handleSubmit(values)
        }}>
        {props => (<>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={props.values.fullName}
            onChangeText={props.handleChange('fullName')}
          />
          {props.touched.email && props.errors.email && (
            <MyText color="red" size="xm">
              {props.errors.email}
            </MyText>
          )}

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
          {error && <MyText size='xm' color={colors.danger}>{error?.message}</MyText>}
          <MyButton
          isRedBtn={true}
            btnStyles={{ width: 300 }}
            onPress={props.handleSubmit}
            isLoading={loading} >
            Register
          </MyButton>
        </>
        )}
      </Formik>

      <NoAccount
        preText="Don't have an account?"
        mainText="Sign up"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: '90%',
    height: verticalScale(45),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default RegisterScreen;
