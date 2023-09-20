import "./GameActions.scss"
import { useGameContext } from "../../services/contexts/GameContext"
import { useEffect, useState } from "react"
import styled from "styled-components"

function GameActions() {
  /* Recupération informations scenes au chargement */

  const { sceneContent, getScene } = useGameContext()
  const { creationTextes, creationRects, creationImg } = useGameContext()
  const { sceneLoaded, setSceneLoaded } = useGameContext()
  const { texts, rects, imgs, background } = useGameContext()
  const { setTexts, setRects, setImgs, setBackground } = useGameContext()

  useEffect(() => {
    setSceneLoaded(false)
    getScene(128, 0)
  }, [])

  useEffect(() => {
    // if (sceneContent.textbox && sceneContent.textbox.length > 0) {
    if (sceneLoaded) {
      console.log("scene loaded ! ")
      setBackground(sceneContent.background)
      setTexts(creationTextes(sceneContent.textbox))
      setRects(creationRects(sceneContent.rect))
      setImgs(creationImg(sceneContent.image))
    }
  }, [sceneLoaded])

  useEffect(() => {
    console.log("background: ", background)
  }, [background])

  return (
    <>
      <StyledBackground background={background} />
      <div className="canva-content">
        {texts} {rects} {imgs}
      </div>
    </>
  )
}

export default GameActions

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  /* Autres styles de mise en page pour votre .canva */
  background-image: ${(props) => `url("${props.background}")`};
  background-size: cover; /* Vous pouvez ajuster la taille de l'arrière-plan en fonction de vos besoins */
  background-repeat: no-repeat;
  background-position: center center;
`
