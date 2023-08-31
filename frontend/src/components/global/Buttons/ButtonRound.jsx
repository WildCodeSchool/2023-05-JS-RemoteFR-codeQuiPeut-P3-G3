import "./ButtonRound.scss"

function ButtonRound({ img, onClick, active }) {
  return (
    <>
      <button
        type="button"
        className={`button-round ${active ? "selected" : "unselect"}`}
        onClick={onClick}
      >
        <img src={img} alt={`img ${img}`} />
      </button>
    </>
  )
}

export default ButtonRound
