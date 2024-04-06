// Import Task model
const Task = require('../models/Task');

/**
 * This file contains tests for the API endpoints.
 * 
 * @module APITest
 *
 */
describe('PATCH /tasks/:taskId', () => {
    it('update isCompleted field of a task to true', async () => {
        const task = await Task.create({ text: 'Test task', isCompleted: false });

        const response = await request(app)
            .patch(`/tasks/${task._id}`)
            .send({ isCompleted: true });

        expect(response.status).to.equal(200);

        const updatedTask = await Task.findById(task._id);
        expect(updatedTask.isCompleted).to.be.true;
    });

    it('return 404 if task is not found', async () => {
        const response = await request(app)
            .patch('/tasks/invalidTaskId')
            .send({ isCompleted: true });

        expect(response.status).to.equal(404);
    });
});
