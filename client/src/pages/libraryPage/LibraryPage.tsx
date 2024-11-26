import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { boardGameListType } from "../../assets/lib/definition";
import CardGame from "../../components/cardGame/CardGame";
import FilterType from "../../components/filterType/FilterType";
import SmallHeader from "../../components/smallHeader/SmallHeader";
import style from "./libraryPage.module.css";

// page library pour lister les jeux et les filtrer

export default function libraryPage() {
  const fullGame: boardGameListType[] = useLoaderData() as boardGameListType[];
  const [filterType, setFilterType] = useState("");
  const categories: string[] = [...new Set(fullGame.map((f) => f.type))]
    .join(",")
    .split(",")
    .splice(1);
  const onlyOneCategories: string[] = [...new Set(categories.map((s) => s))];

  // ajouter un nouveau favoris au click
  const [favorite, setFavorite] = useState<string[]>([]);
  const handleClickFavorite = (id: string) => {
    const newFavorite = [...favorite, id];
    setFavorite(newFavorite);
    localStorage.setItem("favorites", JSON.stringify(newFavorite));
  };

  return (
    <>
      <header>
        <SmallHeader />
      </header>
      <section className={style.backgroundPage}>
        <div>
          <FilterType
            setFilterType={setFilterType}
            category={onlyOneCategories}
          />
        </div>
        <div className={style.cards}>
          {filterType
            ? fullGame
                .filter((f) => f.type?.includes(filterType))
                .map((f) => (
                  <article key={f.gameId} className={style.card}>
                    <CardGame
                      key={f.gameId}
                      gameId={f.gameId}
                      name={f.name}
                      rating={f.averageRating}
                      image={f.image}
                      handleClickFavorite={handleClickFavorite}
                    />
                  </article>
                ))
            : fullGame.map((f) => (
                <article key={f.gameId} className={style.card}>
                  <CardGame
                    key={f.gameId}
                    gameId={f.gameId}
                    name={f.name}
                    rating={f.averageRating}
                    image={f.image}
                    handleClickFavorite={handleClickFavorite}
                  />
                </article>
              ))}
        </div>
      </section>
    </>
  );
}
