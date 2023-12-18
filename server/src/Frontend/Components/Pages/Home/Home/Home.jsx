import Banner from "./../Banner/Banner";
import Portfolio from "../Portfolio/Portfolio";
import Speach from "../Speach/Speach";
import Moments from "../Moments/Moments";
import Stories from "../Stories/Stories";
import React, { useState, useEffect } from "react"
import Api from "../../../Axios/Api";

const Home = () => {

  const visit = async () => {
    try {
      await Api.post(`/atms/api/v1/visitor`)
    } catch (error) {
      console.error("Error:", error)
    }
  }
  useEffect(() => {
    visit()

  }, [])
  return (
    <div>



      <Banner />
      <Portfolio />
      <Speach />
      <Moments />
      <Stories />
    </div>
  );
};

export default Home;
