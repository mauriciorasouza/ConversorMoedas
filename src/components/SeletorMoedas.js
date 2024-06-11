import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../assets/context/ContextoVisual';

const SeletorMoedas = ({ selectedValue, onValueChange, itemStyle }) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, itemStyle, isDarkMode && styles.containerDark]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles.picker, isDarkMode && styles.pickerDark]}
      >
        <Picker.Item label="BRL - Real Brasileiro" value="BRL" />
        <Picker.Item label="USD - Dólar Americano" value="USD" />
        <Picker.Item label="EUR - Euro" value="EUR" />
        <Picker.Item label="GBP - Libra Esterlina" value="GBP" />
        <Picker.Item label="JPY - Iene Japonês" value="JPY" />
        <Picker.Item label="CNY - Yuan Chinês" value="CNY" />
        <Picker.Item label="CHF - Franco Suíço" value="CHF" /> 
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: 'white',
  },
  containerDark: {
    backgroundColor: '#555555',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    paddingHorizontal: 10, 
  },
  pickerDark: {
    backgroundColor: '#555555',
    color: 'white',
  },
});

export default SeletorMoedas;
