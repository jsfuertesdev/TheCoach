'use client'

import React, { useEffect, useState } from 'react';
// import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const SolanaButton = () => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const handleConnect = async () => {
    if (window.solana) {
      try {
        const response = await window.solana.connect();
        const publicKey = new PublicKey(response.publicKey);
        setCurrentAccount(publicKey.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Navegador no-Solana detectado. Considera probar Solana Wallet!');
    }
  };

  const handleLogout = () => {
    setCurrentAccount(null);
  };

  useEffect(() => {
    const connectButton = document.getElementById("connectButton");
    connectButton.addEventListener('click', handleConnect);

    return () => {
      connectButton.removeEventListener('click', handleConnect);
    };
  }, []);

  return (
    <div>
      {currentAccount ? (
        <div>
          <p id="account">Connected Account: {currentAccount}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button className='btn' onClick={handleConnect} id="connectButton">WIN TOKENS</button>
      )}
    </div>
  );
};

export default SolanaButton;