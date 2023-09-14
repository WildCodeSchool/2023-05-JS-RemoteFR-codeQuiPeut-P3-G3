/* eslint-disable no-restricted-syntax */
import { createContext, useContext, useState } from "react"
import { fabric } from "fabric"

const EditionContext = createContext()

export const useEditionContext = () => {
  return useContext(EditionContext)
}

export const EditionContextProvider = ({ children }) => {
  /* Liste de tous les objets scene */
  const [objects, setObjects] = useState([
    { textbox: [] },
    { image: [] },
    { rect: [] },
  ])

  /* Propriétés d'un objet selectionné */
  const [objectSelected, setObjectSelected] = useState({
    type: "",
    id: "",
    properties: {},
    actions: {},
  })

  const [updated, setUpdated] = useState(false)
  const [saved, setSave] = useState(false)

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

  // POSITIONS
  const [flipHoriz, setFlipHoriz] = useState()
  const [flipVert, setFlipVert] = useState()
  const [front, setFront] = useState()
  const [dehind, setBehind] = useState()

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
      const { index, type, error } = findIndex(newObject, newObject.type)
      if (!error) {
        setObjects((prevObj) => {
          const updatedObjects = [...prevObj]
          updatedObjects[index][type].push(newObject)
          console.log("Ajout tab : ", updatedObjects)
          return updatedObjects
        })
      }
    },
    /* Suppression element */
    delete: (type, idToDelete) => {
      console.log("======= SUPP OBJECT ========= ")
      console.log("object to delete: ", idToDelete)

      setObjects((prevObjects) => {
        const updatedArray = prevObjects.map((item) => {
          if (item[type] && Array.isArray(item[type])) {
            item[type] = item[type].filter((rectItem) => {
              return rectItem.id !== idToDelete
            })
          }
          return item
        })

        return updatedArray
      })
    },
    /* Récupération des propriétés */
    getProperties: (object) => {
      console.log("02 ======= GET PROPERTIES ========= ")
      setUpdated(false)
      tabObject.resetProperties()
      setObjectSelected((prevObjectSelected) => {
        const newObject = {
          type: object.type,
          id: object.id,
          properties: object.toObject(),
        }
        console.log("Params objet : ", newObject)
        setUpdated(true)
        updateStates(newObject)

        return newObject
      })
    },

    /* recherche par Id */
    getById: (activeObject) => {
      const idSearch = activeObject.id
      console.log(activeObject)
      for (const group of objects) {
        for (const [key, items] of Object.entries(group)) {
          for (const item of items) {
            if (item.id === idSearch) {
              return { key, item }
            }
          }
        }
      }
      return null
    },

    /* Sauvegarde dans tableau d'objets */
    saveProperties: (objectUpdated) => {
      console.log("04 =========== SAVE PROPERTIES =========== ")

      tabObject.updateById(objectUpdated)
      setSave(true)
      // setObjects((prev) => ({}))
    },

    /* OK - update tab objet du objectSelected par id */
    updateById: (objectUpdated) => {
      const idToUpdate = objectSelected.id
      const type = objectSelected.type
      setObjects((prevObjects) => {
        const updatedArray = prevObjects.map((item) => {
          if (item[type] && Array.isArray(item[type])) {
            const updatedItems = item[type].map((properties) => {
              if (properties.id === idToUpdate) {
                console.log("objet props : ", properties)
                console.log("remplacé par : ", objectUpdated)
                return {
                  ...properties,
                  ...objectUpdated,
                }
              }
              return properties
            })
            item[type] = updatedItems
          }
          return item
        })
        console.log("tableau updated :", updatedArray)
        return updatedArray
      })
    },
    /* Reset selectedObject */
    resetProperties: (object) => {
      console.log("======= RESET PROPERTIES ========= ")
      setObjectSelected({
        type: "",
        id: "",
        properties: {},
      })
      setUpdated(false)
      resetStates()
    },

    getAction: () => {
      const id = objectSelected.id
      const type = objectSelected.type

      return objects
    },
  }

  /* =============== ANNEXES =========================== */

  const resetStates = () => {
    setSelectedColor("")
    setSelectedFont("")
    setSelectedSize("")
    setAlignment("")

    setSelectedSizeBorder("")
    setSelectedSizeRadius("")
    setSelectedColorBorder("")
    setSelectedColorBg("")
  }

  /* OK - Update des states */
  const updateStates = (object) => {
    // console.log(object)
    if (object) {
      console.log(
        "03 ===== UPDATE context  => states ====== : ",
        object.properties
      )
      const properties = object.properties

      /* ----  Commons  ---- */
      // font style
      setSelectedColor(properties.fill)
      setSelectedFont(properties.fontFamily)
      setSelectedSize(properties.fontSize)
      setAlignment(properties.textAlign)
      //   // properties
      setSelectedSizeBorder(properties.strokeWidth)
      setSelectedSizeRadius(properties.rx)
      setSelectedColorBorder(properties.stroke || "#FFFFFF")

      if (object.type === "rect") {
        setSelectedColorBg(properties.fill)
      }
      if (object.type === "textbox") {
        setSelectedColorBg(properties.backgroundColor)
      }
    }
  }

  /* OK - Recherche index tableau d'objet de l'obj selectionné */
  const findIndex = (newObject, type = "") => {
    if (type === undefined || type === null) {
      type = newObject.type
    }

    const index = objects.findIndex((item) => Object.keys(item)[0] === type)

    if (index !== -1) {
      return { index, type, error: false }
    }

    return { index: null, type: null, error: true }
  }

  return (
    <EditionContext.Provider
      value={{
        canvas,
        setCanvas,
        saved,
        setSave,
        objects,
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
      }}
    >
      {children}
    </EditionContext.Provider>
  )
}

/* Explications rapide pour un rectangle : 

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
