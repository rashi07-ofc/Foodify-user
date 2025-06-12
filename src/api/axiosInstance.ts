import axios from "axios";

 const axiosInstanse=axios.create({
    baseURL:"http://localhost:3005",
})

axiosInstanse.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("authToken");

        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (err)=>Promise.reject(err)
)

export default axiosInstanse;