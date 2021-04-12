/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, useContext, useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import { ProductActionType, ProductContext } from "../state/productContext";
import { ProductAction } from "../state/constants";
import ProductBackLog from "./ProductBacklog";
import Sprint from "./Sprint";
import { Sprints } from "../types/types";
import AddSprintModal from "./AddSprintModal";

const ProductContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProductHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 8px;
`;

const ProductTitle = styled.div`
  font-weight: 700;
  font-size: 30px;
  color: white;
  margin-right: 16px;
`;

const ProductContent = styled.div`
  flex: 1;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const AddSprintButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  background-color: #4e97c2;
  border-radius: 4px;
  border: none;
  color: white;
  outline: 0;
`;

const AddSprintPlusIcon = styled.div`
  color: white;
  font-size: 22px;
  margin-right: 12px;
`;

const onDragEnd = (dispatch: Dispatch<ProductActionType>) => (result: DropResult): void => {
  // dropped nowhere
  if (!result.destination) {
    return;
  }
  const { source } = result;
  const { destination } = result;
  // did not move anywhere - can bail early
  if (source.droppableId === destination.droppableId && source.index === destination.index) {
    return;
  }

  if (result.type === "COLUMN") {
    // For now, we can't move columns
    // dispatch({
    //   type: ProductAction.REORDER_LIST_POSITION,
    //   initialPosition: source.index,
    //   finalPosition: destination.index,
    // });
    return;
  }

  dispatch({
    type: ProductAction.REORDER_ITEM_POSITION,
    source,
    destination,
    itemId: result.draggableId,
  });
};

const Product = () => {
  const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);
  const { productData, dispatch } = useContext(ProductContext);

  if (!productData) {
    return <div>loading</div>;
  }

  const onBeforeDragStart = () => {
    if (
      document.activeElement?.tagName.toUpperCase() === "TEXTAREA" &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }
  };

  const addSprint = (goal: string, startDate: Date, endDate: Date) => {
    const id = uuidv4();
    dispatch({
      type: ProductAction.CREATE_SPRINT,
      sprintId: id,
      goal,
      startDate,
      endDate,
    });
  };

  const sortFn = (data: Sprints) => (a: string, b: string) => data[b].position - data[a].position;

  const sprintIds: string[] = Object.keys(productData.sprints).sort(sortFn(productData.sprints));
  const backlogIds: string[] = Object.keys(productData.backlog);

  return (
    <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd(dispatch)}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <ProductContainer ref={provided.innerRef} {...provided.droppableProps}>
            <ProductHeader>
              <ProductTitle>{productData.product_title}</ProductTitle>
              <AddSprintButton type="button" onClick={() => setIsAddSprintModalOpen(true)}>
                <AddSprintPlusIcon>+</AddSprintPlusIcon>
                Add Sprint
              </AddSprintButton>
            </ProductHeader>
            <ProductContent>
              {backlogIds.map((backlogId) => (
                <ProductBackLog
                  key={backlogId}
                  listId={backlogId}
                  listData={productData.backlog[backlogId]}
                />
              ))}

              {sprintIds.map((sprintId) => (
                <Sprint key={sprintId} sprintId={sprintId} />
              ))}
              {provided.placeholder}
            </ProductContent>
            <AddSprintModal
              onClose={() => {
                setIsAddSprintModalOpen(false);
              }}
              onAddSprint={(goal: string, startDate: Date, endDate: Date) => {
                addSprint(goal, startDate, endDate);
                setIsAddSprintModalOpen(false);
              }}
              isOpen={isAddSprintModalOpen}
            />
          </ProductContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Product;
