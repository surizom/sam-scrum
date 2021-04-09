export type Item = {
  position: number;
  item_content: string;
};
export type Items = {
  [id: string]: Item;
};
export type Column = {
  list_title: string;
  position: number;
  items: Items;
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
export type ProjectData = {
  sprints: {
    [id: string]: Sprint;
  };
  backlog: Columns;
};
