import axios from "axios";

const API = axios.create({

  baseURL:
    "https://atomquestgoaltrackerportal-production.up.railway.app",

});

export default API;