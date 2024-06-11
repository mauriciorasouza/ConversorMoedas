import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, useColorScheme, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import obterHistorico from '../utils/Api';
import { useTheme } from '../assets/context/ContextoVisual';

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const dadosHistorico = await obterHistorico();
        setHistorico(dadosHistorico);
      } catch (error) {
        setErro('Erro ao buscar histórico');
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, []);

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const hoje = new Date();
  const ultimosCincoDias = [];
  for (let i = 4; i >= 0; i--) {
    const data = new Date(hoje);
    data.setDate(data.getDate() - i);
    ultimosCincoDias.push(data);
  }

  const labels = ultimosCincoDias.map(data => diasSemana[data.getDay()]);
  const valores = historico.map(item => parseFloat(item.bid));
  const media = valores.length ? (valores.reduce((acc, curr) => acc + curr, 0) / valores.length) : 0;

  const chartConfig = {
    backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
    backgroundGradientFrom: isDarkMode ? '#333333' : '#FFFFFF',
    backgroundGradientTo: isDarkMode ? '#333333' : '#FFFFFF',
    decimalPlaces: 2,
    color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: isDarkMode ? '#ffa726' : '#ffa726',
    },
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : erro ? (
        <Text style={styles.errorText}>{erro}</Text>
      ) : (
        <>
          <Text style={[styles.title, isDarkMode && styles.titleDark]}>Cotação do Dólar em Reais (BRL)</Text>
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: valores,
                },
              ],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel="R$"
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={[styles.text, isDarkMode && styles.textDark]}>Média dos últimos 5 dias: R$ {media.toFixed(2)}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  titleDark: {
    color: '#FFFFFF',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  textDark: {
    color: '#FFFFFF',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Historico;
