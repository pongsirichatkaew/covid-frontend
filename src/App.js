import { useState, useEffect } from "react";
import MyChart from "./components/Chart";
import { fetchCovidAPI } from "./services/CovidService";
import "./App.css";
import styled from "styled-components";
function App() {
  const [data, updateData] = useState([]);
  const [categories, setCategoris] = useState([]);
  const [count, setCount] = useState(30);
  const [date, setDate] = useState("");

  async function fetchData() {
    if (count % 30 !== 0) {
      console.log(count);
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
      setDate(data.date);
    }
  }
  useEffect(() => {
    setCount(Math.abs(count - 1));
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (count - 1 === -1) {
        setCount(30);
      } else {
        setCount(count - 1);
      }
      fetchData();
    }, 100);
    return () => {
      window.clearInterval(interval);
    };
  }, [count]);
  return (
    <Container>
      <p>Covid Global Base By SGN </p>
      <p> {date}</p>
      <div className="row">
        <div className="mixed-chart">
          <MyChart data={data} categories={categories} type="bar" width="500" />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  p {
    text-align: center;
    font-size: 1.2rem;
  }
`;

export default App;
