import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "./App.css";
import { RouterProvider, useLocation } from "react-router-dom";
import { router } from "./Frontend/Components/Routes/Routes";

import { AnimatePresence } from "framer-motion";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    <>
      <div className="overflow-hidden">
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
