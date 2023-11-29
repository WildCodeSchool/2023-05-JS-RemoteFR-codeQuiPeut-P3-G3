import styled from "styled-components"
import axios from "axios"
import React, { createContext, useContext, useState, useRef } from "react"
import { useSearchParams, useLocation } from "react-router-dom"

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
  transform: rotate(${(props) => props.textProperties.angle}deg);
  text-align: ${(props) => props.textProperties.textAlign};
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
  transform: rotate(${(props) => props.rectProperties.angle}deg);
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
  transform: rotate(${(props) => props.imgProperties.angle}deg);
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
  const [heroSelected, setHeroSelected] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const refCanva = useRef(null)

  // const location = useLocation()

  /* ============================================================= */

  const getParamsUrl = () => {
    const storyId = params.get("story")
    const sceneId = params.get("scene")
    setSceneSettings({ storyId, sceneId })

    return { storyId, sceneId }
  }

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
  const getHero = ({ storyId }) => {
    // console.log("appel de get hero avec id ", storyId)
    axios
      .get(`http://localhost:4242/api-heroes/${storyId}`)
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

    // console.log("Actions : ", actions)

    if (nbActions > 0) {
      // console.log("boucle actions")
      for (const elem of actions) {
        // console.log(elem)
        switch (elem.type) {
          case "add":
            // console.log("go fct add")
            add(elem.target, elem.number)
            break

          case "subs":
            substract(elem.target, elem.number)
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
        gestionActions(actions)
        // console.log("appel de gestion actions : ", actions)
      }
      // Gestion des links
      if (elem.link !== "") {
        gestionLinks(elem.link)
      }
    }
  }
  /* ============================================================= */

  const creationTextes = (object) => {
    // console.log("creation de textes")
    const textComponents = []
    // console.log("object: ", sceneContent)
    const { canvaWidth } = sceneContent
    const { gameWidth } = getSizeCanva()

    const ratio = gameWidth / canvaWidth
    // console.log(ratio)

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const elem = object[key]
        const actions = elem.Actions || []

        // const scaleX = elem.obj.scaleX || 1
        // const scaleY = elem.obj.scaleY || 1

        const textProperties = {
          fontFamily: elem.obj.fontFamily,
          fontSize: elem.obj.fontSize * ratio * elem.obj.scaleX, // Appliquer le ratio et la scaleX
          fill: elem.obj.fill,
          left: elem.pos.percX, // Appliquer le ratio à la position horizontale
          top: elem.pos.percY, // Appliquer le ratio à la position verticale
          height: elem.obj.height * elem.obj.scaleY * ratio, // Appliquer scaleY et le ratio à la hauteur
          width: elem.obj.width * elem.obj.scaleX * ratio,
          angle: elem.obj.angle, // Appliquer scaleX et le ratio à la largeur
          cursor: actions > 0 || elem.link !== "" ? "pointer" : "default",
          textAlign: elem.obj.textAlign,
        }

        // const textScaleTransform = `scale(${scaleX}, ${scaleY})`

        // const textStyles = {
        //   transform: textScaleTransform,
        //   transformOrigin: "top left",
        //   fontSize: elem.obj.fontSize,
        // }

        textComponents.push(
          <StyledText
            key={key}
            textProperties={textProperties}
            onClick={() => handleClick(elem)}
          >
            <div>{elem.obj.text}</div>
          </StyledText>
          // style={textStyles}
        )
      }
    }

    return textComponents
  }

  /* ============================================================= */

  const creationRects = (object) => {
    const rectComponents = []
    const { canvaWidth } = sceneContent
    const { gameWidth } = getSizeCanva()

    const ratio = gameWidth / canvaWidth

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const elem = object[key]
        // console.log(elem)
        const actions = elem.Actions || []

        const rectProperties = {
          strokeWidth: elem.obj.strokeWidth,
          strokeColor: elem.obj.stroke,
          borderRadius: elem.obj.rx,
          fill: elem.obj.fill,
          left: elem.pos.percX,
          top: elem.pos.percY,
          height: elem.obj.height * elem.obj.scaleY * ratio,
          width: elem.obj.width * elem.obj.scaleX * ratio,
          angle: elem.obj.angle,
          cursor: actions > 0 || elem.link !== "" ? "pointer" : "default",
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

    const { canvaWidth } = sceneContent
    const { gameWidth } = getSizeCanva()

    const ratio = gameWidth / canvaWidth

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const elem = object[key]
        const actions = elem.Actions || []

        const imgProperties = {
          left: elem.pos.percX,
          top: elem.pos.percY,
          height: elem.obj.height * elem.obj.scaleY * ratio,
          width: elem.obj.width * elem.obj.scaleX * ratio,
          src: elem.obj.src,
          angle: elem.obj.angle,
          cursor: actions > 0 || elem.link !== "" ? "pointer" : "default",
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
    switch (type) {
      case "life":
        setHeroSelected((prev) => ({
          ...prev,
          heal: parseInt(prev.heal, 10) + parseInt(number, 10),
        }))
        break

      case "money":
        setHeroSelected((prev) => ({
          ...prev,
          money: parseInt(prev.money, 10) + parseInt(number, 10),
        }))
        break

      default:
        // Gérez le cas par défaut ici si nécessaire
        break
    }
  }

  const substract = (type, number) => {
    switch (type) {
      case "life":
        setHeroSelected((prev) => ({
          ...prev,
          heal: parseInt(prev.heal, 10) - parseInt(number, 10),
        }))
        break

      case "money":
        setHeroSelected((prev) => ({
          ...prev,
          money: parseInt(prev.money, 10) - parseInt(number, 10),
        }))
        break

      default:
        // Gérez le cas par défaut ici si nécessaire
        break
    }
  }

  const getSizeCanva = () => {
    const gameWidth = refCanva.current.clientWidth
    const gameHeight = refCanva.current.clientHeight
    return { gameWidth, gameHeight }
  }

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
        getParamsUrl,
        setSearchParams,
        searchParams,
        setSceneSettings,
        hero,
        setHero,
        sceneSettings,
        heroSelected,
        setHeroSelected,
        refCanva,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
