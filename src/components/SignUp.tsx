import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [valid, setValid] = useState({
    email: false,
    password: false,
  });
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (valid.email === true && valid.password === true) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [valid]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = event.target;
    setSignUpInfo({
      ...signUpInfo,
      [name]: value,
    });
    setValid({
      ...valid,
      [name]: validity.valid,
    });
  };

  return (
    <div>
      <input
        name="email"
        type="email"
        onChange={onChange}
        pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"
        data-testid="email-input"
        required
      />
      <input
        name="password"
        type="password"
        onChange={onChange}
        minLength={8}
        data-testid="password-input"
        required
      />
      <button
        disabled={disable}
        data-testid="signup-button"
        onClick={() => {
          axios
            .post(
              "/auth/signup",
              { email: signUpInfo.email, password: signUpInfo.password },
              {
                baseURL: "https://pre-onboarding-selection-task.shop",
                headers: { "Content-Type": "application/json" },
              }
            )
            .then(() => {
              navigate("/signin");
            })
            .catch((error) => alert(error.response.data.message));
        }}
      >
        회원가입
      </button>
    </div>
  );
};
