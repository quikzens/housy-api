const { Image } = require('../../models')

exports.addImages = async (req, res) => {
  // if status user is listed as 'tenant', don't let him do this action
  const { idUser, statusUser } = req
  if (statusUser === 'tenant') {
    return res.send({
      status: 'failed',
      message: "Sorry, you're a tenant",
    })
  }

  const path = process.env.PATH_FILE
  const { id } = req.params
  const { details } = req.files
  const images = []

  details.map((detail) => {
    images.push({
      url: detail.filename,
      houseId: id,
    })
  })

  try {
    images.map((image) => {
      ;(async () => {
        await Image.create(image)
      })()
    })

    res.send({
      status: 'success',
      message: 'images has successfully added',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}
