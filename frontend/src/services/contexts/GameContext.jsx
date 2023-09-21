import styled from "styled-components"
import axios from "axios"
import React, { createContext, useContext, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"

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
  left: ${(props) => props.textProperties.left}%;
  top: ${(props) => props.textProperties.top}%;
  height: ${(props) => props.textProperties.height}px;
  width: ${(props) => props.textProperties.width}px;
  cursor: ${(props) => props.textProperties.cursor};
  z-index: 3;
`

const StyledRect = styled.div`
  position: absolute;

  border-color: ${(props) => props.rectProperties.strokeColor || "none"};
  border-width: ${(props) => props.rectProperties.strokeWidth}px;
  border-radius: ${(props) => props.rectProperties.borderRadius}px;
  background-color: ${(props) => props.rectProperties.fill || "none"};
  left: ${(props) => props.rectProperties.left}%;
  top: ${(props) => props.rectProperties.top}%;
  height: ${(props) => props.rectProperties.height}px;
  width: ${(props) => props.rectProperties.width}px;
  cursor: ${(props) => props.rectProperties.cursor};
  z-index: 2;
`

const StyledImg = styled.img`
  position: absolute;
  left: ${(props) => props.imgProperties.left}%;
  top: ${(props) => props.imgProperties.top}%;
  height: ${(props) => props.imgProperties.height}px;
  width: ${(props) => props.imgProperties.width}px;
  content: url("${(props) => props.imgProperties.src}");
  cursor: ${(props) => props.imgProperties.cursor};
  z-index: 1;
`
/* ============================================================= */

export const GameContextProvider = ({ children }) => {
  const [actualScene, setActualScene] = useState({
    storyId: 0,
    sceneId: 0,
  })

  const [sceneContent, setSceneContent] = useState({})
  const [sceneLoaded, setSceneLoaded] = useState(false)
  const [sceneSettings, setSceneSettings] = useState({
    sceneId: "",
    storyId: "",
  })

  const [texts, setTexts] = useState([])
  const [rects, setRects] = useState([])
  const [imgs, setImgs] = useState([])
  const [background, setBackground] = useState("")
  const [changeScene, setChangeScene] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [hero, setHero] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  /* ============================================================= */

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

  // Test de la requete hero
  const getHero = (idStory) => {
    // console.log("appel de get hero avec id ", idStory)
    axios
      .get(`http://localhost:4242/api-heroes/${idStory}`)
      .then((response) => {
        // console.log("réponse des heroes : ", response.data)
        setHero(response.data)
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du héros :", error)
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

  const gestionLinks = (link) => {
    setChangeScene(true)
    setSearchParams({ story: sceneSettings.storyId, scene: link })
  }

  const handleClick = (elem) => {
    if (elem && elem.Actions) {
      // Vérifier si elem et elem.Actions sont définis
      // Gestion des actions
      const actions = elem.Actions

      if (actions.length > 0) {
        gestionActions(elem.Actions)
      }
      // Gestion des links
      if (elem.link !== "") {
        gestionLinks(elem.link)
      }
    }
  }
  /* ============================================================= */

  const creationTextes = (object) => {
    console.info("creation de textes")
    const textComponents = []

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const elem = object[key]
        const actions = elem.Actions || []

        const scaleX = elem.obj.scaleX || 1
        const scaleY = elem.obj.scaleY || 1

        const textProperties = {
          fontFamily: elem.obj.fontFamily,
          fontSize: elem.obj.fontSize,
          fill: elem.obj.fill,
          left: elem.pos.percX,
          top: elem.pos.percY,
          height: elem.obj.height * elem.obj.scaleX,
          width: elem.obj.width * elem.obj.scaleY,
          cursor: actions > 0 ? "pointer" : "default",
        }

        const textScaleTransform = `scale(${scaleX}, ${scaleY})`

        const textStyles = {
          transform: textScaleTransform,
          transformOrigin: "top left",
          fontSize: elem.obj.fontSize,
        }

        textComponents.push(
          <StyledText
            key={key}
            textProperties={textProperties}
            onClick={() => handleClick(elem)}
          >
            <div style={textStyles}>{elem.obj.text}</div>
          </StyledText>
        )
      }
    }

    return textComponents
  }

  /* ============================================================= */

  const creationRects = (object) => {
    const rectComponents = []

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const elem = object[key]
        const actions = elem.Actions || []

        const rectProperties = {
          strokeWidth: elem.obj.strokeWidth,
          strokeColor: elem.obj.stroke,
          borderRadius: elem.obj.rx,
          fill: elem.obj.fill,
          left: elem.pos.percX,
          top: elem.pos.percY,
          height: elem.obj.height * elem.obj.scaleY,
          width: elem.obj.width * elem.obj.scaleX,
          cursor: actions > 0 ? "pointer" : "default",
        }

        rectComponents.push(
          <StyledRect
            key={key}
            rectProperties={rectProperties}
            onClick={() => handleClick(elem)}
          ></StyledRect>
        )
      }
    }

    return rectComponents
  }

  /* ============================================================= */

  const creationImg = (object) => {
    const imgComponents = []

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const elem = object[key]
        const actions = elem.Actions || []

        const imgProperties = {
          left: elem.pos.percX,
          top: elem.pos.percY,
          height: elem.obj.height * elem.obj.scaleY,
          width: elem.obj.width * elem.obj.scaleX,
          src: elem.obj.src,
          cursor: actions > 0 ? "pointer" : "default",
        }

        imgComponents.push(
          <StyledImg
            key={key}
            imgProperties={imgProperties}
            onClick={() => handleClick(elem)}
          ></StyledImg>
        )
      }
    }

    return imgComponents
  }

  /* ============================================================= */

  const add = (type, number) => {
    console.info("execution add : ", type, number)
  }

  /* ============================================================= */

  const getSceneUrl = () => {
    const params = new URLSearchParams(location.search)
    const storyId = params.get("story")
    const sceneId = params.get("scene")

    return { storyId, sceneId }
  }

  // const substract = (type, number) => {
  //   console.info("substract")
  // }

  return (
    <GameContext.Provider
      value={{
        getScene,
        getHero,
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
        setChangeScene,
        changeScene,
        getSceneUrl,
        setSearchParams,
        searchParams,
        setSceneSettings,
        hero,
        setHero,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
