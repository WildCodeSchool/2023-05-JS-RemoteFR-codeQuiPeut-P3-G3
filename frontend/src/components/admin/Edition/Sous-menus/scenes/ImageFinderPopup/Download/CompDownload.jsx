import "./CompDownload.scss"
import { useState } from "react"

import imgImport from "../../../../../../../assets/user_ui/import.png"

function CompDownload() {
  const [imgSelected, setImgSelected] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Faites ce que vous devez faire avec le fichier ici
      setImgSelected(true)
    }
  }

  return (
    <div className="compDownload">
      <div className="compDownload__import">
        <h4> Select a picture from files </h4>
        <div className="file-input">
          <input
            type="file"
            name="file-input"
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

      {imgSelected && (
        <div className="compDownload__imgPreview">
          <h4> Image preview</h4>
        </div>
      )}
    </div>
  )
}

export default CompDownload
