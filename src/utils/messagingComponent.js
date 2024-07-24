import React from 'react';
import Toast from "react-native-toast-message";
// import {helper} from "../constants";
import {Alert} from "react-native";

const messagingComponent = () => {
    const CODE_1 = 1;
    const CODE_2 = 2;
    const ERROR_CODE = null;

    const codeTypes = [
        {id: 1, description: "Success"},
        {id: 2, description: "Error"},
    ];

    function getCodeType(idx) {
        let dsc = codeTypes.filter(e => e.id === idx);
        return dsc ? dsc[0]?.description : "";
    }

    function returnMsgType(code) {
        switch (code) {
            case 1:
                return 'success';
            case 2:
                return 'error';
            case 3:
                return 'info';
        }
    }

    function showMessage(code = CODE_1, message = "", title = 'Info', time = 5) {
console.log("It played")
        // let title = this.getCodeType(code);
        let msgString = message?.response?.data?.msg ||message?.response?.data?.message || message?.data?.message || message?.message || message || "Please try again.";
        Toast.show({
            type: returnMsgType(code), //  code === 1 ?  'success' : "error",
            text1: title , //    code === 1 ?  'Success' : "Error",
            text2: (message?.response?.status === 500) ? 'Sorry! could not complete request.' : msgString,
            visibilityTime: time * 1000,
            zIndex: 9999999,
        });
    }

    function confirmAction(message ='', onSelect=()=>{}, title = 'Confirm Action') {
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Cancel",
                    onPress: () => onSelect?.(false),
                    style: "cancel",
                },
                {
                    text: "Yes, Continue",
                    onPress: () => onSelect?.(true),
                },
            ],
        );
    }

    return {showMessage, confirmAction}
};

export default messagingComponent;
