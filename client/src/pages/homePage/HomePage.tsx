import { useState } from "react";

import FilterPanel from "../../components/filterPanel/FilterPanel";
import dataGame from "../../assets/data/gameDate.json";
import style from "./homePage.module.css";
import CardGame from "../../components/cardGame/CardGame";

export default function HomePage() {
  const [filterGame, setFilterGame] = useState("");

  const fullgame = dataGame;

  const userFilterPlayers = fullgame.filter(
    (f) => f.minPlayers >= Number.parseInt(filterGame),
  );
  const userFilterTime = fullgame.filter(
    (f) => f.playingTime === Number.parseInt(filterGame),
  );
  const userFilterRating = fullgame.filter(
    (f) => Math.trunc(f.averageRating) === Number.parseInt(filterGame),
  );
  const userFilterType = fullgame.filter((f) =>
    f.mechanics?.includes(filterGame),
  );
  const userRating =
    Number.parseInt(filterGame) > 5 && Number.parseInt(filterGame) <= 10;
  const userPlayers = Number.parseFloat(filterGame) < 5;
  const userTime = Number.parseInt(filterGame) > 20;
  const userType =
    filterGame === "Dice Rolling" ||
    filterGame === "Automatic Resource Growth" ||
    filterGame === "Cooperative Game" ||
    filterGame === "Multi-Use Cards";

  return (
    <section className={style.backgroundPage}>
      <FilterPanel filterGame={filterGame} setFilterGame={setFilterGame} />
      <div className={style.myDiv}>
        {userPlayers &&
          userFilterPlayers.map((g) => <CardGame key={g.gameId} card={g} />)}
        {userTime &&
          userFilterTime.map((g) => <CardGame key={g.gameId} card={g} />)}
        {userRating &&
          userFilterRating.map((g) => <CardGame key={g.gameId} card={g} />)}
        {userType &&
          userFilterType.map((g) => <CardGame key={g.gameId} card={g} />)}
        {filterGame === "" &&
          fullgame.map((g) => <CardGame key={g.gameId} card={g} />)}
      </div>
    </section>
  );
}
