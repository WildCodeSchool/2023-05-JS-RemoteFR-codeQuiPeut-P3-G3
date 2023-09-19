import "./GameActions.scss"
import { useGameContext } from "../../services/contexts/GameContext"
import { useEffect, useState } from "react"

function GameActions() {
  /* Recupération informations scenes au chargement */

  const { sceneContent, getScene } = useGameContext()
  const { creationTextes, creationRects } = useGameContext()
  const { sceneLoaded, setSceneLoaded } = useGameContext()
  const [texts, setTexts] = useState([])
  const [rects, setRects] = useState([])

  useEffect(() => {
    setSceneLoaded(false)
    getScene(126, 0)
  }, [])

  useEffect(() => {
    // if (sceneContent.textbox && sceneContent.textbox.length > 0) {
    if (sceneLoaded) {
      setTexts(creationTextes(sceneContent.textbox))
      setRects(creationRects(sceneContent.rect))
    }

    // if (sceneContent.rect.length > 0) {
    //   creationRects(sceneContent.rect)
    // }

    // if (sceneContent.img.length > 0) {
    //   creationImg(sceneContent.img)
    // }
  }, [sceneLoaded])

  return (
    <>
      {texts} {rects}
    </>
  )
}

export default GameActions
