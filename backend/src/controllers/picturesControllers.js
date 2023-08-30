const models = require("../models")
const multer = require("multer")
const mime = require("mime-types")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, "../../uploads")
    cb(null, destinationPath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    const extension = mime.extension(file.mimetype)
    const originalFileName = file.originalname.split(".")[0]
    const fileName = originalFileName + "_" + uniqueSuffix + "." + extension

    // Utilisez fileName pour l'appel à uploadPicture
    cb(null, fileName)
  },
})

const upload = multer({ storage }).single("image")

const picturesControllers = {
  upload,

  add: [
    upload,
    async (req, res, next) => {
      try {
        // const filePath = req.file.path
        // console.log("file path : " + filePath)

        // Utilisez fileName pour l'appel à uploadPicture
        const fileName = req.file.filename // Ajoutez cette ligne
        await models.pictures.uploadPicture(fileName)

        res.locals.fileName = fileName // Stockez le nom de fichier dans res.locals
        next()
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image :", error)
        res
          .status(500)
          .json({ message: "Erreur lors du téléchargement de l'image." })
      }
    },
    (req, res) => {
      // Utilisez la valeur stockée dans res.locals.fileName
      res.status(200).json({
        message: "Image téléchargée avec succès.",
        fileName: res.locals.fileName,
      })
    },
  ],

  destroy: async (req, res) => {
    try {
      await models.pictures.deletePicture(req.params.id)
      res.status(200).json({ message: "Image supprimée avec succès." })
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image :", error)
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de l'image." })
    }
  },
  // ...
}

module.exports = picturesControllers
