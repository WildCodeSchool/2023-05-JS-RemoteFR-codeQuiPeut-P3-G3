import GameHeaderHudGold from "./GameHeaderHudGold"
import GameHeaderHudHealth from "./GameHeaderHudHealth"
// import GameHeaderHudInventory from "./GameHeaderHudInventory"
import GameHeaderHudPortrait from "./GameHeaderHudPortrait"
import "./GameHeaderHud.scss"
import { useGameContext } from "../../../services/contexts/GameContext"
const GameHeaderHud = () => {
  const { heroSelected } = useGameContext()

  // console.log("chargement Hud et content : ", heroSelected)

  return (
    <div className="gameHeaderHud">
      <div className="mainHud">
        <GameHeaderHudPortrait />
        <div className="stats">
          <GameHeaderHudHealth hero={heroSelected} />
          <GameHeaderHudGold hero={heroSelected} />
        </div>
      </div>
      {/* <GameHeaderHudInventory hero={heroSelected} /> */}
    </div>
  )
}

export default GameHeaderHud
