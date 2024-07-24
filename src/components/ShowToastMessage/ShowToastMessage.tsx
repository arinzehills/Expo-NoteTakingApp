import Toast from 'react-native-toast-message';

export const showTransactionResult = (isSuccess:boolean) => {
  if (isSuccess) {
    Toast.show({
      type: 'success',
      text1: 'Transaction Successful',
      text2: 'Your transaction has been completed successfully!',
    });
  } else {
    Toast.show({
      type: 'error',
      text1: 'Transaction Failed',
      text2: 'Something went wrong. Please try again.',
    });
  }
};
