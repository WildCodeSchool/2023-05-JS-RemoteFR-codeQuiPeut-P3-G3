import "./Game.scss"
import { GameContextProvider } from "../services/contexts/GameContext"
import GameActions from "../components/Game/GameActions"
import SelectHeroes from "../components/Game/SelectHeroes"
import GameHeaderHud from "../components/Game/GameHeaderHud/GameHeaderHud"
import { useState } from "react"

function Game() {
  const [initGame, setInitGame] = useState(true)
  return (
    <>
      <GameContextProvider>
        <div className="gameBackground"></div>
        <div className="contentGame">
          <header className="game__header">
            <div className="content__left">
              <GameHeaderHud />
            </div>
            <div className="content__right"></div>
          </header>
          <section className="game__content">
            <div className="canva">
              {initGame ? (
                <SelectHeroes setInit={setInitGame} />
              ) : (
                <GameActions />
              )}
            </div>
          </section>
        </div>
      </GameContextProvider>
    </>
  )
}

export default Game
