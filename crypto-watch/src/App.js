import React from "react";
import "./App.css";
import CrytoCard from "./components/CrytoCard/CrytoCard";
import bitcoinLogo from "./assets/bitcoin.png";
import ethereumLogo from "./assets/ethereum.png";

const App = () => {
  return (
    <>
      <div className="title">
        <h1>Crypto Watch</h1>
      </div>
      <div className="cryto-list">
        <div>
          <CrytoCard title="Bitcoin" imageURL={bitcoinLogo} />
        </div>
        <div>
          <CrytoCard title="Ethereum" imageURL={ethereumLogo} />
        </div>
      </div>
    </>
  );
};

export default App;
