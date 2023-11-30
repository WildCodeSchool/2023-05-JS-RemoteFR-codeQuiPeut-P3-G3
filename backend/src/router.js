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
const shopControllers = require("./controllers/shopControllers")
const storiesControllers = require("./controllers/storiesControllers")
const usersControllers = require("./controllers/usersControllers")
const picturesControllers = require("./controllers/picturesControllers")

const {
  getScene,
  createStory,
  putScene,
  createScene,
  deleteScene,
  deleteStory,
  getHeroes,
  deleteHero,
  addHero,
} = require("./api/controls/controllers")

/* =================== ROUTES PUBLIQUES  ====================== */

router.get("/card", cardControllers.browse)
router.get("/card/:id", cardControllers.read)

router.get("/shopping_card_item", shopControllers.getTotalCart)
router.delete("/shopping_card_item/removeAll", shopControllers.deleteAll)

router.get("/users", usersControllers.browse)
router.get("/users/:id", usersControllers.read)
router.post("/users", usersControllers.add)

router.post("/signup", hashPassword, validateUser, usersControllers.add)
router.post("/login", usersControllers.findByMail, verifyPassword)

router.get("/shop", shopControllers.browse)
router.get("/shop/:id", shopControllers.read)
router.post("/shop", shopControllers.add)
router.put("/shop/:id", shopControllers.edit)
router.delete("/shop/:id", shopControllers.destroy)

/* =================== ROUTES POUR USER  ====================== */

// router.use(["/api-heroes", "/users", "/shop"], verifyToken)

router.get("/api-heroes/:storyId", getHeroes)
router.get("/api-stories/:idStory/:idScene", getScene)

router.put("/users/:id", usersControllers.editProfile)
router.delete("/users/:id", usersControllers.destroy)

router.put("/shop/:id", shopControllers.edit)
router.delete("/shop/:id", shopControllers.destroy)

/* =================== ROUTES ADMIN ====================  */

// router.use(
//   [
//     "/displayAllPictures",
//     "/card",
//     "/stories",
//     "/addPicture",
//     "/deletePicture",
//     "/api-stories",
//     "/api-heroes",
//   ],
//   verifyToken,
//   verifyAdminRole
// )

router.post("/api-stories/createScene/:idStory", createScene)
// Récupération librairie d'images
router.get("/displayAllPictures", picturesControllers.browse)

// Modifications des cartes
router.post("/card", cardControllers.add)
router.put("/card/:id", cardControllers.edit)
router.delete("/card/:id", cardControllers.destroy)

// Lecture et modifications des story
router.get("/stories", storiesControllers.browse)
router.get("/stories/:id/:scene?", storiesControllers.read)
router.post("/stories", storiesControllers.createStoryWithCard, createStory)
router.put("/stories/:id/:scene?", storiesControllers.edit)
router.delete("/stories/:id", storiesControllers.destroy, deleteStory)
router.put("/deploy/:id", storiesControllers.deploy)

// Modifications d'images
router.post("/addPicture/:filename", picturesControllers.add)
router.delete("/deletePicture/:id", picturesControllers.destroy)

// Modifications scenes
router.post("/api-stories/:filename", createStory)

router.put("/api-stories/:idStory/:idScene", putScene)
router.delete("/api-stories/:idStory/:idScene", deleteScene, getScene)

// heroes
router.put("/api-heroes/:idStory", addHero)
router.delete("/api-heroes/:storyId/:idHero", deleteHero, getHeroes)

module.exports = router
