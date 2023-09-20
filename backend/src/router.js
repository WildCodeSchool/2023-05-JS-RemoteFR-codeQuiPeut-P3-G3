const express = require("express")
const {
  hashPassword,
  verifyPassword,
  verifyAdminRole,
  verifyToken,
} = require("./auth")
const { validateUser } = require("./validators/userValidator")
const router = express.Router()

const cardControllers = require("./controllers/cardControllers")
const chaptersControllers = require("./controllers/chaptersControllers")
const choicesControllers = require("./controllers/choicesControllers")
const consomablesControllers = require("./controllers/consomablesControllers")
const enemiesControllers = require("./controllers/enemiesControllers")
const heroesControllers = require("./controllers/heroesControllers")
const inventoryControllers = require("./controllers/inventoryControllers")
const saveControllers = require("./controllers/saveControllers")
const shopControllers = require("./controllers/shopControllers")
const storiesControllers = require("./controllers/storiesControllers")
const usersControllers = require("./controllers/usersControllers")
const weaponsControllers = require("./controllers/weaponsControllers")

/* test images */
const picturesControllers = require("./controllers/picturesControllers")

const {
  getScene,
  createStory,
  putScene,
  deleteScene,
  createScene,
  deleteStory,
} = require("./api/controls/controllers")

router.get("/card", cardControllers.browse)
router.get("/card/:id", cardControllers.read)
router.post("/card", cardControllers.add)
router.put("/card/:id", cardControllers.edit)
router.delete("/card/:id", cardControllers.destroy)

router.get("/chapters", chaptersControllers.browse)
router.get("/chapters/:id", chaptersControllers.read)
router.post("/chapters", chaptersControllers.add)
router.put("/chapters/:id", chaptersControllers.edit)
router.delete("/chapters/:id", chaptersControllers.destroy)

router.get("/choices", choicesControllers.browse)
router.get("/choices/:id", choicesControllers.read)
router.post("/choices", choicesControllers.add)
router.put("/choices/:id", choicesControllers.edit)
router.delete("/choices/:id", choicesControllers.destroy)

router.get("/consomables", consomablesControllers.browse)
router.get("/consomables/:id", consomablesControllers.read)
router.post("/consomables", consomablesControllers.add)
router.put("/consomables/:id", consomablesControllers.edit)
router.delete("/consomables/:id", consomablesControllers.destroy)

router.get("/enemies", enemiesControllers.browse)
router.get("/enemies/:id", enemiesControllers.read)
router.post("/enemies", enemiesControllers.add)
router.put("/enemies/:id", enemiesControllers.edit)
router.delete("/enemies/:id", enemiesControllers.destroy)

router.get("/heroes", heroesControllers.browse)
router.get("/heroes/:id", heroesControllers.read)
router.post("/heroes", heroesControllers.add)
router.put("/heroes/:id", heroesControllers.edit)
router.delete("/heroes/:id", heroesControllers.destroy)

router.get("/inventory", inventoryControllers.browse)
router.get("/inventory/:id", inventoryControllers.read)
router.post("/inventory", inventoryControllers.add)
router.put("/inventory/:id", inventoryControllers.edit)
router.delete("/inventory/:id", inventoryControllers.destroy)

router.get("/save", saveControllers.browse)
router.get("/save/:id", saveControllers.read)
router.post("/save", saveControllers.add)
router.put("/save/:id", saveControllers.edit)
router.delete("/save/:id", saveControllers.destroy)

router.get("/shop", shopControllers.browse)
router.get("/shop/:id", shopControllers.read)
router.post("/shop", shopControllers.add)
router.put("/shop/:id", shopControllers.edit)
router.delete("/shop/:id", shopControllers.destroy)

router.get("/stories", storiesControllers.browse)
router.get("/stories/:id/:scene?", storiesControllers.read)
router.post("/stories", storiesControllers.add, createStory)
router.put("/stories/:id/:scene?", storiesControllers.edit)
router.delete("/stories/:id", storiesControllers.destroy, deleteStory)
router.put("/deploy/:id", storiesControllers.deploy)

router.get("/users", usersControllers.browse)
router.get("/users/:id", usersControllers.read)
router.post("/users", usersControllers.add)

// TEST EDIT PROFILE
router.put("/users/:id", usersControllers.editProfile)

// router.put("/users/:id", usersControllers.edit)
router.delete("/users/:id", usersControllers.destroy)
router.post("/signup", hashPassword, validateUser, usersControllers.add)
router.post("/login", usersControllers.findByMail, verifyPassword)

router.get("/weapons", weaponsControllers.browse)
router.get("/weapons/:id", weaponsControllers.read)
router.post("/weapons", weaponsControllers.add)
router.put("/weapons/:id", weaponsControllers.edit)
router.delete("/weapons/:id", weaponsControllers.destroy)

// Test admin route
router.get("/admin", verifyToken, verifyAdminRole)

/* Test images files */
router.post("/addPicture/:filename", picturesControllers.add)
router.delete("/deletePicture/:id", picturesControllers.destroy)
router.get("/displayAllPictures", picturesControllers.browse)

// router.get("/api-stories/:idStory/:idScene", getStory)
router.get("/api-stories/:idStory/:idScene", getScene)
router.post("/api-stories/:filename", createStory)
router.post("/api-stories/createScene/:idStory", createScene)
router.put("/api-stories/:idStory/:idScene", putScene)
router.delete("/api-stories/:idStory/:idScene", deleteScene, getScene)

router.put("/users/:id", usersControllers.editProfile)

module.exports = router
