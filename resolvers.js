const mongoose = require('mongoose');
const { Film } = require('./models/starWarsModels.js');

module.exports = resolvers = {
  Query: {
    FilmById: async (_, id) => {
      const film = await Film.findById(id);
      return film;
    },
  }
}