import "./menu.css";

import React, { useState } from "react";
import { useGameContext } from "../app/App";

const Menu: React.FC = () => {
  const { game } = useGameContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_ready, setReady] = useState(false);

  game?.events.on("ready", () => setReady(true));

  return (
    <div className="bit-container menu">
      <div>Menu {game?.scene.getScene("GameScene")?.scene.key}</div>
    </div>
  );
};

export default Menu;
