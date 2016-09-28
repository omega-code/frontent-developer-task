# frontent-developer-task

Fork this repo and implement the app described below. 

By forking the repo you say "I gonna try this task". 

By creating the pull request back you say "Here's my solution, please make the code review and let me know the result". 


## The Time Tracker 

Task is "some named activity consumed some time from User"
Task has: name, timeAmount, lastRunTime 

Task list is the list of all the tasks ever started or created. 

UC1 where Task (a task) is tracked for the first time:
	1. The task name can be provided by User 
	1. The task is started by User, so timeAmount starts being tracked, lastRunTime is updated
	1. The task is stopped by User, timeAmount stops being tracked
	1. The task is added to the task list

UC2 where Task (a task) is re-started:
	1. User scrolls the task list
	1. The task is started by User, timeAmount starts being tracked, lastRunTime is updated
	1. The task is stopped by User, timeAmount stops being tracked


UC3 where Task (a task) is renamed:
	1. User scrolls the task list
	1. User selects the task from the list based on names and timeAmounts. 
		Task can be nameless, but still identifyable by the timeAmount. 
	1. User changes the task name

UC4 where Task (a task) is deleted:
	1. User scrolls the task list
	1. User deletes the task

UC1/UI: 

![ui-proto](http://screencast.com/t/ZxRUMyLZ)

*/Technical Requirements:
TypeScript, React, Bootstrap, both typed, including React-Bootstrap, no Jquery, webpack-ed.
Can use another tools, such as MobX, but also typed. 

Can use the boilerplate from https://github.com/AndreyTsvetkov/react-bootstrap-mobx-ts-webpack   