import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Section, MainArticle, Button } from "../style/publicStyle";

export const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/todo");
    }
  }, [navigate]);
  return (
    <Section>
      <h1>Wanted Internship TodoList</h1>
      <MainArticle>
        <Link to="/signup">
          <Button>회원가입</Button>
        </Link>
        <Link to="/signin">
          <Button>로그인</Button>
        </Link>
      </MainArticle>
    </Section>
  );
};
