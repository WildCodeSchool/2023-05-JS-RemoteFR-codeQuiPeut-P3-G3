import Barbare from "../Components/assets/img/heroes/archer.png"
import Knight from "../Components/assets/img/heroes/knight.png"
import "./GameHeaderHudPortrait.scss"
const GameHeaderHudPortrait = ({ hero }) => {
  return (
    <div className="gameHeaderHudPortrait">
      <img
        src={hero?.class === "barbare" ? Barbare : Knight}
        className="portrait"
        draggable={false}
      />
    </div>
  )
}

export default GameHeaderHudPortrait
