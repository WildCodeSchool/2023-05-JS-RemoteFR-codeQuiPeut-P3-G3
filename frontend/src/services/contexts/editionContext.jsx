/* eslint-disable no-restricted-syntax */
import { createContext, useContext, useState, useEffect } from "react"
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
  })

  const [updated, setUpdated] = useState(false)

  /* ============== STATES PROPERTIES =================== */

  // TEXTS
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")
  const [selectedSize, setSelectedSize] = useState(16)
  const [selectedAlignment, setAlignment] = useState("text-align: center")

  // RECT
  const [selectedSizeBorder, setSelectedSizeBorder] = useState(0)
  const [selectedSizeRadius, setSelectedSizeRadius] = useState("")
  const [selectedColorBorder, setSelectedColorBorder] = useState("")
  const [selectedColorBg, setSelectedColorBg] = useState("")

  /* ================ FONCTIONS ========================== */

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

      updateById(objectUpdated)

      // setObjects((prev) => ({}))
    },
    /* Reset selectedObject */
    resetProperties: (object) => {
      console.log("======= RESET PROPERTIES ========= ")
      setObjectSelected([])
      setUpdated(true)
    },
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
      setSelectedColorBorder(parseInt(properties.stroke))

      if (object.type === "rect") {
        setSelectedColorBg(properties.fill)
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

  const updateById = (objectUpdated) => {
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
  }

  // Mettez à jour l'état avec le tableau mis à jour pour ce type
  // return {
  //   ...prevObjects,
  //   [type]: updatedTypeArray,

  // return prevObjects

  // }

  // useEffect(() => {
  //   console.log("updated : ", objects)
  // }, [objects])

  return (
    <EditionContext.Provider
      value={{
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
