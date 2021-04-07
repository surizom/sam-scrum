import React from "react";
import styled from "styled-components";
import Board from "./components/Board";
import { ProjectProvider } from "./state/projectContext";

const LogoSquare = styled.div`
  position: relative;
  width: 32px;
  height: 32px;

  background: #80b4d3;
  border-radius: 5px;
  margin-right: 4px;
`;
const LogoRect1 = styled.div`
  position: absolute;
  width: 22px;
  height: 8px;
  left: 5px;
  top: 11px;

  background: #026aa7;
  border-radius: 2px;
`;
const LogoRect2 = styled.div`
  position: absolute;
  width: 22px;
  height: 8px;
  left: 5px;
  top: 20px;

  background: #026aa7;
  border-radius: 2px;
`;

const Heading = styled.div`
  background-color: #026aa7;
  padding: 8px;
  height: 50px;
  color: #80b4d3;
  text-align: center;
  font-style: italic;
  font-weight: 500;
  font-size: 38px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const App = () => (
  <Container>
    <ProjectProvider>
      <Heading>
        <LogoSquare>
          <LogoRect1 />
          <LogoRect2 />
        </LogoSquare>
        <span>Sam</span>
      </Heading>
      <Board />
    </ProjectProvider>
  </Container>
);

export default App;
