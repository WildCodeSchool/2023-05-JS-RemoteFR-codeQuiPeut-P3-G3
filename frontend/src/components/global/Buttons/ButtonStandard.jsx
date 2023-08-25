import "./ButtonStandard.scss"

function ButtonStandard({ img, onClick }) {
  return (
    <>
      <button type="button" onClick={onClick} className="btn-standard">
        <img src={img} alt="image-button" />
      </button>
    </>
  )
}

export default ButtonStandard
