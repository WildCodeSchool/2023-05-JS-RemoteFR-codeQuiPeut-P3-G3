import "./Game.scss"
import { GameContextProvider } from "../services/contexts/GameContext"
import GameActions from "../components/Game/GameActions"
import SelectHeroes from "../components/Game/SelectHeroes"
import GameHeaderHud from "../components/Game/GameHeaderHud/GameHeaderHud"
import imgHome from "../assets/user_ui/home.png"
import { useState, useRef } from "react"
import { Link } from "react-router-dom"

function Game() {
  const [initGame, setInitGame] = useState(true)
  const refBg = useRef(null)
  // const nav = useNavigation()
  return (
    <>
      <GameContextProvider>
        <div className="gameBackground" ref={refBg}></div>
        <div className="contentGame">
          <header className="game__header">
            <div className="content__left">
              <div className="Hud">{!initGame && <GameHeaderHud />}</div>
            </div>
            <div className="content__right">
              <div className="Home">
                <Link to="/">
                  <img src={imgHome} alt="imgHome" />
                </Link>
              </div>
            </div>
          </header>
          <section className="game__content">
            <div className="canva">
              {initGame ? (
                <SelectHeroes setInit={setInitGame} />
              ) : (
                <GameActions refBg={refBg} />
              )}
            </div>
          </section>
        </div>
      </GameContextProvider>
    </>
  )
}

export default Game
