import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SeletorMoedas from '../components/SeletorMoedas';
import { converterMoeda } from '../utils/Api';
import { useTheme } from '../assets/context/ContextoVisual';

const Conversao = () => {
  const [valor, setValor] = useState('');
  const [moedaOrigem, setMoedaOrigem] = useState('BRL');
  const [moedaDestino, setMoedaDestino] = useState('USD');
  const [resultado, setResultado] = useState(null);
  const { isDarkMode } = useTheme();

  const handleConverter = async () => {
    const result = await converterMoeda(valor, moedaOrigem, moedaDestino);
    setResultado(result);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.label, isDarkMode && styles.labelDark]}>Valor:</Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />
      <Text style={[styles.label, isDarkMode && styles.labelDark]}>Moeda de Origem:</Text>
      <View style={styles.seletorContainer}>
        <SeletorMoedas
          selectedValue={moedaOrigem}
          onValueChange={setMoedaOrigem}
          itemStyle={styles.seletorItem} 
        />
      </View>
      <Text style={[styles.label, isDarkMode && styles.labelDark]}>Moeda de Destino:</Text>
      <View style={styles.seletorContainer}>
        <SeletorMoedas
          selectedValue={moedaDestino}
          onValueChange={setMoedaDestino}
          itemStyle={styles.seletorItem} 
        />
      </View>
      <TouchableOpacity style={styles.botao} onPress={handleConverter}>
        <Text style={styles.textoBotao}>Converter</Text>
      </TouchableOpacity>
      {resultado && (
        <Text style={[styles.resultado, isDarkMode && styles.resultadoDark]}>{`${valor} ${moedaOrigem} = ${resultado} ${moedaDestino}`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    backgroundColor: '#f0f0f0',
    flex: 1,
    justifyContent: 'center',
  },
  containerDark: {
    backgroundColor: '#333333',
  },
  label: { 
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  labelDark: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
  },
  inputDark: {
    backgroundColor: '#555555',
    color: 'white',
  },
  resultado: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  resultadoDark: {
    color: '#fff',
  },
  botao: {
    backgroundColor: '#0000C8',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Conversao;
