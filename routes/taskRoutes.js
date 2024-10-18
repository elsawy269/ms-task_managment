const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');
const authenticateToken = require('../middlware/authMiddleware')
const authorizeRoles = require('../middlware/authorizeRoles');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management operations
 */

/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []  # Assuming you're using Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: A detailed description of the task
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: The deadline for the task
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 default: medium
 *                 description: The priority level of the task
 *               category:
 *                 type: string
 *                 description: The category of the task
 *               collaborators:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The IDs of collaborators on the task
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */

// Route to create a new task
  
router.post('/create',authenticateToken, TaskController.createTask);
/**
 * @swagger
 * /api/tasks/get:
 *   get:
 *     summary: Retrieve tasks with optional filters
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []  # Assuming you're using Bearer token for authentication
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: The page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: The number of tasks to return per page
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: sortBy
 *         in: query
 *         required: false
 *         description: The field to sort by (e.g., title, createdAt)
 *         schema:
 *           type: string
 *           example: createdAt
 *       - name: order
 *         in: query
 *         required: false
 *         description: The order of sorting (asc or desc)
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: asc
 *    
 *   
 *     responses:
 *       200:
 *         description: A list of tasks matching the filters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The task ID
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   deadline:
 *                     type: string
 *                     format: date-time
 *                   priority:
 *                     type: string
 *                   category:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   collaborators:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
// Route to get all tasks for a user
router.get('/get',authenticateToken, TaskController.getTasks);


/**
 * @swagger
 * /api/tasks/get/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                 priority:
 *                   type: string
 *                 category:
 *                   type: string
 *                 status:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *                 collaborators:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Task not found
 */

// Route to get a task by ID
 
router.get('/get/:id',authenticateToken, TaskController.getTaskById);

/**
 * @swagger
 * /api/tasks/update/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               category:
 *                 type: string
 *               status:
 *                 type: boolean
 *               collaborators:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */

// Route to update a task
router.put('/update/:id',authenticateToken, TaskController.updateTask);


/**
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
// Route to delete a task
router.delete('/delete/:id', authenticateToken,authorizeRoles('admin'), TaskController.deleteTask);

module.exports = router;
