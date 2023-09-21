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
    `module.exports.story = ${JSON.stringify(story, null, 2)};\n`,
    { encoding: "utf-8", flag: "w", EOL: "\n" }
  )

  return res.status(200).json({ message: "Fichier créé avec succès." })
}

/* ============================================================= */

module.exports.putScene = (req, res) => {
  const { idStory, idScene } = req.params
  console.error("enregistrement de ", idStory, " scene ", idScene)
  const sceneContent = req.body
<<<<<<< HEAD
  // console.log(sceneContent)
=======
>>>>>>> dev

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    try {
      const loadedStory = require(filePath)
      const story = loadedStory.story

      if (!story.scenes) {
        story.scenes = []
      }

      if (typeof story.scenes[idScene] === "undefined") {
        console.info("scene non définie")
        story.scenes.push(sceneContent)
        res.send("Scène ajoutée")
      } else {
        console.info("scene modifiée")
        story.scenes[idScene] = sceneContent
        res.send("Scène modifiée")
      }

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

  console.info("creation scene")

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
        fs.writeFileSync(
          filePath,
          `module.exports.story = ${JSON.stringify(story, null, 2)};`
        )
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

<<<<<<< HEAD
module.exports.getHero = (req, res) => {
  const { idStory, idScene } = req.params
  console.info("Get scene => id story : ", idStory, "id scene : ", idScene)
=======
/* ============================================================= */
/* ========================= ASSETS ============================ */
/* ============================================================= */

module.exports.addHero = (req, res) => {
  const { idStory } = req.params
  const data = req.body

  console.info("creation scene")
>>>>>>> dev

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
<<<<<<< HEAD
    const { story } = require(filePath)

    if (idScene >= 0 && idScene < story.scenes.length) {
      const scene = story.scenes[idScene]
      res.json({ nbScenes: story.scenes.length, scene, id: idScene })
    } else {
      return res
        .status(400)
        .json({ error: "L'index de la scène est invalide." })
=======
    try {
      const loadedStory = require(filePath)
      const story = loadedStory.story

      //
      if (!story.heroes) {
        story.heroes = []
      }

      //

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
>>>>>>> dev
    }
  } else {
    return res.status(400).json({ error: "Le fichier n'existe pas." })
  }
}
<<<<<<< HEAD
=======

/* ============================================================= */

module.exports.deleteHero = (req, res, next) => {
  const { idStory, idHero } = req.params
  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    try {
      const loadedStory = require(filePath)
      const story = loadedStory.story

      if (story.heroes.length > 0) {
        story.heroes.splice(idHero, 1)

        // Écrire le contenu dans le fichier
        fs.writeFileSync(
          filePath,
          `module.exports.story = ${JSON.stringify(story, null, 2)};`
        )
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

/* ============================================================= */

module.exports.getHeroes = (req, res) => {
  const { idStory } = req.params
  console.info("Get hero => id story : ")

  const filePath = findPath(idStory)

  if (fs.existsSync(filePath)) {
    const loadedStory = require(filePath)
    const heroes = loadedStory.story.heroes
    return res.status(200).json(heroes)
  } else {
    return res.status(400).json({
      error: "Le fichier n'existe pas ou l'index de la scène est invalide.",
    })
  }
}
>>>>>>> dev
