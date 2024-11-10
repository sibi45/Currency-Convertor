import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangerate, setExchangeRate] = useState(null);
  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        // console.log(response);
        setExchangeRate(response.data.rates[toCurrency]);
      }catch (error) {
          console.error("Error fetching exchange rate :", error);
        }
      
   };
    getExchangeRate();

  },[fromCurrency,toCurrency]);



  useEffect(() =>{
  if(exchangerate !== null) {
    setConvertedAmount((amount*exchangerate).toFixed(2));
  }   
  },[amount,exchangerate])

  const handleAmountChange = (e) =>{
    const value =parseFloat(e.target.value);
   setAmount(isNaN(value) ? 0 :value);
  }

  const handleFromCurrencyChange = (e) =>{
   setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) =>{
    setToCurrency(e.target.value);
   };

  return (
    <>
      <div className='currency-convertor'>
        <div className='box'> </div>
        <div className='data'>
          <h1>currency converter</h1>
          <div className='input-container'>
            <label htmlFor="amt">Amount</label>
            <input type="number" id="amt" value={amount} onChange = {handleAmountChange} />
          </div>
          <div className='input-container'>
            <label htmlFor="from-currency">From currency:</label>
            <select id="from-currency" value={fromCurrency} onChange = {handleFromCurrencyChange}>
              <option value="USD">USD - United states of Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British pound sterling</option>
              <option value="JPY">JPY - Japenese yen</option>
              <option value="AUD">AUD - Australien Doller</option>
              <option value="CAD">CAD - Canadian Dollor</option>
              <option value="CNY">CNY - Chinese yuan</option>
              <option value="INR">INR - indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>

          </div>
          <div className='input-container'>
            <label htmlFor="To currency">To currency:</label>
            <select id="To currency" value={toCurrency} onChange = {handleToCurrencyChange}>
              <option value="USD">USD - United states of Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British pound sterling</option>
              <option value="JPY">JPY - Japenese yen</option>
              <option value="AUD">AUD - Australien Doller</option>
              <option value="CAD">CAD - Canadian Dollor</option>
              <option value="CNY">CNY - Chinese yuan</option>
              <option value="INR">INR - indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className='result'>
            <p> {amount} {fromCurrency} is Equal to {convertedAmount} {toCurrency}</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
