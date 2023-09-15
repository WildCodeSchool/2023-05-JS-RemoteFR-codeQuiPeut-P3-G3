/* eslint-disable no-restricted-syntax */
import { createContext, useContext, useState, useEffect } from "react"
import { fabric } from "fabric"

const EditionContext = createContext()

export const useEditionContext = () => {
  return useContext(EditionContext)
}

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

    /* recherche par Id */
    getById: (activeObject) => {
      const idSearch = activeObject.id

      for (const [type, items] of Object.entries(objects)) {
        if (items[idSearch]) {
          // console.log(" function getById", type, items[idSearch])
          return { type, item: items[idSearch] }
        }
      }

      return null
    },

    /* Sauvegarde dans tableau d'objets */
    saveProperties: (objectUpdated) => {
      console.log("04 =========== SAVE TO OBJECTS  =========== ")

      const idToUpdate = objectUpdated.id
      const type = objectUpdated.type
      console.log("sauvegarde du ", type, " id : ", idToUpdate)

      setObjects((prevObjects) => {
        const updatedObjects = { ...prevObjects } // Créez une copie de l'objet précédent

        // Vérifiez si la propriété type existe dans l'objet updatedObjects
        if (updatedObjects[type] && updatedObjects[type][idToUpdate]) {
          // Mettez à jour l'objet avec les nouvelles propriétés
          console.log("Objects updates....")
          updatedObjects[type][idToUpdate] = {
            ...updatedObjects[type][idToUpdate],
            ...objectUpdated.properties,
          }
        }

        console.log("Updated objects: ", updatedObjects)
        tabObject.updateObjectSelect(updatedObjects[type][idToUpdate])
        setRender(true)
        console.log("sauvegarde effectuée, > render ")
        // tabObject.updateObjectSelect(objects)
        return updatedObjects // Retournez le nouvel objet mis à jour
      })
    },

    pushActions: (data) => {
      console.log("========= PUSH ACTIONS ========== ")
      const id = objectSelected.id
      const type = objectSelected.type

      console.log("id et type : ", id, type)
      console.log(objects[type][id])
      console.log("data : ", data)

      const updatedActions = [...objects[type][id].Actions]
      updatedActions.push(data)

      objects[type][id].Actions = updatedActions

      setObjects({ ...objects })
    },

    resetProperties: () => {
      console.log("======= RESET PROPERTIES ========= ")
      setObjectSelected({
        type: "",
        id: "",
        properties: {},
        actions: [],
      })
      setUpdated(false)
      resetStates()
    },

    updateSelectedProperties: (object) => {
      console.log("02 ======= UPDATE FROM CANVAS ========= ")

      setObjectSelected((prevObjectSelected) => {
        const newObject = {
          type: object.type,
          id: object.id,
          properties: object.toObject(),
          // Actions: object.Actions,
        }
        console.log("Object selected updated : ", newObject)
        updateStates(newObject)
        tabObject.saveProperties(newObject)
        return newObject
      })
    },

    updateObjectSelect: (object) => {
      console.log("02 ======= UPDATE SELECTED ========= ")
      console.log("object à update : ", object)
      setObjectSelected((prevObjectSelected) => {
        const newObject = {
          type: object.type,
          id: object.id,
          properties: object,
          Actions: object.Actions,
        }
        console.log("Selected object updated : ", newObject)
        // updateStates(newObject)
        return newObject
      })
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

  useEffect(() => {
    console.log(">>> render ", objects)
    // setRender(true)
  }, [objects])

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
