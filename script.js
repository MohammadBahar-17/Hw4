"use strict";

// Initialize tasks from localStorage or set default task
let taskList = JSON.parse(localStorage.getItem("taskList")) || [
  { description: "eating breakfast", isCompleted: false },
];

// Save the task list to localStorage
function storeTasks() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Show all tasks
function listAllTasks() {
  if (taskList.length === 0) {
    console.log("No tasks available.");
    return;
  }
  taskList.forEach((task, index) => {
    console.log(
      `Task ${index + 1}: ${task.description} | Status: ${
        task.isCompleted ? "Completed" : "Pending"
      }`
    );
  });
}

// Create a new task
function createTask(description) {
  taskList.push({ description, isCompleted: false });
  storeTasks();
  console.log(`New task "${description}" added successfully.`);
}

// Mark a task as completed/uncompleted
function toggleCompletion(taskNumber) {
  const task = taskList[taskNumber - 1];
  if (task) {
    task.isCompleted = !task.isCompleted;
    storeTasks();
    console.log(
      `Task ${taskNumber} marked as ${
        task.isCompleted ? "completed" : "pending"
      }.`
    );
  } else {
    console.log("Task not found.");
  }
}

// Delete a task
function deleteTask(taskNumber) {
  if (taskList[taskNumber - 1]) {
    const removedTask = taskList.splice(taskNumber - 1, 1);
    storeTasks();
    console.log(`Task "${removedTask[0].description}" has been deleted.`);
  } else {
    console.log("Task not found.");
  }
}

// Modify task description
function editTask(taskNumber, newDescription) {
  const task = taskList[taskNumber - 1];
  if (task) {
    const oldDescription = task.description;
    task.description = newDescription;
    storeTasks();
    console.log(`Task "${oldDescription}" updated to "${newDescription}".`);
  } else {
    console.log("Task not found.");
  }
}

// Search tasks by keyword
function searchForTask(keyword) {
  const results = taskList.filter((task) =>
    task.description.toLowerCase().includes(keyword.toLowerCase())
  );
  if (results.length > 0) {
    console.log(`Found ${results.length} matching tasks:`);
    results.forEach((task, index) => {
      console.log(
        `Task ${index + 1}: ${task.description} | Status: ${
          task.isCompleted ? "Completed" : "Pending"
        }`
      );
    });
  } else {
    console.log(`No tasks matched your search for "${keyword}".`);
  }
}

// Display the main menu
function showMainMenu() {
  console.log(`
1- Add new task
2- Show all tasks
3- Mark task as complete/incomplete
4- Delete a task
5- Edit a task
6- Search for a task
7- Exit
`);
}

// Main program loop
let userChoice;
do {
  showMainMenu();
  userChoice = parseInt(prompt("Choose an option (1-7): "), 10);

  switch (userChoice) {
    case 1:
      const newTaskDescription = prompt("Enter task description: ");
      createTask(newTaskDescription);
      break;
    case 2:
      listAllTasks();
      break;
    case 3:
      const taskToToggle = parseInt(
        prompt("Enter task number to toggle completion: "),
        10
      );
      toggleCompletion(taskToToggle);
      break;
    case 4:
      const taskToDelete = parseInt(
        prompt("Enter task number to delete: "),
        10
      );
      deleteTask(taskToDelete);
      break;
    case 5:
      const taskToEdit = parseInt(prompt("Enter task number to edit: "), 10);
      const newTaskDescriptionForEdit = prompt("Enter new task description: ");
      editTask(taskToEdit, newTaskDescriptionForEdit);
      break;
    case 6:
      const searchKeyword = prompt("Enter a keyword to search: ");
      searchForTask(searchKeyword);
      break;
    case 7:
      console.log("Exiting Task Manager...");
      break;
    default:
      console.log("Invalid option. Please choose a valid number from 1 to 7.");
  }

  console.log(`You selected option: ${userChoice}`);
} while (userChoice !== 7);
