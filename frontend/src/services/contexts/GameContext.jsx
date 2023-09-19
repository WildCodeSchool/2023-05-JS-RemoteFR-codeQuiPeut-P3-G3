import styled from "styled-components"
import axios from "axios"
import React, { createContext, useContext, useState } from "react"

const GameContext = createContext()

export const useGameContext = () => {
  return useContext(GameContext)
}

// Définissez le composant StyledText en dehors de la fonction
const StyledText = styled.div`
  position: absolute;
  font-family: ${(props) => props.textProperties.fontFamily};
  font-size: ${(props) => props.textProperties.fontSize}px;
  color: ${(props) => props.textProperties.fill};
  left: ${(props) => props.textProperties.left}px;
  top: ${(props) => props.textProperties.top}px;
  height: ${(props) => props.textProperties.height}px;
  width: ${(props) => props.textProperties.width}px;
`

const StyledRect = styled.div`
  position: absolute;

  border-color: ${(props) => props.rectProperties.strokeColor || "none"};
  border-width: ${(props) => props.rectProperties.strokeWidth}px;
  border-radius: ${(props) => props.rectProperties.borderRadius}px;
  background-color: ${(props) => props.rectProperties.fill || "none"};
  left: ${(props) => props.rectProperties.left}px;
  top: ${(props) => props.rectProperties.top}px;
  height: ${(props) => props.rectProperties.height}px;
  width: ${(props) => props.rectProperties.width}px;
`

export const GameContextProvider = ({ children }) => {
  const [actualScene, setActualScene] = useState({
    storyId: 0,
    sceneId: 0,
  })

  const [sceneContent, setSceneContent] = useState({})
  const [sceneLoaded, setSceneLoaded] = useState(false)

  const getScene = (idStory, idScene) => {
    console.info("IMPORT STORY ", idStory, " SCENE ", idScene)

    axios
      .get(`http://localhost:4242/api-stories/${idStory}/${idScene}`)
      .then((response) => {
        console.info("Get scene => Réponse serveur :", response.data)
        setActualScene((prevEditStatus) => ({
          ...prevEditStatus,
          nbreScene: response.data.nbScenes,
          sceneId: response.data.id,
        }))
        // console.log(response.data.scene)
        setSceneContent(response.data.scene)
        setSceneLoaded(true)
      })
      .catch((error) => {
        // Gérer les erreurs de la requête
        console.error("Erreur de la requête :", error)
      })
  }

  const creationTextes = () => {
    const textComponents = []

    for (const key in sceneContent.textbox) {
      // eslint-disable-next-line no-prototype-builtins
      if (sceneContent.textbox.hasOwnProperty(key)) {
        const elem = sceneContent.textbox[key]

        const textProperties = {
          fontFamily: elem.fontFamily,
          fontSize: elem.fontSize,
          fill: elem.fill,
          left: elem.left,
          top: elem.top,
          height: elem.height,
          width: elem.width,
        }

        textComponents.push(
          <StyledText key={key} textProperties={textProperties}>
            {elem.text}
          </StyledText>
        )
      }
    }

    return textComponents
  }

  const creationRects = () => {
    const textComponents = []

    for (const key in sceneContent.rect) {
      // eslint-disable-next-line no-prototype-builtins
      if (sceneContent.rect.hasOwnProperty(key)) {
        const elem = sceneContent.rect[key]

        const rectProperties = {
          strokeWidth: elem.strokeWidth,
          strokeColor: elem.stroke,
          borderRadius: elem.rx,
          fill: elem.fill,
          left: elem.left,
          top: elem.top,
          height: elem.height,
          width: elem.width,
        }

        textComponents.push(
          <StyledRect key={key} rectProperties={rectProperties}>
            {elem.text}
          </StyledRect>
        )
      }
    }

    return textComponents
  }

  const creationImg = () => {
    // ... (votre code pour la création d'images)
  }

  return (
    <GameContext.Provider
      value={{
        getScene,
        sceneContent,
        actualScene,
        creationTextes,
        creationRects,
        creationImg,
        setSceneLoaded,
        sceneLoaded,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
