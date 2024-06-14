import React from "react";
import RegisterFormUser from "./RegisterUser";
import UserLoginPage from "../../../User/components/UserLoginPage";
import "./FlipStyling.css";

export default function CustomForm() {
  return (
    <>
      <div className="wrapper ">
        <div className="card-switch">
          <label className="switch">
            <input type="checkbox" className="toggle" />
            <span className="slider" />
            <span className="card-side" />
            <div className="flip-card__inner">
              <UserLoginPage />
              <RegisterFormUser />
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
