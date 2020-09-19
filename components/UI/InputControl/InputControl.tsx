import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { COLORS } from '../../../constants/colors';
import DefaultText from '../DefaultText/DefaultText';

interface InputControlProps extends TextInputProps {
    label: string,
    value: string,
    onValueChange: (newValue: string) => void
}

const InputControl = (props: InputControlProps) => {

    const [focused, setFocused] = useState(false);

    const toggleFocus = (focused: boolean) => {
        setFocused(focused);
    };

    const textChangedHandler = (text: string) => {
        props.onValueChange(text);
    };

    return (
        <View style={ styles.inputControl }>
            <DefaultText style={ styles.label }>{ props.label }</DefaultText>
            <TextInput style={{ ...styles.input, borderBottomColor: focused ? COLORS.primary : COLORS.common }}
                       { ...props }
                       value={ props.value }
                       onFocus={ () => toggleFocus(true) }
                       onBlur={ () => toggleFocus(false) }
                       onChangeText={ textChangedHandler }/>
        </View>
    );
};

const styles = StyleSheet.create({
    inputControl: {
        width: '100%',
        marginBottom: 20
    },
    label: {
        fontFamily: 'open-sans-bold'
    },
    input: {
        padding: 5,
        borderBottomWidth: 1
    }
});

export default InputControl;
