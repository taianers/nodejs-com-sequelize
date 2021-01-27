const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    // Encontrar todos usuários que tem email que termina com @estudante.com
    // Desses usuários eu quero buscar todos que moram no Alojamento
    // Desses usuários eu quero buscar as tecnologias que começam com Flutter

    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@estudate.com'
        }
      },
      include: [
        { 
          association: 'addresses', 
          where: { 
            street: 'Alojamento'
          } 
        },
        { 
          association: 'techs', 
          required: false,
          where: {
            name: {
              [Op.iLike]: 'Flutter%'
            }
          }
        },
      ]
    })

    return res.json(users);
  }
};