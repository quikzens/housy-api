const { House, City } = require('../../models')
const { Op } = require('sequelize')
const { lte, like } = Op

exports.getHouses = async (req, res) => {
  const path = process.env.PATH_FILE
  let filters = req.query

  if (filters.hasOwnProperty('below_price')) {
    filters = {
      ...filters,
      price: {
        [lte]: parseInt(filters.below_price),
      },
    }
    delete filters.below_price
  }

  if (filters.hasOwnProperty('amenities')) {
    filters = {
      ...filters,
      amenities: {
        [like]: '%' + filters.amenities + '%',
      },
    }
  }

  try {
    let houses = await House.findAll({
      where: { ...filters },
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

    // change amenities type, so it fits in frontend
    houses = JSON.parse(JSON.stringify(houses))
    houses = houses.map((house) => {
      return {
        ...house,
        amenities: house.amenities.split(','),
        image: house.image ? path + house.image : null,
      }
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
  // if status user is listed as 'tenant', don't let him do this action
  const { statusUser } = req
  if (statusUser === 'tenant') {
    return res.send("Sorry, you're a tenant")
  }

  const path = process.env.PATH_FILE
  let houseData = req.body
  const image = req.files.imageFile[0].filename

  // change amenities type, so it fits in database
  houseData = {
    ...houseData,
    image,
    created_at: new Date(),
    updated_at: new Date(),
  }

  try {
    const checkCity = await City.findOne({
      where: { id: houseData.city_id },
    })
    if (!checkCity) {
      return res.send({
        message: `Tidak ada city dengan id ${houseData.city_id}`,
      })
    }

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
      image: path + image,
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
  // if status user is listed as 'tenant', don't let him do this action
  const { statusUser } = req
  if (statusUser === 'tenant') {
    return res.send("Sorry, you're a tenant")
  }

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
      message: 'resource has successfully updated',
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
  // if status user is listed as 'tenant', don't let him do this action
  const { statusUser } = req
  if (statusUser === 'tenant') {
    return res.send("Sorry, you're a tenant")
  }

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
