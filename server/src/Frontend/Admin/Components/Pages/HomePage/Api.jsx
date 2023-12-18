import React from "react";
import axios from "axios";

const Api = axios.create({

    baseURL: "http://localhost:8080",
});

// console.log(Api.defaults.baseURL);

export default Api;
