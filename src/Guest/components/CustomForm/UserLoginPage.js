import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../userContext";
import Alert from "./Alert";
import styled from "styled-components";
import axios from "axios";
import { logincontext } from "../../GlobalContext/context";
import Cookies from "js-cookies";

// Styled components
const LoginPageContainer = styled.div`
  margin: 4rem auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  max-width: 30rem;
  margin: 0 auto;

  input {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    &:focus {
      border-color: #3182ce; /* Change the border color to blue on focus */
      outline: none; /* Remove the default outline */
      /* Add any other styles you want for the focused state */
    }
  }

  button {
    display: block;
    width: 100%;
    padding: 1rem;
    background-color: #3182ce;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1rem;

    &:hover {
      background-color: #2563eb;
    }
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #3182ce;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #2563eb;
    }
  }
`;

// LoginPage component
const UserLoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(logincontext);
  let navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    console.log(payload);

    axios
      .post("https://propilistic-backend.vercel.app/api/login", payload)
      .then((loginsuccess) => {
        Cookies.set("token", loginsuccess.data.token); //cookies main token ki value api se jo arahi wo set krdi
        dispatch({
          type: "LOGIN_USER",
          person: loginsuccess.data.token, //dipqtch ki ha token ki value
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.meesage);
      });
  };

  return (
    <LoginPageContainer className="my-14">
      <Title>Login</Title>
      <Form>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLoginSubmit}>
          Login
        </button>
      </Form>
      <RegisterLink>
        Don't have an account yet? <Link to="/register">Register here</Link>
      </RegisterLink>
    </LoginPageContainer>
  );
};

export default UserLoginPage;
