import { useEffect, useState } from "react";

function Body() {
  const [CryptoName, setCrypto] = useState("");
  const [CrptoData, setData] = useState([]);
  async function Crypt_info(CrptoName) {
    const Info = CryptoName.trim().toLocaleLowerCase();
    if (!Info) {
      console.log("Please");
      return;
    }
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${Info}`
      );
      if (!response.ok) {
        console.log("Error Fetching");
        return;
      }
      const data = await response.json();

      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="main">
        <input
          placeholder="Search for your Crypto Currency"
          className="input"
          value={CryptoName}
          onChange={(e) => setCrypto(e.target.value)}
        ></input>
        <button onClick={() => Crypt_info(CryptoName)} className="btn">
          Search
        </button>
        {CrptoData.map((data) => {
          return (
            <div className="content-section" key={data.id}>
           <h2>🚀 Explore the World of {data.name} 🌍</h2>

              <div className="image-container">
                <img src={data.image} alt={`${data.name} logo`} />
              </div>
              <h2 className="symbol">Symbol: {data.symbol}</h2>

              <ul>
                <li>Current Price : ${data.current_price}</li>
                <li>Market Cap : ${data.market_cap}</li>
                <li>Market Cap Rank : {data.market_cap_rank} </li>
                <li> Total Volume : {data.total_volume}</li>
                <li>Total Supply : {data.total_supply}</li>
                <li>Max Supply : {data.max_supply}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Body;
