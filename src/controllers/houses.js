let houses = require('../data/housesData')
const cities = require('../data/citiesData')

exports.getHouses = (req, res) => {
  res.status(200).send(houses)
}

exports.getHouse = (req, res) => {
  const id = req.params.id
  const house = houses.find((house) => house.id == id)

  if (!house) {
    res.status(404).send(`Tak ada data house dengan id ${id}`)
    return false
  }

  res.status(200).send(house)
}

exports.addHouse = (req, res) => {
  let newHouse = req.body
  const city = cities.find((city) => newHouse.cityId == city.id)
  const lastId = houses[houses.length - 1].id

  newHouse = {
    id: lastId + 1,
    ...newHouse,
    city: city,
  }
  delete newHouse.cityId

  houses.push(newHouse)

  res.status(200).send(houses)
}

exports.editHouse = (req, res) => {
  const id = req.params.id
  const editHouse = req.body
  let house = houses.find((house) => house.id == id)

  if (!house) {
    res.status(401).send(`Tak ada data house dengan id ${id}`)
    return false
  }

  house = {
    ...house,
    ...editHouse,
  }

  // handle city
  if (house.cityId && house.cityId !== house.city.id) {
    const city = cities.find((city) => house.cityId == city.id)
    house = {
      ...house,
      city,
    }
    delete house.cityId
  }

  res.status(200).send(house)
}

exports.deleteHouse = (req, res) => {
  const id = req.params.id
  const newHouses = houses.filter((house) => house.id != id)

  houses = newHouses

  res.status(200).send({ id })
}
