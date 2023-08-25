const Joi = require("joi")

const userSchema = Joi.object({
  firstname: Joi.string().max(50).required(),
  lastname: Joi.string().max(50).required(),
  mail: Joi.string().email().max(55).required(),
  pseudo: Joi.string().max(50).required(),
})

const validateUser = (req, res, next) => {
  const { firstname, lastname, mail, pseudo } = req.body

  const { error } = userSchema.validate(
    { firstname, lastname, mail, pseudo },

    { abortEarly: false }
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details })
  } else {
    next()
  }
}

module.exports = {
  validateUser,
}
