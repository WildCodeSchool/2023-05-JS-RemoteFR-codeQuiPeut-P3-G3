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
    // actions: [],
  })

  /* =========== STATES UPDATES  =========== */
  const [updated, setUpdated] = useState(false)
  const [render, setRender] = useState(false)

  /* =================== CANVA ==================== */
  const [canvas, setCanvas] = useState("")

  /* ============== STATES PROPERTIES =================== */

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

  // ACTIONS & SCENES

  /* ================ GESTIONS STATES ET OBJETS  ========================== */

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
      console.log("01 ======= AJOUT OBJECT ========= ")
      const newObject = newFabElem.toObject()
      newObject.id = id
      newObject.Actions = []
      const type = newObject.type
      console.log(type)

      setObjects((prevObjects) => {
        const updatedObjects = { ...prevObjects } // Créez une copie de l'objet précédent

        // Vérifiez si la propriété type existe dans l'objet updatedObjects, sinon initialisez-la à un objet vide
        if (!updatedObjects[type]) {
          updatedObjects[type] = {}
        }

        // Ajoutez le nouvel objet avec la clé ID au type approprié
        updatedObjects[type][id] = newObject
        console.log("Ajout object: ", updatedObjects)
        return updatedObjects // Retournez le nouvel objet mis à jour
      })
    },
    /* Suppression element */
    delete: (type, idToDelete) => {
      console.log("======= SUPP OBJECT ========= ")
      console.log("object to delete: ", idToDelete)

      setObjects((prevObjects) => {
        const updatedObjects = { ...prevObjects } // Créez une copie de l'objet précédent

        // Vérifiez si la propriété type existe dans l'objet updatedObjects
        if (updatedObjects[type] && typeof updatedObjects[type] === "object") {
          // Supprimez l'objet avec l'ID donné du type approprié
          delete updatedObjects[type][idToDelete]
        }

        console.log("Updated objects: ", updatedObjects)
        return updatedObjects // Retournez le nouvel objet mis à jour
      })
    },

    /* recherche par Id (render AtiveObject) */
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
      console.log("04 =========== SAVE TO OBJECTS  =========== ")

      const { id, type } = objectSelected
      console.log(
        "sauvegarde du ",
        type,
        " id : ",
        id,
        "value : ",
        objectUpdated
      )

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
      // resetStates()
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
          // Actions: object.Actions,
        }
        console.log("Object selected updated : ", newObject)
        updateStates(newObject)

        return newObject
      })
    },
  }

  /* ============================= ANNEXES =========================== */

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

  /* Update des states */
  const updateStates = (object) => {
    // console.log(object)
    if (object) {
      console.log(
        "03 ===== UPDATE context  => states ====== : ",
        object.properties
      )
      const properties = object.properties

      // font style
      if (object.type === "textbox") {
        setSelectedColor(properties.fill)
        setSelectedFont(properties.fontFamily)
        setSelectedSize(properties.fontSize)
        setAlignment(properties.textAlign)
        setSelectedColorBg(properties.backgroundColor)
      }
      //   // properties
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

  const exportScenes = (data) => {
    console.log(objects)
    const dataExport = customJSONStringify(objects)
    console.log(dataExport)
    axios
      .put(`http://localhost:4242/api-stories/01/2`, objects)
      .then((response) => {
        console.log("Réponse du serveur :", response.data)
      })
      .catch((error) => {
        // Gérer les erreurs de la requête
        console.error("Erreur de la requête :", error)
      })
  }

  return (
    <EditionContext.Provider
      value={{
        canvas,
        setCanvas,
        render,
        setRender,
        objects,
        setObjects,
        tabObject,
        objectSelected,
        setObjectSelected,
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
        exportScenes,
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
