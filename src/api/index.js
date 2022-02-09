import axios from "axios";

const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw, ne) => {
    try {

        const { data: { data } } = await axios.get(url, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': '8310c1b466msh067fb3852985d7ap178b99jsn980a6fa7c8a4'
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}