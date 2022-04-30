import React, { useEffect } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {
  const history = useNavigate();

  useEffect(() => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    props.HandleAddCart();

    // props.setIsLogged((oldValue) => false);
    history("/sign-in");
  });
  return <div>Logout</div>;
}
