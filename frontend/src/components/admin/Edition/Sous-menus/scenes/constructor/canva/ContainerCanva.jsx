import { useRef, useEffect } from "react"
import { fabric } from "fabric"

function ContainerCanva({ addText, setAddText }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 700,
      height: 700,
      backgroundColor: "#3e86bb",
      // Options de configuration du canvas (largeur, hauteur, etc.)
    })

    // Gestion de l'ajout de texte sur le canvas
    canvas.on("mouse:down", (event) => {
      const { x, y } = event.pointer
      const text = new fabric.Textbox("Votre texte", {
        left: x,
        top: y,
        fontSize: 20,
        // Autres options de style pour le texte
      })

      canvas.add(text)

      // setAddText(false)
    })

    // Gestion de la modification de texte sur le canvas
    canvas.on("object:selected", (event) => {
      const selectedObject = event.target
      if (selectedObject instanceof fabric.Textbox) {
        // Gérer les actions liées à la modification du texte
      }
    })

    canvas.on("object:scaling", (event) => {
      const selectedObject = event.target
      if (selectedObject instanceof fabric.Textbox) {
        // Gérer les actions liées au redimensionnement du texte
      }
    })

    // Gestion des événements sur le canvas (ajout de texte, modification, redimensionnement, etc.)
    // ...

    return () => {
      canvas.dispose() // Nettoyage lors du démontage du composant
    }
  }, [])

  return <canvas ref={canvasRef} />
}

export default ContainerCanva
