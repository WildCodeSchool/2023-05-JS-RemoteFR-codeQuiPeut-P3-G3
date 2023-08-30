import "./CompUpload.scss"
import { useState } from "react"
import axios from "axios"

import imgImport from "../../../../../assets/user_ui/import.png"
import ButtonUI from "../../../Buttons/ButtonUI"

function CompUpload({ onClickCancel }) {
  const [selectedImage, setSelectedImage] = useState(null)
  // const [imageUrl, setImageUrl] = useState(null)
  const [imageName, setImageName] = useState("")
  const [loading, setLoading] = useState(false) // État de chargement
  const [success, setSuccess] = useState("")
  const [image, setImage] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file)) // Crée une URL locale pour l'image sélectionnée
      // console.log("filename : " + file.name)
      setImageName(file.name)
      setImage(file)
    }
  }

  const handleImport = async () => {
    if (selectedImage) {
      setLoading(true) // Début du chargement
      const formData = new FormData()
      formData.append("image", image)

      try {
        const response = await axios.post(
          `http://localhost:4242/addPicture/${imageName}`,
          formData
        )
        console.info(response.data.fileName)
        // setImageUrl(response.data.fileName)
        setSuccess("success !")
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error)
        setSuccess("error... try again")
      } finally {
        setLoading(false) // Fin du chargement, quelle que soit la réponse
      }
    }
  }

  return (
    <div className="CompUpload">
      <div className="CompUpload__import">
        <h4> Select a picture from files </h4>
        <div className="file-input">
          <input
            type="file"
            name="image"
            id="file-input"
            className="file-input__input"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="file-input__label">
            <img src={imgImport} alt="Preview" />
            <span>Upload file</span>
          </label>
        </div>
      </div>

      {loading ? ( // Afficher le loader pendant le chargement
        <div className="loader">Loading...</div>
      ) : (
        selectedImage && (
          <div className="CompUpload__imgPreview">
            <div className="CompUpload__wrap-imgPreview">
              <img
                src={selectedImage}
                alt="img-uploaded"
                className="imgPreview"
              />
            </div>
            <p> {success} </p>
            <div className="CompUpload__UploadButtons">
              <ButtonUI
                title={"import"}
                bgcolor={"#3f7841"}
                onClick={handleImport}
              />
              <ButtonUI
                title={"cancel"}
                bgcolor={"#902B00"}
                onClick={onClickCancel}
              />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default CompUpload
