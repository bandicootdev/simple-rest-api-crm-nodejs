const Clients = require('../models/Clients')

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
      return res.status(422).json({ ok: false, message: 'Email already exist!' });
    }
    next(err)
  }
}