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
  position: number;
  goal: string;
  startDate: Date;
  endDate: Date;
  isOpen: boolean;
};
export type Sprints = {
  [id: string]: Sprint;
};
export type ProjectData = {
  project_title: string;
  sprints: Sprints;
  backlog: Columns;
};
