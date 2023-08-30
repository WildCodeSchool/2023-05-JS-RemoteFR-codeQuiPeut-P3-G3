// import some node modules for later

const fs = require("node:fs")
const path = require("node:path")

// Multer pour le transfert d'images
const multer = require("multer")

// create express app

const express = require("express")

const app = express()

// use some application-level middlewares

app.use(express.json())

const cors = require("cors")

app.use(cors())

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
)

/* Laisse le répertoire uploads accessible */
app.use("/uploads", express.static("uploads"))

// import and mount the API routes

const router = require("./router")

app.use(router)

// *---------------  Configuration de multer -----------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.params.id // Utilisateur correspondant
    const uploadPath = path.join(__dirname, "uploads", userId) // Chemin de téléchargement
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // Nom du fichier original
  },
})

const upload = multer({ storage })

// Route pour ajouter une image avec Multer
app.post("/addPicture/:id", upload.single("image"), (req, res) => {
  res.status(200).json({ message: "Image téléchargée avec succès." })
})

// *-----------------------------------------------------------------

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")))

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
)

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")))

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile)
  })
}

// ready to export

module.exports = app
