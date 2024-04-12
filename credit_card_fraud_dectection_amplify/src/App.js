import React, { useEffect, useState } from 'react';

import transactionsData from "../src/Dataset/fraudNewTest.json";

function App() {
  const [type, setType] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (type !== "") {
      const filteredTransactions = transactionsData.filter(transaction => transaction.is_fraud === parseInt(type));
      const randomIndexes = [];
      while (randomIndexes.length < 5) {
        const randomIndex = Math.floor(Math.random() * filteredTransactions.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      const selectedTransactions = randomIndexes.map(index => filteredTransactions[index]);
      setSelectedTransactions(selectedTransactions);
    }
  }, [type]);

  const handleTransactionChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const transaction = selectedTransactions.find(transaction => transaction.transaction_id === selectedId);
    setSelectedTransaction(transaction);
  };

  function handleSubmit(){

  }

  return (
    <div>
      <h1>Credit Card Transaction Fraud Detection</h1>

      <form onSubmit={handleSubmit}>

      <div>
        <label>Select a type of Transaction (Real or Fraud):</label>
        <select onChange={(e) => { setType(e.target.value) }}>
          <option value="">Select a Type of Transaction</option>
          <option value="1">Real</option>
          <option value="0">Fraudulent</option>
        </select>
      </div>

      <div>
        <h2>Select a Transaction:</h2>
        <select onChange={handleTransactionChange}>
          {selectedTransactions.map((transaction, index) => (
            <option key={index} value={transaction.transaction_id}>
              <ul>
                <li>Date of Transaction: {transaction.trans_date_trans_time}</li>
                <li>Credit Card Number: {transaction.cc_num}</li>
                <li>Amount: {transaction.amt}</li>
                <li>Merchant: {transaction.merchant}</li>
              </ul>
            </option>
          ))}
        </select>
      </div>

      {selectedTransaction && (
        <div>
          <h2>Selected Transaction Details:</h2>
          <ul>
          <li>Card Holder Name: {selectedTransaction.first} {selectedTransaction.last}</li>
          <li>Date Of Birth: {selectedTransaction.dob}</li>
          <li>Date of Transaction: {selectedTransaction.trans_date_trans_time}</li>
          <li>Credit Card Number: {selectedTransaction.cc_num}</li>
          <li>Amount: ${selectedTransaction.amt}</li>
          <li>Merchant: {selectedTransaction.merchant}</li>
          <li>Transaction Number: {selectedTransaction.trans_num}</li>
          </ul>
        </div>
      )}

        <button type='submit'>Submit</button>

        </form>


    </div>
  );
}

export default App;
