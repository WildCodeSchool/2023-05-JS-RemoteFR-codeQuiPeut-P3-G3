require("dotenv").config()

const mysql = require("mysql2/promise")

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  )
})

// declare and fill models: that's where you should register your own managers

const models = {}

const ChaptersManager = require("./ChaptersManager")
const ChoicesManager = require("./ChoicesManager")
const ConsomablesManager = require("./ConsomablesManager")
const EnemiesManager = require("./EnemiesManager")
const HeroesManager = require("./HeroesManager")
const InventoryManager = require("./InventoryManager")
const SaveManager = require("./SaveManager")
const ShopManager = require("./ShopManager")
const StoriesManager = require("./StoriesManager")
const UsersManager = require("./UsersManager")
const WeaponsManager = require("./WeaponsManager")

models.chapters = new ChaptersManager()
models.chapters.setDatabase(pool)

models.choices = new ChoicesManager()
models.choices.setDatabase(pool)

models.consomables = new ConsomablesManager()
models.consomables.setDatabase(pool)

models.enemies = new EnemiesManager()
models.enemies.setDatabase(pool)

models.heroes = new HeroesManager()
models.heroes.setDatabase(pool)

models.inventory = new InventoryManager()
models.inventory.setDatabase(pool)

models.save = new SaveManager()
models.save.setDatabase(pool)

models.shop = new ShopManager()
models.shop.setDatabase(pool)

models.stories = new StoriesManager()
models.stories.setDatabase(pool)

models.users = new UsersManager()
models.users.setDatabase(pool)

models.weapons = new WeaponsManager()
models.weapons.setDatabase(pool)

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop]
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1)

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    )
  },
}

module.exports = new Proxy(models, handler)
