import Purse from "../Components/assets/img/ui/hud/purse.svg"
import "./GameHeaderHudGold.scss"
const GameHeaderHudGold = ({ hero }) => {
  return (
    <div className="gameHeaderHudGold">
      <img src={Purse} draggable={false} />
      <p>{hero?.money}</p>
    </div>
  )
}

export default GameHeaderHudGold
