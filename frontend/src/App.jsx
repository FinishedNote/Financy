import { useState } from "react";
import ky from "ky";
import Header from "./components/Header";
import CustomInput from "./components/CustomInput";
import LineGraph from "./components/LineGraph";
import Navbar from "./components/Navbar";

const App = () => {
  const [ticker, setTicker] = useState("");
  const [window, setWindow] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [marketReturn, setMarketReturn] = useState(null);

  const handleSimulate = async () => {
    if (!ticker) {
      alert("Empty field");
      return;
    }

    try {
      setLoading(true);
      const response = await ky
        .get(`http://localhost:8000/simulate/${ticker}?${window}`)
        .json();

      setLoading(false);

      const labels = response.chart_data.map((d) =>
        new Date(d.Date).toLocaleDateString()
      );
      const prices = response.chart_data.map((d) => d.Price);
      const ma = response.chart_data.map((d) => d.MA);

      setCurrentPrice(response.current_price);
      setMarketReturn(response.market_return_percent);

      return setData({ labels, prices, ma });
    } catch (err) {
      console.error(err);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-5">
      <Header />
      <Navbar />
      <div className="w-full h-full flex flex-col justify-center items-center gap-5 px-20 pb-10">
        <div className="w-2/5 flex flex-col gap-5">
          <div className="w-full flex justify-center gap-2.5">
            <CustomInput placeholder="Ticker" onChange={(e) => setTicker(e)} />
            <CustomInput placeholder="Window" onChange={(e) => setWindow(e)} />
            <button
              onClick={handleSimulate}
              className="w-1/3 h-12 rounded-xl hover:opacity-90 bg-tint text-black px-2.5 cursor-pointer"
            >
              <p className="text-xl/normal">
                {loading ? "Simulating..." : "Simulate"}
              </p>
            </button>
          </div>
          <div className="w-full h-22.5 flex justify-between items-center px-4 rounded-2xl bg-background-secondary border border-border-secondary">
            <p className="flex flex-col text-xl text-tint-gray">
              Current Price
              <span className="text-white font-medium">
                {currentPrice ? currentPrice + " $" : "[...] $"}
              </span>
            </p>
            <p className="flex flex-col text-xl text-tint-gray">
              Performance (1 yr)
              <span
                className={
                  marketReturn >= 0
                    ? "text-green-500 font-medium"
                    : "text-red-500 font-medium"
                }
              >
                {marketReturn
                  ? (marketReturn >= 0 ? "+" + marketReturn : marketReturn) +
                    " %"
                  : "[...] %"}
              </span>
            </p>
          </div>
        </div>
        <div className="w-2/5 h-96 rounded-2xl bg-background-secondary border border-border-secondary flex items-center justify-center">
          <LineGraph data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
