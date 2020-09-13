const { Router } = require('express');

const MenuController = require('./controllers/menu');

const routes = Router();

routes.get('/', MenuController.index);
routes.delete('/', MenuController.delete);
routes.get('/new', MenuController.new);
routes.post('/menu', MenuController.save);
routes.get('/menu/:id', MenuController.getById);
routes.get('/menu/:id/edit', MenuController.edit);
routes.post('/menu/:id/edit', MenuController.update);
routes.get('/current', MenuController.getFromNow);

module.exports = routes;