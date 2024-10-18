const TaskService = require('../utils/taskService');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const TaskController = {
    // Create a new task
    createTask: async (req, res) => {
        console.log('Incoming request headers:', req.headers);
        console.log('User from JWT:', req.user);

        try {
            const { title, description, deadline, priority, category, collaborators } = req.body;

            const taskData = {
                title,
                description,
                deadline,
                priority,
                category,
                userId: req.user.userId, // Assign userId from JWT (task creator)
                collaborators // Array of collaborator user IDs
            };

            // Create the task using the TaskService
            const task = await TaskService.createTask(taskData);

            // Send a success response
            res.status(201).json({ success: true, data: task });
        } catch (error) {
            console.error("Error creating task:", error);
            res.status(500).json({ success: false, message: error.message || 'Error creating task' });
        }
    },


    // Get all tasks for the logged-in user
    getTasks: async (req, res) => {
        try {
            const { page, limit, sortBy, order } = req.query;
            var user = req.user;
            // Fetch tasks with pagination, sorting, and filtering
            const { tasks, pagination } = await TaskService.getTasksByUser(user.role.toString().toLowerCase() == 'regular' ? user.userId : null, {
                page,
                limit,
                sortBy,
                order,
            });

            res.status(200).json({
                success: true,
                data: tasks,
                pagination,
                message: 'Tasks retrieved successfully.'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Get a single task by its ID
    getTaskById: async (req, res) => {
        try {
            const taskId = req.params.id;
            const key = "task" + taskId;
            const cachedData = myCache.get(key);
            if (cachedData) {
                console.log("returnFormCash")
                return  res.status(200).json({ success: true, data: cachedData });
            }
            const task = await TaskService.getTaskById(taskId);
            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            myCache.set(key, task, 600); // Cache for 10 minutes
            res.status(200).json({ success: true, data: task });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Update a task

    updateTask: async (req, res) => {
        try {
            const taskId = req.params.id;
            const updateData = req.body;
            const task = await TaskService.getTaskById(taskId);

            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }

            const userId = req.user.userId; // Ensure userId is extracted correctly
            const taskUserId = task.userId ? task.userId.toString() : null;
            const taskCollaborators = Array.isArray(task.collaborators) ? task.collaborators.map(id => id.toString()) : [];

            const isOwner = taskUserId === userId;
            const isCollaborator = taskCollaborators.includes(userId);


            if (!isOwner && !isCollaborator) {
                return res.status(403).json({ success: false, message: 'You do not have permission to update this task' });
            }

            const updatedTask = await TaskService.updateTask(taskId, updateData);
            if (!updatedTask) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }

            // update-cach
            const key = "task" + taskId;
            myCache.del(key);

            res.status(200).json({ success: true, data: updatedTask });
        } catch (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },



    // Delete a task
    // Delete a task
    deleteTask: async (req, res) => {
        try {
            const taskId = req.params.id;
            const user = req.user; // The authenticated user


            // Admin can delete any task
            if (user.role.toString().toLowerCase() === 'admin') {
                console.log('admin attempting to delete task.'); // Debugging line
                const deletedTask = await TaskService.deleteTask(taskId);
                if (!deletedTask) {
                    return res.status(404).json({ success: false, message: 'Task not found' });
                }
                return res.status(200).json({ success: true, message: 'Task deleted successfully' });
            }

            // Regular users can only delete their own tasks
            console.log('Regular user attempting to delete task:', user.userId); // Debugging line
            const task = await TaskService.getTaskById(taskId);
            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }

            if (task.userId.toString() !== user.userId.toString()) {
                return res.status(403).json({ success: false, message: 'Forbidden: You do not have permission to delete this task.' });
            }

            const deletedTask = await TaskService.deleteTask(taskId);
            if (!deletedTask) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }

            res.status(200).json({ success: true, message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }



};

module.exports = TaskController;
