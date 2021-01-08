import axios from "axios";

const fetchCovidAPI = async (day) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/covid/${day}`
  );
  return data;
};

export { fetchCovidAPI };
