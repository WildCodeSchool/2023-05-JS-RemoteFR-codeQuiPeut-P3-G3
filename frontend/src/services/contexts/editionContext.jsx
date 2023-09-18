/* eslint-disable no-restricted-syntax */
import { createContext, useContext, useState } from "react"
import { fabric } from "fabric"
import axios from "axios"

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

  // SELECTIONS TOOLBAR
  const [isAddingText, setIsAddingText] = useState(false)
  const [isAddingPic, setIsAddingPic] = useState(false)
  const [isAddingRect, setIsAddingRect] = useState(false)
  const [isAddingBackground, setIsAddingBackground] = useState(false)

  // ACTIONS & SCENES
  const [editStatus, setEditStatus] = useState({
    storyId: 0,
    sceneId: 0,
    nbreScene: 0,
  })

  /* ============================================= GESTIONS EVENEMENTS CANVAS  ========================================= */

  /* Fonction initialisation canva */
  const initCanvas = () => {
    const newCanvas = new fabric.Canvas("myCanva", {
      backgroundColor: "white",
    })

    return newCanvas
  }

  const tabObject = {
    /* Ajout d'un élément */
    add: (newFabElem, id) => {
      const newObject = newFabElem.toObject()
      newObject.id = id
      newObject.Actions = []
      const type = newObject.type

      setObjects((prevObjects) => {
        const updatedObjects = { ...prevObjects }

        if (!updatedObjects[type]) {
          updatedObjects[type] = {}
        }

        updatedObjects[type][id] = newObject
        return updatedObjects
      })
    },
    /* Suppression element */
    delete: (type, idToDelete) => {
      setObjects((prevObjects) => {
        // Copie du précédent
        const updatedObjects = { ...prevObjects }

        if (updatedObjects[type] && typeof updatedObjects[type] === "object") {
          delete updatedObjects[type][idToDelete]
        }

        return updatedObjects
      })
    },

    /* Recherche par Id (render AtiveObject) */
    getItemById: (activeObject) => {
      const idSearch = activeObject.id

      for (const [type, items] of Object.entries(objects)) {
        if (items[idSearch]) {
          return { type, item: items[idSearch] }
        }
      }
      return null
    },

    /* Sauvegarde dans tableau d'objets */
    saveProperties: (objectUpdated) => {
      const { id, type } = objectSelected

      setObjects((prevObjects) => {
        const updatedObjects = { ...prevObjects }

        if (updatedObjects[type] && updatedObjects[type][id]) {
          updatedObjects[type][id] = {
            ...updatedObjects[type][id],
            ...(objectUpdated.properties || objectUpdated),
          }

          console.log("Updated objects: ", updatedObjects)

          setRender(true)
          console.log("sauvegarde effectuée, > render ")
        }

        return updatedObjects
      })
    },

    /* Reset  properties selected */
    resetProperties: () => {
      console.log("======= RESET PROPERTIES ========= ")
      setObjectSelected({
        type: "",
        id: "",
        properties: {},
        actions: [],
      })
      setUpdated(false)
    },

    /* Update properties selected */
    updateSelectedProperties: (object) => {
      console.log("02 ======= UPDATE FROM CANVAS ========= ")
      console.log(object)

      setObjectSelected((prevObjectSelected) => {
        const newObject = {
          type: object.type,
          id: object.id,
          properties: object.toObject(),
        }
        console.log("Object selected updated : ", newObject)
        tabObject.updateStates(newObject)

        return newObject
      })
    },

    /* Update des states */
    updateStates: (object) => {
      if (object) {
        const properties = object.properties

        // font style
        if (object.type === "textbox") {
          setSelectedColor(properties.fill)
          setSelectedFont(properties.fontFamily)
          setSelectedSize(properties.fontSize)
          setAlignment(properties.textAlign)
          setSelectedColorBg(properties.backgroundColor)
        }
        // properties
        if (object.type === "rect" || object.type === "textbox") {
          setSelectedSizeBorder(properties.strokeWidth)
          setSelectedSizeRadius(properties.rx)
          setSelectedColorBorder(properties.stroke || "#FFFFFF")
          setSelectedColorBg(properties.fill)
        }

        const states = {
          selectedColor,
          selectedFont,
          selectedSize,
          selectedAlignment,
          selectedSizeBorder,
          selectedSizeRadius,
          selectedColorBorder,
        }
        console.log("states : ", states)
      }
    },
  }

  // const renderObject = (object) => {
  //   for (const textboxId in objects.textbox) {
  //     const textboxData = objects.textbox[textboxId]
  //     const textbox = new fabric.Textbox(textboxData.text, {
  //       left: textboxData.left,
  //       top: textboxData.top,
  //       width: textboxData.width,
  //       height: textboxData.height,
  //       fill: textboxData.fill,
  //       fontFamily: textboxData.fontFamily,
  //       fontSize: textboxData.fontSize,
  //       textAlign: textboxData.textAlign,
  //       // Ajoutez d'autres propriétés de style ici si nécessaire
  //     })

  //     canvas.add(textbox)
  //   }
  // }

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
    console.log("IMPORT SCENE")

    console.log(idStory)
    console.log(idScene)

    axios
      .get(`http://localhost:4242/api-stories/${idStory}/${idScene}`)
      .then((response) => {
        console.log("Réponse du serveur :", response.data)
        setEditStatus((prevEditStatus) => ({
          ...prevEditStatus,
          nbreScene: response.data.nbScenes,
          sceneId: response.data.id,
        }))
        console.log(response.data.scene)
        setObjects(response.data.indexScene)
        // setRender(true) (voir comment update les objets fabric pour render)
      })
      .catch((error) => {
        // Gérer les erreurs de la requête
        console.error("Erreur de la requête :", error)
      })
  }

  const addScene = (idStory) => {
    console.log("id story avant envoi : ", idStory)
    axios
      .post(`http://localhost:4242/api-stories/createScene/${idStory}`)
      .then((response) => {
        setEditStatus((prevEditStatus) => ({
          ...prevEditStatus,
          sceneId: response.data.indexScene - 1,
          nbreScene: response.data.indexScene,
        }))
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
    const dataExport = customJSONStringify(objects)
    console.log(dataExport)
    axios
      .put(`http://localhost:4242/api-stories/${idStory}/${idScene}`, objects)
      .then((response) => {
        console.info("Réponse du serveur :", response.data)
      })
      .catch((error) => {
        console.error("Erreur de la requête :", error)
      })
  }

  function customJSONStringify(obj) {
    const seen = new Set()

    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular Reference]"
        }
        seen.add(value)
      }
      return value
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
        setObjects,
        tabObject,
        objectSelected,
        setObjectSelected,
        exportScenes,
        getScene,
        setUpdated,
        updated,
        initCanvas,
        selectedColor,
        selectedFont,
        selectedSize,
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
        editStatus,
        deleteScene,
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
