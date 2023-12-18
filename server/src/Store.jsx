import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";


const store = configureStore({
    reducer: {
        userInfo: userSlice
    }
})
export default store



// import { useNavigate } from "react-router-dom";
// import { activeUser } from "../../../../../../Slice/userSlice";
// import { useDispatch } from "react-redux";
//dispatch(activeUser(res.data.data));
// localStorage.setItem("userInfo", JSON.stringify(res.data.data));