const Task = require('..//models/task.model'); // Import the Task model
const logger = require('../Config/logger'); // Adjust the path as necessary

const TaskService = {
    // Create a new task
    createTask: async (taskData) => {
        try {
            const newTask = new Task(taskData); // The taskData should now include userId
            await newTask.save(); // Save the task to MongoDB
            return newTask;
        } catch (error) {
            logger.error('Error saving task', error);
            throw new Error('Error saving task: ' + error.message); // Provide detailed error message
        }
    },

    // Fetch all tasks for a specific user
    getTasksByUser: async (userId, { page = 1, limit = 10, sortBy = 'deadline', order = 'asc' }) => {
        try {
            // Convert pagination parameters to numbers
            const pageNumber = parseInt(page, 10);
            const pageSize = parseInt(limit, 10);

            // Build query object
            var query={};
            if(userId){
                query.userId = userId;
            }

            // Sort direction
            const sortOrder = order === 'desc' ? -1 : 1;

            // Fetch tasks with pagination, sorting, and filtering
            const tasks = await Task.find(query)
                .sort({ [sortBy]: sortOrder })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);

            // Count total number of tasks for pagination
            const totalTasks = await Task.countDocuments(query);

            return {
                tasks,
                pagination: {
                    page: pageNumber,
                    limit: pageSize,
                    totalTasks,
                    totalPages: Math.ceil(totalTasks / pageSize),
                }
            };
        } catch (error) {
            logger.error('Error fetching tasks:', error);
            throw new Error('Error fetching tasks');
        }
    },

    // Fetch a single task by ID
    getTaskById: async (taskId) => {
        try {
            return await Task.findById(taskId);
        } catch (error) {
            logger.error('Task not found:', error);
            throw new Error('Task not found');
        }
    },

    // Update a task
    updateTask: async (taskId, updateData) => {
        try {
            logger.info('Updating Task:', { taskId, updateData });
            const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
            logger.info('Updated Task:', updatedTask);
            return updatedTask;
        } catch (error) {
            logger.error('Error updating task:', error);
            throw new Error('Error updating task');
        }
    },

    // Delete a task
    deleteTask: async (taskId) => {
        try {
            return await Task.findByIdAndDelete(taskId);
        } catch (error) {
            throw new Error('Error deleting task');
        }
    }
};

module.exports = TaskService;
