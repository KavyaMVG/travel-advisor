import axios from "axios";

const url =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
const options = {
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359",
  },
  headers: {
    "X-RapidAPI-Key": "a915e53925msh4a11d377ec58773p186d3ajsn21b3e7f45288",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

export const getPlaces = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(url, options);
    console.log("aaaa", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
