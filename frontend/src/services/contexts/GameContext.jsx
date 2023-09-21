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
  cursor: ${(props) => props.textProperties.cursor};
  z-index: 1;
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
  cursor: ${(props) => props.rectProperties.cursor};
  z-index: 1;
`

const StyledImg = styled.img`
  position: absolute;
  left: ${(props) => props.imgProperties.left}px;
  top: ${(props) => props.imgProperties.top}px;
  height: ${(props) => props.imgProperties.height}px;
  width: ${(props) => props.imgProperties.width}px;
  content: url("${(props) => props.imgProperties.src}");
  cursor: ${(props) => props.imgProperties.cursor};
  z-index: 1;
`

export const GameContextProvider = ({ children }) => {
  const [actualScene, setActualScene] = useState({
    storyId: 0,
    sceneId: 0,
  })

  const [sceneContent, setSceneContent] = useState({})
  const [sceneLoaded, setSceneLoaded] = useState(false)

  const [texts, setTexts] = useState([])
  const [rects, setRects] = useState([])
  const [imgs, setImgs] = useState([])
  const [background, setBackground] = useState("")

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

  const gestionActions = (actions) => {
    const nbActions = actions.length

    if (nbActions > 0) {
      for (const elem of actions) {
        switch (elem.type) {
          case "add":
            add(actions.target, actions.number)
            break

          case "subs":
            // Logique pour l'action "subs"
            break

          case "shop":
            // Logique pour l'action "shop"
            break

          case "fight":
            // Logique pour l'action "fight"
            break

          default:
            // Logique pour d'autres types d'action (si nécessaire)
            break
        }
      }
    }
  }

  const creationTextes = (object) => {
    // console.log("creation de textes")
    const textComponents = []

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const elem = object[key]

        const textProperties = {
          fontFamily: elem.obj.fontFamily,
          fontSize: elem.obj.fontSize,
          fill: elem.obj.fill,
          left: elem.obj.left,
          top: elem.obj.top,
          height: elem.obj.height * elem.obj.scaleY,
          width: elem.obj.width * elem.obj.scaleX,
          cursor: elem.Actions.length > 0 && "pointer",
        }

        gestionActions(elem.Actions)

        textComponents.push(
          <StyledText key={key} textProperties={textProperties}>
            {elem.obj.text}
          </StyledText>
        )
      }
    }

    return textComponents
  }

  const creationRects = (object) => {
    const rectComponents = []

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const elem = object[key]
        // console.log("elements : ", elem)

        const rectProperties = {
          strokeWidth: elem.obj.strokeWidth,
          strokeColor: elem.obj.stroke,
          borderRadius: elem.obj.rx,
          fill: elem.obj.fill,
          left: elem.obj.left,
          top: elem.obj.top,
          height: elem.obj.height * elem.obj.scaleY,
          width: elem.obj.width * elem.obj.scaleX,
          cursor: elem.Actions.length > 0 && "pointer",
        }
        // console.log("propriétés rectangle : ", rectProperties)

        gestionActions(elem.Actions)

        rectComponents.push(
          <StyledRect
            key={key}
            rectProperties={rectProperties}
            onClick={() => gestionActions(elem.Actions)}
          ></StyledRect>
        )
      }
    }

    return rectComponents
  }

  const creationImg = (object) => {
    const imgComponents = []

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const elem = object[key]

        const imgProperties = {
          left: elem.obj.left,
          top: elem.obj.top,
          height: elem.obj.height * elem.obj.scaleY,
          width: elem.obj.width * elem.obj.scaleX,
          src: elem.obj.src,
          cursor: elem.Actions.length > 0 && "pointer",
        }

        imgComponents.push(
          <StyledImg key={key} imgProperties={imgProperties}></StyledImg>
        )
      }
    }

    return imgComponents
  }

  const add = (type, number) => {
    // console.log("execution add : ", type, number)
  }

  // const substract = (type, number) => {}

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
        setTexts,
        setRects,
        setImgs,
        setBackground,
        texts,
        rects,
        imgs,
        background,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
