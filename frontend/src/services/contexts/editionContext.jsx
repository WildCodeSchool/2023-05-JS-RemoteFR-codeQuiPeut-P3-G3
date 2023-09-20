/* eslint-disable no-restricted-syntax */
import { createContext, useContext, useState } from "react"
import { fabric } from "fabric"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import imgDelete from "../../assets/text_ui/minus.png"
import { useSearchParams } from "react-router-dom"

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
  })

  /* ================ STATES UPDATES  ==================== */
  const [updated, setUpdated] = useState(false)
  const [render, setRender] = useState(false)

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

  // PERSONNAGES HEROS
  const [hero, setHero] = useState([])

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
    // console.log("02 ======= UPDATE FROM CANVAS ========= ")
    // console.info("Objet selectionné : ", object)

    setObjectSelected((prevObjectSelected) => {
      const newObject = {
        selected: true,
        type: object.type,
        id: object.id,
        properties: object.toObject(),
      }
      // console.log("Object selected updated : ", newObject)

      return newObject
    })
  }

  /* <<<<================= Creation de nouveaux objets fabrics

  /* add text */
  const addText = (canvi) => {
    const textId = uuidv4()
    const text = new fabric.Textbox("Texte", {
      height: 280,
      width: 200,
      fill: "black",
      id: textId,
      Actions: [],
    })

    canvi.add(text)
    canvi.renderAll()
    setIsAddingText(false)
  }

  /* add rectangle */
  const addRect = (canvi) => {
    const rectId = uuidv4()

    const rect = new fabric.Rect({
      height: 200,
      width: 200,
      fill: "grey",
      id: rectId,
      Actions: [],
    })

    canvi.add(rect)
    canvi.renderAll()
    setIsAddingRect(false)
  }

  /* add image */
  const addImage = (canvi, imageUrl) => {
    const imgId = uuidv4()
    fabric.Image.fromURL(imageUrl, (img) => {
      img.scale(0.75)
      img.id = imgId
      img.Actions = []
      canvi.add(img)
    })

    canvi.renderAll()
    setIsAddingPic(false)
  }

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

  const keyDeleteObject = () => {
    const activeObject = canvas.getActiveObject()

    if (activeObject) {
      console.log("activeObject : ", activeObject)
      console.log("id de l'active object : ", activeObject.id)
      canvas.remove(activeObject)
      canvas.discardActiveObject()
      canvas.renderAll()
    }
  }

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

        setTabElem(newTabElem)
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

  /* ======= ANNEXES ====== */

  // const resetStates = () => {
  //   setSelectedColor("")
  //   setSelectedFont("")
  //   setSelectedSize("")
  //   setAlignment("")

  //   setSelectedSizeBorder("")
  //   setSelectedSizeRadius("")
  //   setSelectedColorBorder("")
  //   setSelectedColorBg("")
  // }

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
        // console.log(response.data.scene)
        setObjects(response.data.scene)
        canvas.clear()
        renderNewElements(response.data.scene)
      })
      .catch((error) => {
        // Gérer les erreurs de la requête
        console.error("Erreur de la requête :", error)
      })

    // canvas.clear()

    return () => {
      renderNewElements(objects)
    }
  }

  const renderNewElements = (data) => {
    console.log("render des elements")
    console.log(data)

    canvas.clear()

    // "textbox"
    for (const textboxId in data.textbox) {
      const textboxData = data.textbox[textboxId]
      const textbox = new fabric.Textbox(textboxData.obj.text, {
        left: textboxData.obj.left,
        top: textboxData.obj.top,
        width: textboxData.obj.width,
        height: textboxData.obj.height,
        fill: textboxData.obj.fill,
        fontFamily: textboxData.obj.fontFamily,
        fontSize: textboxData.obj.fontSize,
        id: textboxData.id,
        Actions: textboxData.Actions,
      })

      canvas.add(textbox)
    }

    // Parcourez les données de "rect"
    for (const rectId in data.rect) {
      const rectData = data.rect[rectId]
      const rect = new fabric.Rect({
        left: rectData.left,
        top: rectData.top,
        width: rectData.width,
        height: rectData.height,
        fill: rectData.fill,
        id: rectData.id,
        // Autres propriétés du rectangle ici
      })

      canvas.add(rect)
    }

    // Parcourez les données de "image"
    for (const imgId in data.image) {
      const imgData = data.image[imgId]
      fabric.Image.fromURL(imgData.src, (img) => {
        img.set({
          left: imgData.left,
          top: imgData.top,
          width: imgData.width,
          height: imgData.height,
          id: imgData.id,
          // Autres propriétés de l'image ici
        })
        canvas.add(img)
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

        // Définissez le fond sur l'image chargée
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))

        // Forcez le rendu du canvas
        canvas.renderAll()
      })
    }
    canvas.renderAll()

    console.log(canvas.getObjects())
  }
  const addScene = (idStory) => {
    console.log("id story avant envoi : ", idStory)
    axios
      .post(`http://localhost:4242/api-stories/createScene/${idStory}`)
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
        console.log(response.data.indexScene)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteScene = (idStory, idScene) => {
    console.log(`suppression de ${idStory} scene ${idScene}`)
    axios
      .delete([`http://localhost:4242/api-stories/${idStory}/${idScene}`])
      .then((response) => {
        console.log(response)
        setEditStatus((prevEditStatus) => ({
          ...prevEditStatus,
          nbreScene: response.data.nbScenes,
          sceneId: response.data.id,
        }))
      })
      .catch((error) => {
        console.log(error)
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
    console.log(objectsOnCanvas)
    // Créez un objet pour stocker les objets triés par type
    const sortedObjects = {}

    // Parcourez le tableau d'objets et organisez-les par type
    objectsOnCanvas.forEach((obj) => {
      console.log(obj)
      const type = obj.type
      if (!sortedObjects[type]) {
        sortedObjects[type] = {}
      }

      // sortedObjects[type][obj.id] = obj
      sortedObjects[type][obj.id] = {
        // eslint-disable-next-line object-shorthand
        obj: obj,
        Actions: obj.Actions,
        id: obj.id,
      }
    })

    // Obtenir l'URL du fond s'il y en a un
    const background = canvas.backgroundImage
    const backgroundUrl = background ? background._element.src : null

    // Ajoutez l'URL du fond à vos données exportées
    sortedObjects.background = backgroundUrl

    // Maintenant, sortedObjects contient les objets triés par type avec l'URL de fond
    console.log("objet arrangé : ", sortedObjects)

    const dataExport = sortedObjects
    console.log("data exportée : ", dataExport)
    axios
      .put(
        `http://localhost:4242/api-stories/${idStory}/${idScene}`,
        dataExport
      )
      .then((response) => {
        console.info("Export scene => Réponse serveur :", response.data)
      })
      .catch((error) => {
        console.error("Erreur de la requête :", error)
      })
  }

  return (
    <EditionContext.Provider
      value={{
        canvas,
        setCanvas,
        editSettings,
        render,
        setRender,
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
        setUpdated,
        updated,
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
        setHero,
        hero,
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
