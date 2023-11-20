import axios from "axios";

const url =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlaces = async (sw, ne) => {
  console.log("sw", sw, ne);
  try {
    const {
      data: { data },
    } = await axios.get(url, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "X-RapidAPI-Key": "a323b50298msh9b3e5a6c5eedabep17807cjsndbdfcd8b5b47",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    });
    console.log("apiPage", data);
    return data;
  } catch (error) {
    console.log("apilat", error);
  }
};
