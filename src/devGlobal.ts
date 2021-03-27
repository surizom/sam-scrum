import { boardDataSubject } from "./state/boardData";
import { BoardData } from "./types/types";

type DevGlobal = {
  DEV_GLOBAL: {
    boardData?: BoardData;
  };
};

if (process.env.NODE_ENV === "development") {
  const customGlobal: NodeJS.Global & DevGlobal = { ...global, DEV_GLOBAL: {} };

  boardDataSubject.subscribe((boardData: BoardData) => {
    customGlobal.DEV_GLOBAL.boardData = boardData;
  });
}
