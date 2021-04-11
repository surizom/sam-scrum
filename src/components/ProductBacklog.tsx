import React from "react";
import styled from "styled-components";
import { Column } from "../types/types";
import List from "./List";

const ProductBacklogWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px;
`;

type ProductBackLogProps = {
  listId: string;
  listData: Column;
};

const ProductBackLog = ({ listId, listData }: ProductBackLogProps) => (
  <ProductBacklogWrapper>
    <List listId={listId} listData={listData} />
  </ProductBacklogWrapper>
);
export default ProductBackLog;
