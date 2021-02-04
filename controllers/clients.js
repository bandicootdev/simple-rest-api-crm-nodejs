const Clients = require('../models/Clients')

module.exports.getAllClients = async (req, res, next) => {
  try {
    let clients = await Clients.find({}).catch(err => {
      throw err
    })

    if (clients.length === 0) {
      return res.status(204).json({ok: true, message: 'There are no registered customers'})
    }
    res.status(200).json({ok: true, clients})
  } catch (err) {
    next(err)
  }
}

module.exports.getOneClient = async (req, res, next) => {
  try {
    const {id} = req.params
    const client = await Clients.findById(id).catch(err => {
      throw err
    })
    if (!client) {
      return res.status(204).json({ok: true, message: 'non-existent client'})
    }
     res.status(200).json({ok: true, client})
  } catch (err) {
    next(err)
  }
}

module.exports.createClient = async (req, res, next) => {
  try {
    const {name, lastName, company, email, phone} = req.body;
    if (!name || !lastName || !company || !email || !phone || Object.keys(req.body).length === 0) {
      return res.status(400).json({ok: false, message: 'Required fields'})
    }

    const client = new Clients({
      name,
      lastName,
      company,
      email,
      phone
    });

    await client.save().catch(err => {
      throw err
    })
    res.status(200).json({ok: false, message: 'A new client was added successfully'})
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(422).json({ok: false, message: 'Email already exist!'});
    }
    next(err)
  }
}