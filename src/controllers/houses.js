const { House, City } = require('../../models')

exports.getHouses = async (req, res) => {
  try {
    const houses = await House.findAll({
      include: [
        {
          model: City,
          as: 'city',
        },
      ],
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
    })

    res.send({
      status: 'success',
      message: 'resources has successfully get',
      data: houses,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.getHouse = async (req, res) => {
  const id = req.params.id
  try {
    let house = await House.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: City,
          as: 'city',
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
        },
      ],
      attributes: {
        exclude: ['created_at', 'updated_at', 'city_id'],
      },
    })

    // change amenities type, so it fits in frontend
    house = JSON.parse(JSON.stringify(house))
    house = {
      ...house,
      amenities: house.amenities.split(','),
    }

    res.send({
      status: 'success',
      message: 'resource has successfully get',
      data: house,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.addHouse = async (req, res) => {
  let houseData = req.body
  // change amenities type, so it fits in database
  houseData = {
    ...houseData,
    amenities: houseData.amenities.join(),
    created_at: new Date(),
    updated_at: new Date(),
  }

  try {
    let house = await House.create(houseData)

    house = await House.findOne({
      where: {
        id: house.id,
      },
      include: [
        {
          model: City,
          as: 'city',
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
        },
      ],
      attributes: {
        exclude: ['created_at', 'updated_at', 'city_id'],
      },
    })

    // change amenities type, so it fits in frontend
    house = JSON.parse(JSON.stringify(house))
    house = {
      ...house,
      amenities: house.amenities.split(','),
    }

    res.send({
      status: 'success',
      message: 'resource has successfully added',
      data: house,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.editHouse = async (req, res) => {
  const id = req.params.id

  try {
    await House.update(req.body, {
      where: {
        id,
      },
    })

    const house = await House.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
    })

    res.send({
      status: 'successs',
      message: 'resource has successfully deleted',
      data: house,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.deleteHouse = async (req, res) => {
  const id = req.params.id

  try {
    await House.destroy({
      where: {
        id,
      },
    })

    res.send({
      status: 'successs',
      message: 'resource has successfully deleted',
      data: {
        id,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}
