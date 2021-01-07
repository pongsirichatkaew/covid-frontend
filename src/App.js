import { useState, useEffect } from "react";
import MyChart from "./components/Chart";
import { fetchCovidAPI } from "./services/CovidService";
function App() {
  const [data, updateData] = useState([]);
  const [categories, setCategoris] = useState([]);
  const [count, setCount] = useState(1);

  async function fetchData() {
    if (count % 30 !== 0) {
      const data = await fetchCovidAPI(count % 30);
      let dataArr = data.covidWithDay;
      dataArr = dataArr.sort((a, b) =>
        a.covidTimelineCase > b.covidTimelineCase
          ? -1
          : a.covidTimelineCase < b.covidTimelineCase
          ? 1
          : 0
      );

      const updatedData = dataArr.map((data) => data.covidTimelineCase);
      const updatedCategories = dataArr.map((data) => data.country);

      updateData(updatedData);
      setCategoris(updatedCategories);
    }
  }
  useEffect(() => {
    setCount(count + 1);
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
      fetchData();
    }, 2000);
    return () => {
      window.clearInterval(interval);
    };
  }, [count]);
  return (
    <div className="app">
      Covid Global Base By SGN
      <div className="row">
        <div className="mixed-chart">
          <MyChart data={data} categories={categories} type="bar" width="500" />
        </div>
      </div>
    </div>
  );
}

export default App;
