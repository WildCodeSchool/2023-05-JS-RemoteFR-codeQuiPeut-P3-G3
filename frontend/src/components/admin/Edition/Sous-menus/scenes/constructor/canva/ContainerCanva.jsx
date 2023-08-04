import { useState, useEffect, useRef } from "react"
import { fabric } from "fabric"

function ContainerCanva({ isAddingText, setIsAddingText }) {
  const canvasRef = useRef(null) // Create a ref using useRef hook
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  console.info(startPosition)

  useEffect(() => {
    // Initialize the Fabric.js canvas only once on component mount
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    })

    // Cleanup function to remove the Fabric.js canvas on unmount
    return () => {
      canvas.dispose()
    }
  }, [])

  const handleCanvasMouseDown = (event) => {
    if (isAddingText) {
      const canvas = canvasRef.current
      const { offsetX, offsetY } = event
      setStartPosition({ x: offsetX, y: offsetY })

      const newText = new fabric.Textbox("Your Text Here", {
        left: offsetX,
        top: offsetY,
        fontSize: 20,
        width: 200,
      })

      canvas.add(newText)
      canvas.setActiveObject(newText)
      canvas.renderAll()
    }
  }

  const handleCanvasMouseUp = () => {
    if (isAddingText) {
      setIsAddingText(false)
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleCanvasMouseDown}
        onMouseUp={handleCanvasMouseUp}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
      />
    </div>
  )
}

export default ContainerCanva
