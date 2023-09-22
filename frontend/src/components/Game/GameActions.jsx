import "./GameActions.scss"
import { useGameContext } from "../../services/contexts/GameContext"
import { useEffect } from "react"
import styled from "styled-components"

function GameActions({ refBg }) {
  /* Recupération informations scenes au chargement */

  const { sceneContent, getScene } = useGameContext()
  const { creationTextes, creationRects, creationImg } = useGameContext()
  const { sceneLoaded, setSceneLoaded } = useGameContext()
  const { texts, rects, imgs, background } = useGameContext()
  const { setTexts, setRects, setImgs, setBackground } = useGameContext()
  const { changeScene, setChangeScene, setSceneSettings } = useGameContext()
  const { getParamsUrl } = useGameContext()

  /* Initialisation */
  useEffect(() => {
    // console.log("Page game Actions")
    setSceneLoaded(false)
    // const { storyId, sceneId } = getSceneUrl()
    const { storyId, sceneId } = getParamsUrl()
    setSceneSettings({ storyId, sceneId })
    getScene(storyId, sceneId)
  }, [])

  /* Detection changement de scene */
  useEffect(() => {
    setSceneLoaded(false)
    const loadScene = async () => {
      if (changeScene) {
        const { storyId, sceneId } = getParamsUrl()
        setSceneSettings({ storyId, sceneId })

        // Call getScene and wait for the response
        try {
          const response = await getScene(storyId, sceneId)

          console.info(response)
          setSceneLoaded(true)
          setChangeScene(false)
        } catch (error) {
          // Handle any errors that occur during getScene
          console.error("Error fetching scene:", error)
        }
      }
    }

    loadScene()
  }, [changeScene])

  useEffect(() => {
    // if (sceneContent.textbox && sceneContent.textbox.length > 0) {
    if (sceneLoaded) {
      // console.log("scene loaded ! ")
      setBackground(sceneContent.background)
      refBg.current.style.backgroundImage = `url(${sceneContent.background})`
      setTexts(creationTextes(sceneContent.textbox))
      setRects(creationRects(sceneContent.rect))
      setImgs(creationImg(sceneContent.image))
    }
  }, [sceneLoaded])

  useEffect(() => {
    // console.log("background: ", background)
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
  border-radius: 20px;
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
