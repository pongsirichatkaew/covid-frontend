import axios from "axios";

const fetchCovidAPI = async (day) => {
  const { data } = await axios.get(`http://localhost:4000/covid/${day}`);
  return data;
};

export { fetchCovidAPI };
