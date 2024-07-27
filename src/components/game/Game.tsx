import React, { useEffect } from "react";
import { config, createGame } from "../../game";
import { useGameContext } from "../app/App";

const Game: React.FC = () => {
  const { setGame } = useGameContext();
  useEffect(() => {
    const game = createGame();
    setGame(game);
    return (): void => {
      game.destroy(true);
    };
  }, [setGame]);
  return <div id={config.parent} />;
};

export default Game;
