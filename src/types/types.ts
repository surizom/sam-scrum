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
export type Sprint = {
  goals: string;
  data: SprintData;
};
export type SprintData = {
  [id: string]: Column;
};
export type BoardData = {
  backlog: Column;
  sprints: Sprint[];
};
