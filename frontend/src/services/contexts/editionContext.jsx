/* eslint-disable no-restricted-syntax */
import { createContext, useContext, useState } from "react"
import { fabric } from "fabric"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import imgDelete from "../../assets/text_ui/minus.png"
import { useSearchParams } from "react-router-dom"
import Cookies from "js-cookie"

const authToken = Cookies.get("authToken")

const config = {
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
} // Utilisation directe de l'objet headers dans la configuration axios

const EditionContext = createContext()

/* DEFINITION DU CANVAS */
export const useEditionContext = () => {
  return useContext(EditionContext)
}

/* VARIABLES GLOBALES */
export const EditionContextProvider = ({ children }) => {
  /* Liste de tous les objets scene */
  const [objects, setObjects] = useState({
    textbox: {},
    image: {},
    rect: {},
  })

  /* Propriétés d'un objet selectionné */
  const [objectSelected, setObjectSelected] = useState({
    selected: false,
    type: "",
    id: "",
    properties: {
      Actions: [],
    },
    link: "",
  })

  /* ================ STATES UPDATES  ==================== */

  /* =================== CANVA =========================== */
  const [canvas, setCanvas] = useState("")

  /* ============== STATES PROPERTIES ==================== */

  // TEXTS
  const [selectedColor, setSelectedColor] = useState("#FFFFFF")
  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")
  const [selectedSize, setSelectedSize] = useState(16)
  const [selectedAlignment, setAlignment] = useState("text-align: center")

  // RECT
  const [selectedSizeBorder, setSelectedSizeBorder] = useState(10)
  const [selectedSizeRadius, setSelectedSizeRadius] = useState(0)
  const [selectedColorBorder, setSelectedColorBorder] = useState("#FFFFFF")
  const [selectedColorBg, setSelectedColorBg] = useState("#FFFFFF")

  // BACKGROUND & IMAGES
  const [backgroundPath, setBackgroundPath] = useState(null)
  const [selectedPath, setSelectedPath] = useState("")
  const [imgPath, setImgPath] = useState("")

  // SELECTIONS TOOLBAR
  const [isAddingText, setIsAddingText] = useState(false)
  const [isAddingPic, setIsAddingPic] = useState(false)
  const [isAddingRect, setIsAddingRect] = useState(false)
  const [isAddingBackground, setIsAddingBackground] = useState(false)
  const [selectedLink, setSelectedLink] = useState(null)

  // ACTIONS & SCENES
  const [editStatus, setEditStatus] = useState({
    storyId: 0,
    sceneId: 0,
    nbreScene: 0,
  })

  const [tabElem, setTabElem] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()

  const [updateActions, setUpdateActions] = useState(false)

  /* ============================================= GESTIONS EVENEMENTS CANVAS  ========================================= */

  /* Fonction initialisation canva */
  const initCanvas = () => {
    const newCanvas = new fabric.Canvas("myCanva", {
      backgroundColor: "white",
    })

    return newCanvas
  }

  /* Update properties selected */

  const updateSelectedProperties = (object) => {
    // console.info("Objet selectionné : ", object)
    setObjectSelected((prevObjectSelected) => {
      const newObject = {
        selected: true,
        type: object.type,
        id: object.id,
        properties: object.toObject(),
        link: object.link,
      }

      return newObject
    })
  }

  /* <<<<================= Creation de nouveaux objets fabrics

  /* ================ add text ================ */
  const addText = (canvi) => {
    const textId = uuidv4()
    const text = new fabric.Textbox("Texte", {
      height: 280,
      width: 200,
      fill: "black",
      pos: { percX: "", percY: "" },
      id: textId,
      Actions: [],
      link: "",
    })

    canvi.add(text)
    canvi.renderAll()

    setIsAddingText(false)
  }

  /* ================ add rectangle =================== */
  const addRect = (canvi) => {
    const rectId = uuidv4()

    const rect = new fabric.Rect({
      height: 200,
      width: 200,
      fill: "grey",
      pos: { percX: "", percY: "" },
      id: rectId,
      Actions: [],
      link: "",
    })

    canvi.add(rect)
    canvi.renderAll()
    setIsAddingRect(false)
  }

  /* ================ add image ================ */
  const addImage = (canvi, imageUrl) => {
    const imgId = uuidv4()
    fabric.Image.fromURL(imageUrl, (img) => {
      img.scale(0.75)
      img.id = imgId
      img.pos = { percX: "", percY: "" }
      img.Actions = []
      img.link = ""
      canvi.add(img)
    })

    canvi.renderAll()
    setIsAddingPic(false)
  }

  /* ================ add background ================ */
  const addBackground = () => {
    if (canvas && backgroundPath !== "" && isAddingBackground) {
      const backendBaseUrl = `http://localhost:4242/uploads/${backgroundPath}`

      fabric.Image.fromURL(backendBaseUrl, (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        })
      })
      setIsAddingBackground(false)
    }
  }

  /* ================ delete object ================ */
  const keyDeleteObject = () => {
    const activeObject = canvas.getActiveObject()

    if (activeObject) {
      canvas.remove(activeObject)
      canvas.discardActiveObject()
      canvas.renderAll()
    }
  }

  /* ================ update states ================ */
  const updateStates = (object) => {
    if (object) {
      // font style
      if (object.type === "textbox") {
        setSelectedColor(object.fill)
        setSelectedFont(object.fontFamily)
        setSelectedSize(object.fontSize)
        setAlignment(object.textAlign)
        // setSelectedColorBg(object.backgroundColor)
      }
      // properties
      if (object.type === "rect") {
        setSelectedSizeBorder(object.strokeWidth)
        setSelectedSizeRadius(object.rx)
        setSelectedColorBorder(object.stroke || "#FFFFFF")
        setSelectedColorBg(object.fill)
      }
    }
  }

  /* Récupérer actions */
  const getActions = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject()
      if (activeObject) {
        const newTabElem = activeObject.Actions.map((elem, index) => (
          <tr key={index}>
            <td>{elem.type}</td>
            <td>{elem.target}</td>
            <td>{elem.number}</td>
            <td>
              <img
                src={imgDelete}
                alt="img-delete"
                onClick={() => handleDelete(index)}
              />
            </td>
          </tr>
        ))

        const link = activeObject.link

        setTabElem(newTabElem)
        setSelectedLink(link.toString())
      }
    }
  }

  /* Delete action */
  const handleDelete = (index) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject()
      if (activeObject) {
        const currentActions = activeObject.get("Actions")

        if (currentActions && currentActions.length > index) {
          currentActions.splice(index, 1)
          activeObject.set({ Actions: currentActions })
          canvas.renderAll()
          setUpdateActions(true)
        }
      }
    }
  }

  /* =================================================== REQUETES HTTP ================================================= */

  const getScene = (idStory, idScene) => {
    console.info("IMPORT STORY ", idStory, " SCENE ", idScene)

    axios
      .get(`http://localhost:4242/api-stories/${idStory}/${idScene}`)
      .then((response) => {
        console.info("Get scene => Réponse serveur :", response.data)
        setEditStatus((prevEditStatus) => ({
          ...prevEditStatus,
          nbreScene: response.data.nbScenes,
          sceneId: response.data.id,
        }))

        setObjects(response.data.scene)

        renderNewElements(response.data.scene)
        console.log("scene importee: ", response.data.scene)
      })
      .catch((error) => {
        console.error("Erreur de la requête :", error)
      })

    return () => {
      renderNewElements(objects)
    }
  }

  const renderNewElements = (data) => {
    canvas.clear()

    // "textbox"
    for (const textboxId in data.textbox) {
      const textboxData = data.textbox[textboxId]
      const { left, top } = MiseEchelleInverse(
        textboxData.pos.percX,
        textboxData.pos.percY
      )

      const textbox = new fabric.Textbox(textboxData.obj.text, {
        left,
        top,
        width: textboxData.obj.width,
        height: textboxData.obj.height,
        fill: textboxData.obj.fill,
        fontFamily: textboxData.obj.fontFamily,
        textAlign: textboxData.obj.textAlign,
        fontSize: textboxData.obj.fontSize,
        id: textboxData.id,
        Actions: textboxData.Actions,
        link: textboxData.link,
        pos: textboxData.pos,
        scaleX: textboxData.obj.scaleX,
        scaleY: textboxData.obj.scaleY,
        skewX: textboxData.obj.skewX,
        skewY: textboxData.obj.skewY,
        angle: textboxData.obj.angle,
        flipX: textboxData.obj.flipX,
        flipY: textboxData.obj.flipY,
      })

      // const textboxInfo = new fabric.Textbox(textInfo, { dataTextInfo })
      console.log(`${textboxData.pos.percX} %`)
      console.log("textbox crée : ", textbox)
      canvas.add(textbox)
      // canvas.add(textboxInfo)
      canvas.renderAll()
    }

    // Parcourez les données de "rect"
    for (const rectId in data.rect) {
      const rectData = data.rect[rectId]
      const { left, top } = MiseEchelleInverse(
        rectData.pos.percX,
        rectData.pos.percY
      )
      const rect = new fabric.Rect({
        left,
        top,
        width: rectData.obj.width,
        height: rectData.obj.height,
        fill: rectData.obj.fill,
        stroke: rectData.obj.stroke,
        strokeWidth: rectData.obj.strokeWidth,
        id: rectData.id,
        link: rectData.link,
        pos: rectData.pos,
        Actions: rectData.Actions,
        scaleX: rectData.obj.scaleX,
        scaleY: rectData.obj.scaleY,
        angle: rectData.obj.angle,
        flipX: rectData.obj.flipX,
        flipY: rectData.obj.flipY,
        rx: rectData.obj.rx,
        ry: rectData.obj.ry,
      })

      canvas.add(rect)
    }

    // Parcourez les données de "image"
    console.log("DATA IMAGE ==> ", data.image)
    for (const imgId in data.image) {
      const imgData = data.image[imgId]
      console.log("CONTENU IMAGE DE L'ID : ", imgData)
      const { left, top } = MiseEchelleInverse(
        imgData.pos.percX,
        imgData.pos.percY
      )
      console.log("Source image : ", imgData.obj.src)
      fabric.Image.fromURL(imgData.obj.src, (img) => {
        img.set({
          left,
          top,
          width: imgData.obj.width,
          height: imgData.obj.height,
          id: imgData.id,
          link: imgData.link,
          pos: imgData.pos,
          Actions: imgData.Actions,
          scaleX: imgData.obj.scaleX,
          scaleY: imgData.obj.scaleY,
          angle: imgData.obj.angle,
          cropX: imgData.obj.cropX,
          cropY: imgData.obj.cropY,
          stroke: imgData.obj.stroke,
          strokeWidth: imgData.obj.strokeWidth,

          // Autres propriétés de l'image ici
        })
        canvas.add(img)
        canvas.renderAll()
        console.log(" contenu image :", img.src)
      })
    }

    const backgroundUrl = data.background

    if (!backgroundUrl) {
      canvas.backgroundColor = "white"
    } else {
      // Chargez l'image du fond
      fabric.Image.fromURL(backgroundUrl, (img) => {
        // Ajustez la mise à l'échelle pour remplir le canvas
        img.scaleToWidth(canvas.width)
        img.scaleToHeight(canvas.height)

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))

        canvas.renderAll()
      })
    }
    canvas.renderAll()
  }

  // const getHeaders = () => {
  //   const authToken = Cookies.get("authToken")

  //   return {
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   }
  // }

  const addScene = (idStory) => {
    // const headers = getHeaders().headers
    // console.log(headers.headers)
    axios
      .post(
        `http://localhost:4242/api-stories/createScene/${idStory}`,
        null,
        config // La donnée à envoyer, ici null car la route semble ne pas nécessiter de données dans le corps
      )
      .then((response) => {
        console.info("Add scene => Réponse serveur :", response.data)
        setEditStatus((prevEditStatus) => ({
          ...prevEditStatus,
          sceneId: response.data.indexScene - 1,
          nbreScene: response.data.indexScene,
        }))
        console.info(
          "Contenu objects après reception : ",
          response.data.content
        )
        setObjects(response.data.content)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const deleteScene = (idStory, idScene) => {
    axios
      .delete(
        [`http://localhost:4242/api-stories/${idStory}/${idScene}`],
        config
      )
      .then((response) => {
        setEditStatus((prevEditStatus) => ({
          ...prevEditStatus,
          nbreScene: response.data.nbScenes,
          sceneId: response.data.id,
        }))
        setObjects(null)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const editSettings = (story, scene) => {
    setEditStatus((prevEditStatus) => ({
      ...prevEditStatus,
      storyId: story,
      sceneId: scene,
    }))
    getScene(story, scene)
  }

  const exportScenes = (data, idStory, idScene) => {
    const objectsOnCanvas = canvas.getObjects()
    const sortedObjects = {}

    objectsOnCanvas.forEach((obj) => {
      const type = obj.type
      if (!sortedObjects[type]) {
        sortedObjects[type] = {}
      }

      // Mise à l'échelle pour avoir des positions en %
      const { percX, percY } = MiseEchelle(obj.left, obj.top)

      sortedObjects[type][obj.id] = {
        obj,
        Actions: obj.Actions,
        id: obj.id,
        link: obj.link,
        pos: {
          percX,
          percY,
        },
      }
    })

    const background = canvas.backgroundImage
    const backgroundUrl = background ? background._element.src : null

    sortedObjects.background = backgroundUrl

    const { canvasWidth, canvasHeight } = getWidthCanva()
    sortedObjects.canvaHeight = canvasHeight
    sortedObjects.canvaWidth = canvasWidth

    const dataExport = sortedObjects
    axios
      .put(
        `http://localhost:4242/api-stories/${idStory}/${idScene}`,
        dataExport,
        config
      )
      .then((response) => {
        console.info("Export scene => Réponse serveur :", response.data)
        alert(response.data)
      })
      .catch((error) => {
        console.error("Erreur de la requête :", error)
      })
  }

  const getWidthCanva = () => {
    const canvasWidth = canvas.getWidth()
    const canvasHeight = canvas.getHeight()

    return { canvasWidth, canvasHeight }
  }

  const MiseEchelle = (left, top) => {
    const { canvasWidth, canvasHeight } = getWidthCanva()

    const percX = (left / canvasWidth) * 100
    const percY = (top / canvasHeight) * 100

    return { percX, percY, canvasHeight, canvasWidth }
  }

  const MiseEchelleInverse = (percX, percY) => {
    const { canvasWidth, canvasHeight } = getWidthCanva()

    console.log("height : ", canvasHeight, " width : ", canvasWidth)

    console.log("perc X : ", percX, " perc Y :", percY)

    const left = (percX * canvasWidth) / 100
    const top = (percY * canvasHeight) / 100

    console.log("left calc : ", left, " top calc : ", top)

    return { left, top }
  }

  const resetScene = () => {
    canvas.clear()
    canvas.setBackgroundColor("white")
  }

  return (
    <EditionContext.Provider
      value={{
        canvas,
        setCanvas,
        editSettings,
        resetScene,
        addScene,
        objects,
        setSearchParams,
        searchParams,
        setObjects,
        updateActions,
        setUpdateActions,
        objectSelected,
        setObjectSelected,
        exportScenes,
        getScene,
        getActions,
        initCanvas,
        selectedColor,
        selectedFont,
        selectedSize,
        updateStates,
        selectedAlignment,
        setSelectedColor,
        setSelectedFont,
        setSelectedSize,
        setAlignment,
        selectedSizeBorder,
        selectedSizeRadius,
        selectedColorBorder,
        selectedColorBg,
        setSelectedSizeBorder,
        setSelectedSizeRadius,
        setSelectedColorBorder,
        setSelectedColorBg,
        isAddingText,
        isAddingPic,
        isAddingRect,
        isAddingBackground,
        setIsAddingText,
        setIsAddingPic,
        setIsAddingRect,
        setIsAddingBackground,
        setEditStatus,
        setTabElem,
        tabElem,
        editStatus,
        deleteScene,
        addRect,
        addImage,
        addBackground,
        addText,
        setBackgroundPath,
        backgroundPath,
        setSelectedPath,
        selectedPath,
        setImgPath,
        imgPath,
        keyDeleteObject,
        updateSelectedProperties,
        selectedLink,
        setSelectedLink,
      }}
    >
      {children}
    </EditionContext.Provider>
  )
}

/* Explications rapide pour un rectangle : > A METTRE A JOUR CA A CHANGE <

utilisateur clique sur le rectangle dans la toolBar, on execute addRect via un useEffect. 
on affecte un id pour pouvoir le reconnaître et naviguer, et on le stocke dans le contexte via la variable objects
selon son type (rect, image, textbox)
c'est rendu sur le canva. 

Maintenant si l'utilisateur clique sur le rectangle pour le modifier, il y a des listenners via un useEffect. 
lorsque qu'il est "selection:created" on récupère l'objet en question via options.selected[0] et on execute getProperties
pour récupérer toutes les propriétés de l'objet et le stocker dans un objet "tampon" objetSelected. 

La méthode getProperties appelle "updateStates" qui va mettre à jour toutes les states reliées au widget pour pouvoir
voir les propriétés de l'objet en cours. 

Côté composants widget, lorsque les states seront mise à jour via la selection des inputs etc, 
la méthode saveProperties. Cette méthode permets de stocker les données de la variable tampon objectSelected 
directement dans le tableau d'objets canva. 

Un fois que c'est fait, on mets à true la state save, pour que le rendu côté canva soit conditionné par le fait
que le tableau soit bien à jour. (et on reset save)

Lorsque l'objet est déselectionné, on reset la state objectSelected.  

*/
