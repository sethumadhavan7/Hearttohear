import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import { abi } from './Abi.js'; // Assuming your ABI file is named Abi.json
import { json } from 'react-router-dom';
import Api from '../Api/Api.js';
import Menu2 from '../Components/Menu2.jsx';

const Cryptopages = () => {
  const [coins, setCoins] = useState(); // Example initial value
  const [tokens, setTokens] = useState();  // Example initial value
  const [walletConnected, setWalletConnected] = useState(false);
  const [conversionInput, setConversionInput] = useState(''); // Input value for conversion
  const [inputError, setInputError] = useState(''); // Error message for input validation
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [userid,setuserid] = useState();

  const contractAddress = "0x3aD89DDe7e823a23D1518D841B3e34E14D209320";

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const contract = new web3.eth.Contract(abi, contractAddress);
        setContract(contract);
        setWalletConnected(true);
      } else {
        alert('Please install MetaMask to use this dApp!');
      }
    };

    initWeb3();
  }, []);

  useEffect(()=>{
    const coin = JSON.parse(localStorage.getItem("Mental-App"))
    setuserid(coin._id)
    setCoins(coin.coins)
    setTokens(coin.tokens)
  },[])

  // Function to convert coins to tokens based on user input
  const convertCoinsToTokens = async () => {
    const coinsToConvert = parseInt(conversionInput, 10);

    // Validate input
    if (isNaN(coinsToConvert) || coinsToConvert < 100) {
      setInputError('Please enter at least 100 coins to convert.');
      return;
    }

    if (coinsToConvert % 100 !== 0) {
      setInputError('Please enter a multiple of 100 coins to convert.');
      return;
    }

    if (coinsToConvert > coins) {
      setInputError('Insufficient coins.');
      return;
    }

    // Calculate full tokens and remaining coins
    const tokensToAdd = Math.floor(coinsToConvert / 100); // Number of tokens to add
    const remainingCoins = coins - coinsToConvert; // Remaining coins after conversion

    // Interact with the contract
    try {
      await contract.methods.mintFromCoins(account, coinsToConvert).send({ from: account });

      // Update tokens and coins in the backend
      const userId = userid; // Use the account as the user ID or get it from your user management system
      const response = await Api.patch(`/update/updatetoken/${userId}`, { tokens: tokens + tokensToAdd, coins: remainingCoins });
      console.log(response.data);
      
      if (response.status === 200) {
        const updatedTokens = tokens + tokensToAdd;
        const updatedCoins = remainingCoins;
        
        setTokens(updatedTokens);
        setCoins(updatedCoins);

        const storedData = JSON.parse(localStorage.getItem("Mental-App")) || {};
        storedData.tokens = updatedTokens;
        storedData.coins = updatedCoins;
        localStorage.setItem("Mental-App", JSON.stringify(storedData));
        
        setConversionInput(''); // Clear input after conversion
        setInputError(''); // Clear error message
        alert("Success");
      } else {
        setInputError('Failed to update tokens and coins in the backend.');
      }
    }catch (error) {
      console.error('Error converting coins to tokens:', error);
      setInputError('Error converting coins to tokens.');
    }
  };

  // Calculate tokens and remaining coins based on input
  const calculateConversion = () => {
    const coinsToConvert = parseInt(conversionInput, 10);
    if (!isNaN(coinsToConvert) && coinsToConvert >= 100 && coinsToConvert % 100 === 0) {
      const tokensToAdd = Math.floor(coinsToConvert / 100); // Number of tokens to add
      const remainingCoins = coinsToConvert % 100; // Remaining coins after conversion
      return `You will get ${tokensToAdd} tokens and ${remainingCoins} coins will be left.`;
    }
    return '';
  };

  // Simulate wallet connection
  const handleConnectWallet = async () => {
    if (walletConnected) {
      setWalletConnected(false);
      setAccount(null);
      setContract(null);
      alert("Wallet disconnected");
    } else {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const contract = new web3.eth.Contract(abi, contractAddress);
      setContract(contract);
      setWalletConnected(true);
      alert("Wallet connected");
    }
  };

  return (
    <Container>
        <div className="menu">
        <Menu2/>
      </div>
      <Header>
        <h1>Crypto Dashboard</h1>
        <WalletButton onClick={handleConnectWallet}>
          {walletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
        </WalletButton>
      </Header>
      {walletConnected && <WalletAddress>Connected Account: {account}</WalletAddress>}
      <CryptoInfo>
        <InfoBox>
          <h2>Available Coins</h2>
          <p>{coins} Coins</p>
        </InfoBox>
        <InfoBox>
          <h2>Available Tokens</h2>
          <p>{tokens} Tokens</p>
        </InfoBox>
      </CryptoInfo>
      <ConversionSection>
        <InputField
          type="number"
          value={conversionInput}
          onChange={(e) => {
            setConversionInput(e.target.value);
          }}
          placeholder="Enter coins to convert (100 or more)"
          error={!!inputError} // Pass error state to styled component
        />
        {conversionInput && (
          <ConversionDetails>
            {calculateConversion()}
          </ConversionDetails>
        )}
        <ConversionInfo>
          <p>Conversion Rate: 100 coins = 1 token</p>
          {inputError && <ErrorMessage>{inputError}</ErrorMessage>}
        </ConversionInfo>
        <ConvertButton onClick={convertCoinsToTokens}>
          Convert Coins to Tokens
        </ConvertButton>
      </ConversionSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
.menu {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
  min-height: 100vh;
  padding-top: 5rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4caf50;
  padding: 20px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const WalletButton = styled.button`
  background-color: ${(props) => (props.connected ? '#f44336' : '#4caf50')};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.connected ? '#d32f2f' : '#45a049')};
  }
`;

const WalletAddress = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #4caf50;
  font-weight: bold;
`;

const CryptoInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const InfoBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 30%;

  h2 {
    color: #4caf50;
  }

  p {
    font-size: 24px;
    font-weight: bold;
  }
`;

const ConversionSection = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid ${(props) => (props.error ? '#f44336' : '#4caf50')};
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${(props) => (props.error ? '#f44336' : '#45a049')};
  }
`;

const ConversionDetails = styled.p`
  font-size: 16px;
  margin: 10px 0;
  color: #4caf50;
`;

const ConversionInfo = styled.div`
  margin-top: 10px;
  font-size: 18px;
  color: #4caf50;

  p {
    font-weight: bold;
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 16px;
  margin: 10px 0;
`;

const ConvertButton = styled.button`
  display: block;
  width: 100%;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default Cryptopages;