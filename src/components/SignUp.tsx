import React, { useState, useEffect } from "react";

export const SignUp = () => {
  const [disable, setDisable] = useState(true);
  const [valid, setValid] = useState({
    mail: false,
    pw: false,
  });
  useEffect(() => {
    if (valid.mail === true && valid.pw === true) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [valid]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, validity } = event.target;
    setValid({
      ...valid,
      [name]: validity.valid,
    });
  };
  return (
    <div>
      <input
        name="mail"
        type="email"
        onChange={onChange}
        pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"
        data-testid="email-input"
        required
      />
      <input
        name="pw"
        type="password"
        onChange={onChange}
        minLength={8}
        data-testid="password-input"
        required
      />
      <button disabled={disable} data-testid="signup-button">
        회원가입
      </button>
    </div>
  );
};
