const fs = require("fs")
const path = require("path")

module.exports.getStory = (req, res) => {
  const storyId = req.params.filename
  const filePath = path.join(__dirname, "../", "stories", `${storyId}.js`)

  if (fs.existsSync(filePath)) {
    const { story } = require(filePath)
    res.json(story)
  } else {
    res.status(404).json({ error: "Story not found" })
  }
}

module.exports.getScene = (req, res) => {
  const { filename, scene } = req.params
  const filePath = path.join(__dirname, "../", "stories", `${filename}.js`)

  if (fs.existsSync(filePath)) {
    const { story } = require(filePath)
    res.json(story.scenes[scene])
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}

module.exports.createStory = (req, res) => {
  const { insertId } = req
  const { title } = req.body

  const titleFormatted = title.trim().replace(/\s+/g, "_")

  const filename = insertId + "-" + titleFormatted
  const filePath = path.join(__dirname, "../", "stories", `${filename}.js`)

  if (fs.existsSync(filePath)) {
    return res.status(400).json({ error: "Le fichier existe déjà." })
  }

  const modeleFilePath = path.join(__dirname, "model.js")

  const { story } = require(modeleFilePath)

  fs.writeFileSync(
    filePath,
    `exports.module.story = ${JSON.stringify(story, null, 2)};\n`,
    "utf-8"
  )

  return res.status(200).json({ message: "Fichier créé avec succès." })
}

module.exports.putScene = (req, res) => {
  const { filename, scene } = req.params
  const sceneContent = req.body

  const filePath = path.join(__dirname, "../", "stories", `${filename}.js`)

  if (fs.existsSync(filePath)) {
    const { story } = require(filePath)

    if (typeof story.scenes[scene] === "undefined") {
      story.scenes.push(sceneContent)
      res.send("Scène ajoutée")
    } else {
      story.scenes[scene] = sceneContent
      res.send("Scène modifiée")
    }
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}

module.exports.deleteScene = (req, res) => {
  const { id } = req.params
  const folderPath = path.join(__dirname, "../", "stories")

  const files = fs.readdirSync(folderPath)

  // Expression régulière pour rechercher l'index exact dans le nom du fichier
  const regex = new RegExp(`^${id}-`)

  files.forEach((filename) => {
    if (regex.test(filename)) {
      const filePath = path.join(folderPath, filename)

      // Suppression du fichier correspondant à l'index donné
      fs.unlinkSync(filePath)
    }
  })

  res.status(204).json({ message: "Fichiers supprimés avec succès." })
}
