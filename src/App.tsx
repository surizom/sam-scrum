import React from "react";
import styled from "styled-components";
import Product from "./components/Product";
import { ProductProvider } from "./state/productContext";

const Heading = styled.div`
  flex: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #026aa7;
`;

const Title = styled.div`
  color: #80b4d3;
  font-size: 38px;
  font-style: italic;
  font-weight: 500;
  margin-left: 8px;
`;

const LogoSquare = styled.div`
  position: relative;
  width: 32px;
  height: 32px;

  background: #80b4d3;
  border-radius: 5px;
`;

const LogoRectangle1 = styled.div`
  position: absolute;
  width: 22px;
  height: 8px;
  left: 5px;
  top: 11px;

  background: #026aa7;
  border-radius: 2px;
`;

const LogoRectangle2 = styled.div`
  position: absolute;
  width: 22px;
  height: 8px;
  left: 5px;
  top: 20px;

  background: #026aa7;
  border-radius: 2px;
`;

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const App = () => (
  <Container>
    <ProductProvider>
      <Heading>
        <LogoSquare>
          <LogoRectangle1 />
          <LogoRectangle2 />
        </LogoSquare>
        <Title>Sam</Title>
      </Heading>
      <Product />
    </ProductProvider>
  </Container>
);

export default App;
