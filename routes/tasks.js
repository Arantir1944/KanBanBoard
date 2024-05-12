const express = require('express');
const router = express.Router();
const tasks = require('../controllers/tasks');
const middleware = require('../utils/middleware');

router.route('/index')
    .get(middleware.isAuthenticated, tasks.renderIndex)
    .post(middleware.isAuthenticated, middleware.isAuthenticated, tasks.createColumn)
router.route('/index/:columnId')
    .delete(middleware.isAuthenticated, tasks.deleteColumn)

router.route('/new')
    .post(middleware.isAuthenticated, tasks.createTask)
router.route('/delete/:taskId')
    .delete(middleware.isAuthenticated, tasks.deleteTask)
router.put('/updateTaskColumn/:taskId/:columnId', middleware.isAuthenticated, tasks.updateTaskColumn);

module.exports = router;