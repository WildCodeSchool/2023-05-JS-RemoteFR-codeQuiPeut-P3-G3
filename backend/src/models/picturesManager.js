class PicturesManager {
  constructor() {
    this.database = null
  }

  setDatabase(database) {
    this.database = database
  }

  async uploadPicture(file) {
    // console.log("manager : " + file)
    if (!this.database) {
      throw new Error("Database connection not set.")
    }

    const query = `
      INSERT INTO gallery (file_path)
      VALUES (?)
    `

    try {
      // const rootPath = path.resolve(__dirname, "..") // Chemin absolu vers la racine du projet
      // const imagePath = `/uploads/${file.filename}` // Utilisez file.filename ici

      // const uploadPath = path.join(__dirname, `../../uploads/${file.filename}`)
      // await fs.promises.writeFile(uploadPath, file.buffer)

      const [result] = await this.database.execute(query, [file])
      if (result.affectedRows === 1) {
        // console.log(
        //   "Picture uploaded and saved in the database and uploads directory."
        // )
      } else {
        throw new Error("Failed to upload picture and save in the database.")
      }
    } catch (error) {
      throw new Error(`Error uploading picture: ${error.message}`)
    }
  }
}

module.exports = PicturesManager
