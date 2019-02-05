const animals = require('./animals/index');

module.exports = function (app) {
    app.get('/animals', animals.getAnimals);
    app.get('/animals/:id', animals.getAnimalById);
    app.get('/search/:id', animals.getAnimalByRfid);
    app.post('/animals', animals.createOrUpdateAnimal)
}