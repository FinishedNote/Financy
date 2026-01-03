import { useState } from "react";
import ky from "ky";
import Header from "./components/Header";
import CustomInput from "./components/CustomInput";
import { Line } from "react-chartjs-2";
import LineGraph from "./components/LineGraph";

const App = () => {
  const [ticker, setTicker] = useState("");
  const [window, setWindow] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

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

      setCurrentPrice(response.current_price);

      return setData({ labels, prices });
    } catch (err) {
      console.error(err);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <Header />
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
              {currentPrice ? currentPrice + " $" : "undifined"}
            </span>
          </p>
          <p className="flex flex-col text-xl text-tint-gray">
            Performance (1 yr)
            <span className="font-medium text-red-600">... %</span>
          </p>
        </div>
      </div>
      <div className="w-2/5 h-96 rounded-2xl bg-background-secondary border border-border-secondary flex items-center justify-center">
        <LineGraph data={data} />
      </div>
    </div>
  );
};

export default App;
