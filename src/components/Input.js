import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, secureTextEntry }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        width: '100%',
    },
});

export default Input;
