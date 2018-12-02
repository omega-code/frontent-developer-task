import delay from './delay';
import {v4} from 'uuid';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const tasks = [
  {
    id: v4(),
    name: 'task 1',
    timeAmount: 0,
    isRunning: false,
    isSelected: false,
    lastRunTime: new Date('2018-12-02T10:00:00'),
    createdAt: new Date('2018-12-02T10:00:00'),
    startsAt: null,
    endsAt: null
  },
  {
    id: v4(),
    name: 'task 2',
    timeAmount: 0,
    isRunning: false,
    isSelected: false,
    lastRunTime: new Date('2018-12-02T11:00:00'),
    createdAt: new Date('2018-12-02T11:00:00'),
    startsAt: null,
    endsAt: null
  },
  {
    id: v4(),
    name: 'task 3',
    timeAmount: 0,
    isRunning: false,
    isSelected: false,
    lastRunTime: new Date('2018-12-02T12:00:00'),
    createdAt: new Date('2018-12-02T12:00:00'),
    startsAt: null,
    endsAt: null
  }
];

const generateId = (task) => {
  return v4();
};

class TaskApi {
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], tasks));
      }, delay);
    });
  }

  static saveTask(task) {
	task = Object.assign({}, task);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTaskNameLength = 3;
        if (task.name.length < minTaskNameLength) {
          reject(`Task Name must be at least ${minTaskNameLength} characters.`);
        }

        if (task.id) {
          const existingTaskIndex = tasks.findIndex(a => a.id == task.id);
          tasks.splice(existingTaskIndex, 1, task);
        } else {
          // Just simulating creation here.
          task.id = generateId(task);
          tasks.push(task);
        }

        resolve(task);
      }, delay);
    });
  }

  static deleteTask(taskId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTaskToDelete = tasks.findIndex(task => {
          task.id == taskId;
        });
        tasks.splice(indexOfTaskToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TaskApi;
