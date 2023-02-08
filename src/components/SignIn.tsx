import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Section, Article, Input, Button } from "../style/publicStyle";
import styled from "styled-components";

const Label = styled.label`
  margin-left: 1.7rem;
`;

export const SignIn = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [valid, setValid] = useState({
    email: false,
    password: false,
  });
  const [signInInfo, setSignInInfo] = useState({
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
    setSignInInfo({
      ...signInInfo,
      [name]: value,
    });
    setValid({
      ...valid,
      [name]: validity.valid,
    });
  };
  return (
    <Section>
      <h1>Sign In</h1>
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
          data-testid="signin-button"
          onClick={() => {
            axios
              .post(
                "/auth/signin",
                { email: signInInfo.email, password: signInInfo.password },
                {
                  baseURL: "https://pre-onboarding-selection-task.shop",
                  headers: { "Content-Type": "application/json" },
                }
              )
              .then((response) => {
                localStorage.setItem("jwt", response.data.access_token);
                navigate("/todo");
              })
              .catch((error) => console.error(error));
          }}
        >
          로그인
        </Button>
      </Article>
    </Section>
  );
};
