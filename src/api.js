import axios from "axios";

// const url =
//   "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlaces = async (type, sw, ne) => {
  if (!sw || !ne) return;
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key":
            "a323b50298msh9b3e5a6c5eedabep17807cjsndbdfcd8b5b47",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
