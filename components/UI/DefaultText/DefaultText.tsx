import React from 'react';
import { Text, TextStyle, StyleSheet, TextProps } from 'react-native';
import { COLORS } from '../../../constants/colors';

interface DefaultTextProps extends TextProps {
    children: React.ReactNode,
    style?: TextStyle
}

const DefaultText = (props: DefaultTextProps) => {
    return (
        <Text { ...props } style={{ ...styles.defaultText, ...props.style }}>{ props.children }</Text>
    );
};

const styles = StyleSheet.create({
    defaultText: {
        fontFamily: 'open-sans',
        color: COLORS.text
    }
});

export default DefaultText;
