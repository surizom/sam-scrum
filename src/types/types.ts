export type Card = {
  position: number;
  card_content: string;
};
export type Cards = {
  [id: string]: Card;
};
export type Column = {
  list_title: string;
  position: number;
  cards: Cards;
};
export type Columns = {
  [id: string]: Column;
};
export type Sprint = {
  data: Columns;
  goal: string;
  startDate: Date;
  endDate: Date;
};
export type BoardData = {
  sprints: {
    [id: string]: Sprint;
  };
  backlog: Columns;
};
