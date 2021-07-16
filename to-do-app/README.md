# 2-Deux

## A To-do List App

#

![demo](dist/to-do-demo.gif)

Add custom projects and tasks with their own descriptions, due dates, and priority levels. Filter through your tasks via project subfolders, or the already created All Tasks, Today, and This Week subfolders which automatically contain your tasks when added.

Custom subfolders and tasks are stored locally so user inputs are not lost when closing or refreshing browser

## Feautures

### Main Panel

The main panel shows all tasks of the currently selected subfolder.
The main panel header has a delete button that deletes the current subfolder and all tasks within it when clicked.

The nav-bar contians a plus button which when clicked, displays a pop-up for the user to enter their own tasks with custom properties

Each Task has a checkbox for completion, and edit button, a flag icon illustarting priority level, and a delete button. Each task has a name, description, due date, and priority level. When the task is clicked, a dropdown appears with the values displayed.

When the edit button for a task is clicked, a pop-up appears where the users can edit their task properties. Newly edited values for a task also occur for each of the tasks occurences in other subfolders

### Side Panel

The side panel contains three static subfolder: the All Tasks, Today, and This Week subfolders. There is a subfolder for custom projects which the user can add by clicking the add project button.

## Installation

To Work on this project:

Clone this project

```
git clone https://github.com/Tynasello/js-practice/tree/master/to-do-app
```

Install required dependencies

```
npm install
```

To edit JavaScript files work in src/ folder

To update and create distribution files run

```
npm run build
```

## Built With

- Vanilla JavaScript
- HTML5
- CSS3

## Acknowledgments

Inspiration for this project was found while following the tutorials on https://www.theodinproject.com/dashboard and advancing to the https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/todo-list section
