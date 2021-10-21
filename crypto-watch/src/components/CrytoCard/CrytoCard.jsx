import React, { useState, useEffect } from 'react'
import './CrytoCard.css'

function getSymbols(title) {
    var crytoSymbol;
    switch (title) {
        case "Bitcoin":
            crytoSymbol = 'BTC';
            break;

        case "Ethereum":
            crytoSymbol = 'ETH';
            break;

        default:
            crytoSymbol = '';
            break;
    }
    return crytoSymbol;
}

const CrytoCard = ({ title, imageURL }) => {

    const [coinbaseBuyPrice, setCoinbaseBuyPrice] = useState(0);
    const [coinbaseSellPrice, setCoinbaseSellPrice] = useState(0);

    const [geminiAskPrice, setGeminiAskPrice] = useState(0);
    const [geminiBidPrice, setGeminiBidPrice] = useState(0);

    const [recommendedBuy, setRecommendedBuy] = useState("");
    const [recommendedSell, setRecommendedSell] = useState("");

    const symbol = getSymbols(title);

    async function fetchCoinbaseData(crytoSymbol, action) {
        try {
            setInterval(async () => {
                const response = await fetch(`/coinbase/${action}/${crytoSymbol}-USD`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                const result = await response.json();
                if (action === 'buy') {
                    setCoinbaseBuyPrice(result.data.amount);
                } else if (action === 'sell') {
                    setCoinbaseSellPrice(result.data.amount);
                }
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchGeminiData(crytoSymbol) {
        try {
            setInterval(async () => {
                const response = await fetch(`/gemini/prices/${crytoSymbol}usd`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                const result = await response.json();
                setGeminiAskPrice(result.ask);
                setGeminiBidPrice(result.bid);
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    }

    function getRecomendations(action) {
        if (action === "buy") {
            if (coinbaseBuyPrice < geminiAskPrice) {
                setRecommendedBuy("coinbase");
            } else if (coinbaseBuyPrice > geminiAskPrice) {
                setRecommendedBuy("Gemini");
            }
        }
        if (action === "sell") {
            if (coinbaseSellPrice > geminiBidPrice) {
                setRecommendedSell("coinbase");
            } else if (coinbaseSellPrice < geminiBidPrice) {
                setRecommendedSell("Gemini");
            }
        }
    }

    useEffect(() => {
        fetchCoinbaseData(symbol, 'buy');
        fetchCoinbaseData(symbol, 'sell');
    }, [symbol]);

    useEffect(() => {
        fetchGeminiData(symbol)
    }, [symbol])

    useEffect(() => {
        getRecomendations("buy");
        getRecomendations("sell");
    })

    return (
        <div className="card-cotainer">
            <div className="image-container">
                <img src={imageURL} alt='' />
            </div>
            <h2>
                <b>{title}</b>
            </h2>
            <h4>Buy:</h4>
            <div className="price-list ">
                Coinbase exchange:
                <div>{coinbaseBuyPrice} USD</div>
                Gemini exchange:
                <div>{geminiAskPrice} USD</div>
            </div>
            <h4>Sell:</h4>
            <div className="price-list">
                Coinbase exchange:
                <div>{coinbaseSellPrice} USD</div>
                Gemini exchange:
                <div>{geminiBidPrice} USD</div>
            </div>
            <h4>Recommended exchange: </h4>
            <div>
                <div><b>Buy: </b> {recommendedBuy}</div>
                <div><b>Sell: </b> {recommendedSell}</div>
            </div>
        </div>
    )
}

export default CrytoCard
