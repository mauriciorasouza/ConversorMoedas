import axios from 'axios';

const BASE_URL = 'https://economia.awesomeapi.com.br/json/last';


export const converterMoeda = async (valor, moedaOrigem, moedaDestino) => {
  try {
    const moedas = `${moedaOrigem}-${moedaDestino}`;
    const response = await axios.get(`${BASE_URL}/${moedas}`);
    const key = `${moedaOrigem}${moedaDestino}`;
    const taxa = response.data[key].bid;
    return (parseFloat(valor) * parseFloat(taxa)).toFixed(2);
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const obterHistorico = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/daily/USD/5');
    const data = await response.json();
    return data.reverse();
  } catch (error) {
    console.error('Erro ao obter o histórico de cotação:', error);
    return [];
  }
};

export default obterHistorico;
