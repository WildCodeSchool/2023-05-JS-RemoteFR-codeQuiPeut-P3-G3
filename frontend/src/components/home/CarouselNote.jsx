import "./CarouselNote.scss"
import { useState, useEffect } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

function StarRating() {
  const [number, setNumber] = useState(5)
  const [hoverStar, setHoverStar] = useState(undefined)
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0)

  const comments = [
    {
      id: 1,
      text: "“Cette expérience interactive est vraiment unique ! J'ai adoré pouvoir prendre des décisions qui influencent directement l'histoire. Cela m'a donné l'impression d'être réellement le héros de l'histoire, en contrôlant le destin du personnage principal.”",
      rating: 5,
    },
    {
      id: 2,
      text: "“Un jeu fascinant qui m'a accroché dès la première minute. Les choix ont des conséquences réelles, ce qui rend l'expérience encore plus immersive. Je le recommande vivement à tous les amateurs de jeux narratifs.”",
      rating: 3,
    },
    {
      id: 3,
      text: "“Une narration captivante, des personnages bien développés et un système de choix complexe font de ce jeu une expérience unique. J'ai adoré explorer différentes voies et découvrir les multiples fins possibles.”",
      rating: 4,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommentIndex((prevIndex) =>
        prevIndex === comments.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleText = () => {
    const rating = comments[currentCommentIndex].rating
    switch (rating || hoverStar) {
      case 1:
        return "1/5"
      case 2:
        return "2/5"
      case 3:
        return "3/5"
      case 4:
        return "4/5"
      case 5:
        return "5/5"
      default:
        return "0/5"
    }
  }

  const handleStarClick = (index) => {
    setNumber(index + 1)
    comments[currentCommentIndex].rating = index + 1
  }

  const threeComments = comments.slice(0, 3)

  return (
    <div className="Rating-App">
      <div className="Rating-content">
        <div className="Rating-product"></div>
        <div>
          <h1>{handleText()}</h1>
          <div className="Star">
            {Array(5)
              .fill()
              .map((_, index) =>
                comments[currentCommentIndex].rating >= index + 1 ? (
                  <AiFillStar
                    key={index}
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange", cursor: "pointer" }}
                    onClick={() => handleStarClick(index)}
                  />
                ) : (
                  <AiOutlineStar
                    key={index}
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange", cursor: "pointer" }}
                    onClick={() => handleStarClick(index)}
                  />
                )
              )}
          </div>
        </div>
        <span>{comments[currentCommentIndex].text}</span>
      </div>
      <div className="button-container">
        {threeComments.map((comment) => (
          <button
            key={comment.id}
            onClick={() => setCurrentCommentIndex(comment.id - 1)}
            className={`circle-button ${
              currentCommentIndex === comment.id - 1 ? "active" : ""
            }`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default StarRating
