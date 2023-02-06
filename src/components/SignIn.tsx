import { useState, useEffect } from "react";
import axios from "axios";

export const SignIn = () => {
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
    if (valid.email === true && valid.password === true) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [valid]);
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
            .then((response) =>
              localStorage.setItem("jwt", response.data.access_token)
            )
            .catch((error) => console.error(error));
        }}
      >
        로그인
      </button>
    </div>
  );
};
