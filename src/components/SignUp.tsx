import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Section, Article, Button, Input } from "../style/publicStyle";
import styled from "styled-components";

const Label = styled.label`
  margin-left: 1.7rem;
`;

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
    if (localStorage.getItem("jwt")) {
      navigate("/todo");
    }
    if (valid.email === true && valid.password === true) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [navigate, valid]);
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
    <Section>
      <h1>Sign Up</h1>
      <Article>
        <div>
          <Label htmlFor="email">E-Mail : </Label>
          <Input
            name="email"
            type="email"
            onChange={onChange}
            pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"
            data-testid="email-input"
            required
          />
        </div>
        <div>
          <label htmlFor="password">PassWord : </label>
          <Input
            name="password"
            type="password"
            onChange={onChange}
            minLength={8}
            data-testid="password-input"
            required
          />
        </div>
        <Button
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
        </Button>
      </Article>
    </Section>
  );
};
