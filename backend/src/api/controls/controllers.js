const fs = require("fs")
const path = require("path")

/* ============================================================= */

const findPath = (idStory) => {
  // Pointe ver le dossier des stories
  const folderPath = path.join(__dirname, "../", "stories")
  const files = fs.readdirSync(folderPath)

  const regex = new RegExp(`^${idStory}-`)

  // Parcourir les fichiers pour trouver le chemin correspondant
  for (const filename of files) {
    if (regex.test(filename)) {
      const filePath = path.join(folderPath, filename)
      return filePath
    }
  }

  return null
}

const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), {
    encoding: "utf-8",
    flag: "w",
    EOL: "\n",
  })
}

/* ============================================================= */

module.exports.getStory = (req, res) => {
  const { idStory } = req.params.filename

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    const { story } = require(filePath)

    res.json(story)
  } else {
    res.status(404).json({ error: "Story not found" })
  }
}

/* ============================================================= */

module.exports.getScene = (req, res) => {
  const { idStory, idScene } = req.params
  console.info("Get scene => id story : ", idStory, "id scene : ", idScene)

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    const { story } = require(filePath)

    if (idScene >= 0 && idScene < story.scenes.length) {
      const scene = story.scenes[idScene]
      res.json({ nbScenes: story.scenes.length, scene, id: idScene })
    } else {
      return res
        .status(400)
        .json({ error: "L'index de la scène est invalide." })
    }
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}

/* ============================================================= */
// MAJ
module.exports.createStory = (req, res) => {
  const { insertId } = req
  const { title } = req.body

  console.log("insert id : ", insertId)

  const titleFormatted = title.trim().replace(/\s+/g, "_")

  const filename = insertId + "-" + titleFormatted
  const filePath = path.join(__dirname, "../", "stories", `${filename}.json`)

  if (fs.existsSync(filePath)) {
    return res.status(400).json({ error: "Le fichier existe déjà." })
  }

  const modeleFilePath = path.join(__dirname, "model.js")

  const { story } = require(modeleFilePath)

  fs.writeFileSync(filePath, JSON.stringify({ story }, null, 2), {
    encoding: "utf-8",
    flag: "w",
    EOL: "\n",
  })

  return res.status(200).json({ message: "Fichier créé avec succès." })
}

/* ============================================================= */

module.exports.putScene = (req, res) => {
  const { idStory, idScene } = req.params
  const sceneContent = req.body

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    try {
      const loadedData = require(filePath)
      const story = loadedData.story || {} // Accédez directement à loadedData.story

      if (!story.scenes) {
        story.scenes = []
      }

      if (
        typeof story.scenes[idScene] === "undefined" ||
        !story.scenes[idScene]
      ) {
        console.info("scene non définie")
        story.scenes.push(sceneContent)
        res.send("Scène ajoutée")
      } else {
        console.info("scene modifiée")
        story.scenes[idScene] = sceneContent
        res.send("Scène modifiée")
      }

      // Écrire le contenu dans le fichier
      writeJsonFile(filePath, loadedData) // Utilisez loadedData pour écrire le fichier correctement
    } catch (error) {
      console.error("Erreur lors du chargement du fichier :", error)
      return res
        .status(500)
        .json({ error: "Erreur lors du chargement du fichier." })
    }
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}

/* ============================================================= */

module.exports.deleteStory = (req, res) => {
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
/* ============================================================= */

module.exports.createScene = (req, res) => {
  const { idStory } = req.params

  console.info("creation scene, id story :", idStory)

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    try {
      const loadedStory = require(filePath)
      const story = loadedStory.story

      if (story.scenes.length > 0) {
        const prevSceneContent = story.scenes[story.scenes.length - 1]

        story.scenes.push(prevSceneContent)
        res.json({
          status: "Scène ajoutée",
          indexScene: story.scenes.length,
          content: story.scenes[story.scenes.length - 1],
        })
      }

      // Écrire le contenu dans le fichier
      writeJsonFile(filePath, { story })
    } catch (error) {
      console.error("Erreur lors du chargement du fichier :", error)
      return res
        .status(500)
        .json({ error: "Erreur lors du chargement du fichier." })
    }
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}
/* ============================================================= */

module.exports.deleteScene = (req, res, next) => {
  const { idStory, idScene } = req.params

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    try {
      const loadedStory = require(filePath)
      const story = loadedStory.story

      if (story.scenes.length > 0) {
        story.scenes.splice(idScene, 1)

        // Écrire le contenu dans le fichier
        writeJsonFile(filePath, { story })
        next()
      }
    } catch (error) {
      console.error("Erreur lors du chargement du fichier :", error)
      return res.status(500).json({ error: "Erreur lors de la suppression." })
    }
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}

module.exports.getHero = (req, res) => {
  const { idStory, idScene } = req.params
  console.info("Get scene => id story : ", idStory, "id scene : ", idScene)

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    try {
      const loadedStory = require(filePath)
      const story = loadedStory.story

      //
      if (!story.heroes) {
        story.heroes = []
      }

      //

      // eslint-disable-next-line no-undef
      story.heroes.push(data)
      res.json({
        content: story.heroes[story.heroes.length - 1],
      })

      // Écrire le contenu dans le fichier
      fs.writeFileSync(
        filePath,
        `module.exports.story = ${JSON.stringify(story, null, 2)};`
      )
    } catch (error) {
      console.error("Erreur lors du chargement du fichier :", error)
      return res
        .status(500)
        .json({ error: "Erreur lors du chargement du fichier." })
    }
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}

/* ============================================================= */
// const fs = require('fs');
// const { findPath } = require('./util'); // Assurez-vous d'importer correctement votre fonction findPath

module.exports.deleteHero = (req, res, next) => {
  const { storyId, idHero } = req.params
  const filePath = findPath(storyId)

  if (fs.existsSync(filePath)) {
    try {
      const loadedData = require(filePath)
      const story = loadedData.story || {}

      if (
        story.heroes &&
        story.heroes.length > 0 &&
        idHero < story.heroes.length
      ) {
        story.heroes.splice(idHero, 1)

        // Écrire le contenu dans le fichier
        fs.writeFileSync(filePath, JSON.stringify(loadedData, null, 2))

        next()
      } else {
        return res.status(404).json({ error: "Héros non trouvé." })
      }
    } catch (error) {
      console.error("Erreur lors du chargement du fichier :", error)
      return res.status(500).json({ error: "Erreur lors de la suppression." })
    }
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}

/* ============================================================= */

module.exports.getHeroes = (req, res) => {
  // console.log("get heroes")
  const { storyId } = req.params
  console.info("Get hero => id story : ", storyId)

  const filePath = findPath(storyId)

  // console.log(filePath)
  if (fs.existsSync(filePath)) {
    const loadedStory = require(filePath)
    const heroes = loadedStory.story.heroes
    // console.log(heroes)
    return res.status(200).json(heroes)
  } else {
    return res.status(400).json({
      error: "Le fichier n'existe pas ou l'index de la scène est invalide.",
    })
  }
}

module.exports.addHero = (req, res) => {
  const { idStory } = req.params
  const data = req.body

  console.info("Création de héros")

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    try {
      const loadedData = require(filePath)
      const story = loadedData.story || {}

      // Si la propriété heroes n'existe pas, initialisez-la comme un tableau vide
      story.heroes = story.heroes || []

      story.heroes.push(data)

      // Écrire le contenu dans le fichier
      fs.writeFileSync(filePath, JSON.stringify(loadedData, null, 2))

      res.json({
        content: story.heroes[story.heroes.length - 1],
      })
    } catch (error) {
      console.error("Erreur lors du chargement du fichier :", error)
      return res
        .status(500)
        .json({ error: "Erreur lors du chargement du fichier." })
    }
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}
