import "./Game.scss"

import GameActions from "../components/Game/GameActions"
import SelectHeroes from "../components/Game/SelectHeroes"
import GameHeaderHud from "../components/Game/GameHeaderHud/GameHeaderHud"
import imgHome from "../assets/user_ui/home.png"
import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { useGameContext } from "../services/contexts/GameContext"

function Game() {
  const [initGame, setInitGame] = useState(true)
  const refBg = useRef(null)
  const { refCanva } = useGameContext()

  // const nav = useNavigation()
  return (
    <>
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
          <div className="canva" ref={refCanva}>
            {initGame ? (
              <SelectHeroes setInit={setInitGame} />
            ) : (
              <GameActions refBg={refBg} refCanva={refCanva} />
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Game
