const Task = require('../models/task.model');
const TaskService = require('../utils/taskService');

jest.mock('../models/task.model'); // Mock the Task model

describe('TaskService', () => {
  
  // Test createTask
  describe('createTask', () => {
    it('should create a new task', async () => {
      const mockTaskData = { title: 'Test Task', userId: '123', deadline: new Date() };
      const mockTaskInstance = { ...mockTaskData, save: jest.fn().mockResolvedValue(mockTaskData) };

      Task.mockImplementation(() => mockTaskInstance); // Mock Task constructor

      const result = await TaskService.createTask(mockTaskData);

      // expect(result).toEqual(mockTaskData);
      expect(mockTaskInstance.save).toHaveBeenCalled();
    });

    it('should throw an error when task creation fails', async () => {
      Task.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Save failed')),
      }));

      await expect(TaskService.createTask({ title: 'Test Task' }))
        .rejects
        .toThrow('Error saving task: Save failed');
    });
  });

  // Test getTasksByUser
  describe('getTasksByUser', () => {
    it('should fetch all tasks for a specific user with pagination', async () => {
      const mockTasks = [{ title: 'Task 1' }, { title: 'Task 2' }];
      Task.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockTasks),
      });
      Task.countDocuments.mockResolvedValue(20);

      const result = await TaskService.getTasksByUser('123', { page: 1, limit: 10 });

      expect(Task.find).toHaveBeenCalledWith({ userId: '123' });
      expect(result.tasks).toEqual(mockTasks);
      expect(result.pagination.totalTasks).toBe(20);
      expect(result.pagination.totalPages).toBe(2);
    });

    it('should throw an error when fetching tasks fails', async () => {
      Task.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockRejectedValue(new Error('Find failed')),
      });

      await expect(TaskService.getTasksByUser('123', {}))
        .rejects
        .toThrow('Error fetching tasks');
    });
  });

  // Test getTaskById
  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const mockTask = { title: 'Test Task', _id: 'taskId' };
      Task.findById.mockResolvedValue(mockTask);

      const result = await TaskService.getTaskById('taskId');

      expect(Task.findById).toHaveBeenCalledWith('taskId');
      expect(result).toEqual(mockTask);
    });

    it('should throw an error if task is not found', async () => {
      Task.findById.mockRejectedValue(new Error('Task not found'));

      await expect(TaskService.getTaskById('invalidId'))
        .rejects
        .toThrow('Task not found');
    });
  });

  // Test updateTask
  describe('updateTask', () => {
    it('should update a task', async () => {
      const mockUpdatedTask = { title: 'Updated Task', _id: 'taskId' };
      Task.findByIdAndUpdate.mockResolvedValue(mockUpdatedTask);

      const result = await TaskService.updateTask('taskId', { title: 'Updated Task' });

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith('taskId', { title: 'Updated Task' }, { new: true });
      expect(result).toEqual(mockUpdatedTask);
    });

    it('should throw an error if task update fails', async () => {
      Task.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

      await expect(TaskService.updateTask('taskId', { title: 'Updated Task' }))
        .rejects
        .toThrow('Error updating task');
    });
  });

  // Test deleteTask
  describe('deleteTask', () => {
    it('should delete a task by ID', async () => {
      Task.findByIdAndDelete.mockResolvedValue(true);

      const result = await TaskService.deleteTask('taskId');

      expect(Task.findByIdAndDelete).toHaveBeenCalledWith('taskId');
      expect(result).toBe(true);
    });

    it('should throw an error if task deletion fails', async () => {
      Task.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

      await expect(TaskService.deleteTask('taskId'))
        .rejects
        .toThrow('Error deleting task');
    });
  });
});
