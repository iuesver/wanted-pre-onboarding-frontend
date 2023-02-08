import styled from "styled-components";

export const Section = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

export const MainArticle = styled.article`
  width: 24rem;
  min-height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

export const Article = styled.article`
  width: 24rem;
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
`;

export const Button = styled.button`
  width: 5rem;
  height: 2.5rem;
  margin: 0 1rem;
  background-color: white;
  border: 0.5px solid black;
  border-radius: 1rem;
`;

export const Input = styled.input`
  width: 16rem;
  height: 2rem;
`;
