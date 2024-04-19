import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import transactionsData from "../src/Dataset/fraudNewTest.json";
import sagmemaker from "../src/assests/SageMaker.svg";
import dyanmodb from "../src/assests/aws-dynamodb.svg";
import apigateway from "../src/assests/aws-api-gateway.svg";
import lambda from "../src/assests/aws-lambda-1.svg";
import s3 from "../src/assests/amazon-s3-simple-storage-service.svg";
import amplify from "../src/assests/Amplify.svg";
import graph from "../src/ModelReport/Graph.png"
import creditcard from "../src/assests/credit card2.jpg"
import systemarch from "../src/assests/systemarchitecture.svg";

function App() {
  const [type, setType] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [data, setData] = useState();
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data)
      .then(() => setCopySuccess(true))
      .catch((err) => console.error('Could not copy text: ', err));
  };

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
    setShowCode(false);
    setError(false);
    setCopySuccess(false);
  };

  async function handleSubmit(){

    if(selectedTransaction == null || selectedTransaction.length > 0){
      setError(true);
    }else{
      setData(JSON.stringify({
        "data": `${selectedTransaction.cc_num}, ${selectedTransaction.amt}, ${selectedTransaction.zip}, ${selectedTransaction.lat}, ${selectedTransaction.long}, ${selectedTransaction.city_pop}, ${selectedTransaction.unix_time}, ${selectedTransaction.merch_lat}, ${selectedTransaction.merch_long}`
      }));
  
      setShowCode(true);

    }


  }

  return (
    <>
    <main>
    <header className='main'>
      <div className='heading'>
        <h1>Credit Card Transaction Fraud Detection</h1>
        <p>A system that uses a Machine Learning model to dectect if a credit card transaction is fraudulent or not</p>
        </div>
      <img className="creditcard" src={creditcard} alt="Credit Card" />
      </header>

      <div className='howto'>
            <h2>How to use</h2>

            <ol>
              <li>Select a type of transaction from the dropdown menu</li>
              <li>After selecting the type of transaction, select any one of the transactions that you would like to test</li>
              <li>Submit the transaction to get the data of the transaction</li>
              <li>Copy the <span className='code'>json</span> code snippet</li>
              <li>Click the "Run in Postman" button</li>
              <li>Paste the previously copied <span className='code'>json</span> code in the "Body" area</li>
              <li>Send the request to the let the Machine learning model predict if the transaction is real or fraudulent</li>
              <li>Your result will be displayed in the "Response" section</li>
            </ol>
      </div>

      <div className='testit'>
      <div>
        <h2>Test it using a transaction</h2>
        <label>Select a type of Transaction (Real or Fraud):</label>
        <select onChange={(e) => { setType(e.target.value); setShowCode(false); setSelectedTransaction(null) }}>
          <option value="">Select a Type of Transaction</option>
          <option value="1">Real</option>
          <option value="0">Fraudulent</option>
        </select>
      </div>

      <div>
        <label>Select a Transaction:</label>
        <select onChange={handleTransactionChange}>
          <option value="">Select a transaction</option>
          {selectedTransactions.map((transaction, index) => (
            <option key={index} value={transaction.transaction_id}>
                Date of Transaction: {transaction.trans_date_trans_time}&nbsp;
                Credit Card Number: {transaction.cc_num}&nbsp;
                Amount: {transaction.amt}&nbsp;
                Card Holder Name: {transaction.first} {transaction.last}&nbsp;
            </option>
          ))}
        </select>
      </div>


      {selectedTransaction && (
        <div className='info'>
          <label>Selected Transaction Details:</label>
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

      {error && <p className='error'>Please select a transaction to test</p>}
      <button onClick={handleSubmit}>Submit</button>

      {showCode && 
        <div className='copy'>
          <SyntaxHighlighter language="json" style={atomOneDark} wrapLines={true} wrapLongLines={true}>
            {data}
          </SyntaxHighlighter>

          <button onClick={copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} />
            </button>

            {copySuccess && <span>Copied to clipboard!</span>}
        </div>
      }

      {showCode &&
        <div>
          <a href="https://app.getpostman.com/run-collection/29418089-4a7a82d3-048f-4979-a0a5-8633ca7b113f" target="_blank" rel="noreferrer">
        <button className='postman'> <img src="https://voyager.postman.com/logo/postman-logo-icon-orange.svg" alt='Postman logo'/> Run in Postman </button>
          </a>
        </div>
      }

</div>

<div className='model_details'>
  <h2>Model Information</h2>
  <div className='content'>
    <div className='info'>
      <h3>Model Details</h3>
      <ul>
          <li>Type of Machine Learning Model: Xgboost Classifier</li>
          <li>Trained on subset of <a href='https://www.kaggle.com/datasets/kartik2112/fraud-detection' target='_blank' rel="noreferrer">Training and testing data</a></li>
          <li>Model Accuracy: 0.997</li>
          <li>Model F1 Score: 0.992</li>
          <li>Model Recall Score: 0.985</li>
        </ul>
        </div>

        <div className='graph'>
      <h3>Loss vs Step Graph of Model</h3>
      <img src={graph} alt='Graph displaying loss vs step score of the model'></img>
    </div>
  </div>
      <p>For more information the model and model training details, please <a href="xgboost_report.html" target='_blank' rel="noreferrer">click here</a></p>
</div>


<div className='techUsed'>
  <h2>Technologies Used</h2>
  <ul>
    <li><a href='https://aws.amazon.com/pm/dynamodb/' target='_blank' rel="noreferrer"><div><img src={dyanmodb} className='logo' alt='AWS Dynamodb logo'/> AWS DynamoDB</div></a></li>
    <li><a href='https://aws.amazon.com/pm/serv-s3/' target='_blank' rel="noreferrer"><div><img src={s3} className='logo' alt='AWS S3 logo'/> AWS S3</div></a></li>
    <li><a href='https://aws.amazon.com/pm/lambda/' target='_blank' rel="noreferrer"><div><img src={lambda} className='logo' alt='AWS Lambda logo'/> AWS Lambda</div></a></li>
    <li><a href='https://aws.amazon.com/api-gateway/' target='_blank' rel="noreferrer"><div><img src={apigateway} className='logo' alt='AWS API Gateway logo'/> AWS API Gateway</div></a></li>
    <li><a href='https://aws.amazon.com/sagemaker/' target='_blank' rel="noreferrer"><div><img src={sagmemaker} className='logo' alt='AWS sagemaker logo'/> AWS Sagemaker</div></a></li>
    <li><a href='https://aws.amazon.com/amplify/'target='_blank' rel="noreferrer"><div><img src={amplify} className='logo' alt='AWS Amplify logo'/> AWS Amplify</div></a></li>
  </ul>

</div>

<div className='about'>
  <h2>About the Project</h2>
  <img src={systemarch} alt='System Architecture of project'/>
  <p>
    This project illustrates an overview of how a bank can employ a credit card fraud dectection system. Assuming that a bank employes AWS services to create their fraud detection system,
    all credit card transaction are initially stored in a database. In my project, I used <a href='https://aws.amazon.com/pm/dynamodb/' target='_blank' rel="noreferrer">AWS's DynamoDB</a> to store some credit card transaction data. AWS's dynamodb is a servless NoSQL database that does not require any provising, patching
    or management. This type of a database is useful for companies since they do not have employ a database management system to manage their data. AWS takes the responsiblity to do this and hence provides a guarantee of the data being available 99.99% of the time.   
  </p>

  <p>
    To create a machine learning model, the model must be trained first to detect any anomilies. In order to do this, the credit card transaction data must be stored in a place where the machine leaning model can access it. It also requires this data to be formatted in a certain way such that it can be used and understood by the model. Hence for this purpose, I used a AWS's S3 bucket.
    AWS S3 is a object storage service that offers industry leading scalibility of the data stored in it. Amazon also claims that it guarantees the availability and security of that data stored in it with along with providing increased performance with storing and reterving data from it.    
    The data from AWS's DynamoDB is converted into a <span className='code'>.csv</span> before it is stored in a AWS S3 bucket. This data conversion process can be done using a service called AWS's Lambda.  
  </p>

  <p>
    AWS Lambda is a serverless compute service that runs code based on events and managaes the compute resources by itself. It does not require anyone to manage its services by maintaning a server, and rather scales itself based on the events and the code it executes.
    Using the event triggering service, AWS Lambda will automatically convert the data stored in AWS's DynamoDB into a <span className='code'>.csv</span> format and store it in a AWS S3 bucket.
  </p>

  <p>
    Once the data is stored in AWS's S3 bucket in the format that can be used by the machine learning model, I then utilize AWS's sagemaker to create and train our machine learning model. AWS sagemaker is a fully managed service that provides a variety of tools to create high-performing, lost-cost machine learning models. AWS sagemaker allows you to create create machine learning models using various programming languages such as Python, JavaScript, R, etc. For the purpose of this project, I used Python to create the model.
    AWS sagemaker also provides a variety of libraries to create a machine learning model along with its own sagemaker library. Some important python machine learning libraries such as sci-kit learn (<span className='code'>sklearn</span>), tensorflow, and pytorch are also available. I utlized the sci-kit learn as well as imbalanced-learn library (<span className='code'>imblearn</span>) for this project. I then created a xgboost classifer model that is trained to classify a transaction as real or fraudulent. 
  </p>

  <p>
    After training and validating the model, AWS sagemaker also allows the model to be deployed on its platform. After deploying the model, sagemaker creates a endpoint that needs to be invoked when a test transaction needs to be classified. Since this was a event based system, I once again utilized AWS Lambda for this purpose. I created a AWS Lambda function that would invoked the AWS sagemaker endpoint when a test transaction is passed to it.
    The xgboost machine learning classifier will classify the transaction as real or fraudulent based on what it has been trained on. This website, that is hosted on AWS Amplify, is part of that classification process as it provides a way for user to test out the model by selecting a known real or fraudlent transaction and evaluate the result of the model. 
  </p>
</div>
</main>
      </>
  );
}

export default App;
