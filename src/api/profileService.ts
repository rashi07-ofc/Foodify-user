import axios from "axios";


const API_BASE = "http://localhost:9000";


export const fetchUserProfile = async (token: string) => {
    console.log(token);
    const res = await axios.get(`${API_BASE}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log(res);
    console.log(res.data);
    return res.data; // adjust as per actual API response
};
