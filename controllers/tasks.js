const Column = require('../models/column');
const Task = require('../models/task');

module.exports.renderIndex = async (req, res) => {
    try {
        const userId = req.user.id;

        const columns = await Column.findAll({
            where: {
                UserId: userId,
            },
        });

        const tasks = await Task.findAll({
            where: {
                UserId: userId,
            },
        });

        res.render('tasks/index', { columns, tasks });
    } catch (error) {
        console.error('Error rendering index:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.createColumn = async (req, res) => {
    try {
        const userId = req.user.id;

        const { name } = req.body;

        await Column.create({
            name,
            UserId: userId,
        });

        // Redirect to the same page where columns are displayed
        res.redirect('/index');
    } catch (error) {
        console.error('Error creating column:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.createTask = async (req, res) => {
    try {
        const userId = req.user.id;

        const { name, description, date, ColumnId } = req.body;

        // Retrieve the column name based on the provided ColumnId
        const column = await Column.findOne({
            where: {
                id: ColumnId,
                UserId: userId,
            },
        });

        if (!column) {
            return res.status(404).json({ error: 'Column not found' });
        }

        const newTask = await Task.create({
            name,
            description,
            status: column.name, // Set the status to the name of the column
            date,
            UserId: userId,
            ColumnId,
        });

        // Redirect to the same page where tasks are displayed
        res.redirect('/index');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Find the task by ID
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Delete the task
        await task.destroy();
        req.flash('success', "successfuly deleted taks!");
        res.redirect('/index')

    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports.deleteColumn = async (req, res) => {
    try {
        console.log(req.params);
        const columnId = req.params.columnId;


        // Check if there are tasks associated with the column
        const tasksInColumn = await Task.findAll({
            where: {
                ColumnId: columnId,
            },
        });

        if (tasksInColumn.length > 0) {
            req.flash('error', 'You cannot delete a column with tasks!');
            return res.redirect('/index');
        }

        // Find the column by ID
        const column = await Column.findByPk(columnId);

        if (!column) {
            return res.status(404).json({ error: 'Column not found' });
        }

        // Delete the column
        await column.destroy();
        req.flash('success', 'Column deleted!');
        res.redirect('/index');
    } catch (error) {
        console.error('Error deleting column:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.updateTaskColumn = async (req, res) => {
    try {
        const { taskId, columnId } = req.params;

        // Find the task by ID
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Find the column by ID
        const column = await Column.findByPk(columnId);

        if (!column) {
            return res.status(404).json({ error: 'Column not found' });
        }

        // Update the ColumnId and status
        task.ColumnId = columnId;
        task.status = column.name; // Assuming column.name is the status value
        await task.save();

        res.status(200).json({ message: 'Task column updated successfully' });
    } catch (error) {
        console.error('Error updating task column:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
