# frontent-developer-task

Fork this repo and implement the app described below. 

By forking the repo you say "I gonna try this task". 

By creating the pull request back you say "Here's my solution, please make the code review and let me know the result". 


## The Time Tracker 

Your task is to write a simple time tracker. 

![ui-proto](http://content.screencast.com/users/AndreyTS/folders/Jing/media/de514000-7be7-49d0-a846-f1759e9b10c9/2016-09-28_1900.png)

You should be able to: 
- just start the timer; thus a new unnamed task is created, and time is tracked; after stopping the timer, the task goes to the list of tasks below, and can be restarted later by clicking on the 'play' button near its name
- start the timer again, the last run task should be started tracking
- edit the name of currently running task or of any of the tasks in the list


Technologies:
TypeScript, React, Bootstrap, React-Bootstrap, **no JQuery**, 
Use npm+webpack for building.
You can use another tools, such as MobX, but all the code must be typed. It means, no `any`-typed values in the program. So, when using libs, you should use correct typings for them (e.g. `npm install --save-dev @types/react`)    

Here is more formal definition of the requirements: 

```
Task is "some named activity consumed some time from User"

Task has: name, timeAmount, lastRunTime.

TaskList is "the list of all the tasks ever started or created". 

UC1 where Task (a task) is tracked for the first time:
	1. The task name can be provided by User 
	2. The task is started by User, so timeAmount starts being tracked, lastRunTime is updated
	3. The task is stopped by User, timeAmount stops being tracked
	4. The task is added to the TaskList

UC2 where Task (a task) is re-started:
	1. User scrolls the TaskList
	2. The task is started by User, timeAmount starts being tracked, lastRunTime is updated
	3. The task is stopped by User, timeAmount stops being tracked


UC3 where Task (a task) is renamed:
	1. User scrolls the TaskList
	2. User selects the task from the list based on names and timeAmounts. 
		Task can be nameless, but still identifyable by the timeAmount. 
	3. User changes the task name

UC4 where Task (a task) is deleted:
	1. User scrolls the TaskList
	2. User deletes the task

*/Technical Requirements:
TypeScript, React, Bootstrap, both typed, including React-Bootstrap, **no JQuery**, 
Use npm+webpack for building.
You can use another tools, such as MobX, but also typed. 
```

UC1/UI: 

![ui-proto](http://content.screencast.com/users/AndreyTS/folders/Jing/media/de514000-7be7-49d0-a846-f1759e9b10c9/2016-09-28_1900.png)


Hint: you can use the boilerplate from https://github.com/AndreyTsvetkov/react-bootstrap-mobx-ts-webpack   
