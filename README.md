# README #


#### Pre-Build ####
designers: Julio Cantu, Kaleb Perez, Kacy Metcalf, Aaron Parks, Shelby Cumings

### Project Name: Hercules ###

### Table of Contents ###
1. General Info
2. Technologies Used
3. Features
4. Screenshots
5. Usage
6. Project Status
7. Room for Improvement
8. Acknowledgements
9. Contact

### General Information ###
The Hercules App is a mobile application developed using React Native and Visual Studio Code. 
It serves as a comprehensive fitness and wellness tool, allowing users to track their workouts, store workout data, visualize their progress, 
monitor nutrition and food intake, and engage in mindfulness activities. This app aims to make fitness and wellness management more convenient and accessible.

## Technologies ##
* React.Native - prebuild
* Javascript - prebuild
* CSS - prebuild
* Firebase - prebuild

### What problem does it (intend to) solve? ###
The Hercules App addresses the need for individuals to have a single platform for tracking their fitness progress, 
managing their nutrition, and practicing mindfulness. It simplifies the process of managing one's health and fitness goals by providing a consolidated solution.

### What is the purpose of your project? ###
The purpose of this project is to create a user-friendly and feature-rich workout and wellness app that enables users to:

- Track workouts throughout the day, week, and month.
- Store workout data for future reference.
- Graph their progress for each workout, including rep and weight ratios.
- Monitor nutrition and food intake with analytics for food nutrition.
- Engage in mindfulness activities such as meditation and water intake tracking.

### Why did you undertake it? ###
We undertook this project to empower individuals to take control of their health and fitness goals by providing them with a versatile tool 
that combines workout tracking, nutrition monitoring, and mindfulness practices.

### Features ###
List of ready features:
- Track workouts throughout the day, week, and month.
- Store workout data for future reference.
- Graphical representation of workout progress, including rep and weight ratios.
- Nutrition tracking with analytics for food nutrition.
- Mindfulness section for tracking meditation and water intake.

### Screenshots ###
Kacy added a screenshot titled "kalebs code.jpg" to the Docs folder to recap the work she did to make it easier to understand how it runs.

### Project Status ###
Project is: In progress.

### Room for Improvement ###
Areas for improvement:
- Integration with wearable fitness devices.
- Enhanced social sharing features.
- Improved user interface and user experience.

### To do: ###
- Create UI for munchies and mind screens
- Create FireBase database to store workouts/nutrution.
- Integrate existing public api for nutritional facts.
- Fix the date to be able to view workouts from a specific day (stored in firebase).


### Acknowledgements ### 
This project was inspired by the need for a comprehensive fitness and wellness app. 
We would like to thank the open-source community and contributors for their valuable resources and support.

### Contacts ###
amp421@txstate.edu
s_c830@txstate.edu
kap222@txstate.edu
### Team Meeting Times ###
Sundays from 4:00-5:00pm

### Road Blocks ###
Kacy was supposed to create the graph and the graph button for the app. However, in order
to see the changes she is making, she needed to use Expo to see the app. Kacy hit a 
road block at this point and after spending several hours of following ChatGPT's instructions
and her teammates' instructions, she was not able to resolve the errors she was getting.
Without being able to see if her code is work, she could not continue with the graphs.
The team has pivoted and will be focusing on resolving roadblocks for the rest of this sprint
and has already started discussing tasks for the next sprint to pick up what we couldn't complete
this time. Dr. Lehr instructed Kacy to update her tasks on Jira so they show the work completed 
and intended to complete rather than the work that was inaccessible due to the road block.

Additionally, Kacy offered to help Aaron resolve the merge conflicts he was experiencing
because he had no prior experience resolving them.

Kacy hit a massive roadblock with not being able to run expo. This made it so she couldn't test
what she was programming. She spent a lot of time trying to resolve it but since other team
members were also struggling, we decided to pivot and cut out expo. Shelby is currently working
on making it possible for our team to run the project without using expo.


### Failed Attempts ###
Kacy tried to create a function for the user to re-order workouts by dragging them but had extensive issues.
Kacy hit a dead end and the team met and decided it was worth scrapping the idea for now to focus on other more important tasks
now that others have done the code necessary for Kacy to get more work done. The error was more specifically that
item was declared but never used (even though it was being used).

### Assisting Teammates ###
Kacy Metcalf is the only team member with experience using GitKraken so she spent several hours helping her 
teammates resolve errors with it and to adjust to the GitKraken user interface. Kacy helped Kaleb who was
having an error whenever he would try to checkout a different branch or delete the branch he was on.
After a lot of extensive trouble shooting, it turned out that the computer needed to be restarted and that
it should have been working to begin with. 
Aaron assisted multiple team members with Expo Go and helped resolve
some debugging issues associated to others code

### Kaleb Perez Sprint 1 ###

In the development of the hercules application, I successfully integrated a bottom navigation bar. This navigation bar serves as a central navigational tool, directing users to different sections of the application. Key features I implemented was the "Workout", "Mind", and "Munchies" screens. On the workout screen, I added functionality so that users can interact with and create dynamically generated buttons that represent different workout "splits". I designed a system where users can add new splits through a modal dialog. After entering the desired split name, a corresponding button is created on the Workout screen. I also set up the main file tree and starting files including all of the files to run the code. I also did the research to figure out how to set up expo and run the app. I spent time with each teamate helping them run it.

### Here are the links for my major commits: ### 
https://bitbucket.org/cs3398f23changelings/hercules/commits/e5f66e1aab94e8d0020eaf189686650d673347e1
https://bitbucket.org/cs3398f23changelings/hercules/commits/c1db86c27f04514ac933852a8297f79c0eab8934
https://bitbucket.org/cs3398f23changelings/hercules/commits/cc7bc55534ec258388004fcc33393e154de3b308
https://bitbucket.org/cs3398f23changelings/hercules/commits/6b30cc91464fa305d65373eb0a36e32f9813567f
https://bitbucket.org/cs3398f23changelings/hercules/commits/45a5103b553be4dbcd5ca23bc82215445ca8d447
https://bitbucket.org/cs3398f23changelings/hercules/commits/2e71a2d008af7643dfbf4c09cebfa5018fda70d4

### Aaron Parks Sprint 1 ###
In the developement of the Hercules app, I was tasked with 3 main features of the workout app. Such as: Creating the Date above the workouts, adding forward and back buttons on the date to choose a close date, and 
creating a calendar drop down to choose a date to view workouts. 
Also aided Kaleb in debugging, and helped other group members set up Expo Go.

### Here are the links for my major commits: ###
https://bitbucket.org/cs3398f23changelings/hercules/commits/b18fe204f219da0ad48060dc4c2f91e0e8487489
https://bitbucket.org/cs3398f23changelings/hercules/commits/21f5ae97db425c9ce2a3352de8e6350021fb957f
https://bitbucket.org/cs3398f23changelings/hercules/commits/0f24dad65fde9a7a3876183275668a461464f664
https://bitbucket.org/cs3398f23changelings/hercules/commits/c4642ff9aca5fb1f87a5c8c6232237785fe86428
https://bitbucket.org/cs3398f23changelings/hercules/commits/c4642ff9aca5fb1f87a5c8c6232237785fe86428

### Julio Cantu Sprint 1 ###
In the developement of the Hercules app, I was tasked with making the login page, setting up user authentication, button functionalities to save data to firebase database, and integrating firebase into the application, and having a database to store information with, I made a sample html code that used firebase authentication and a small ammount of database storage as a testing platform for functionalities and how we wanted the 
Dataabse to be setup, yet I hit a major road block. When trying to integrate firebase database it doesnt seem to want to import propperly after going to many online sources and even the firebase page itself and testing multiple different sollutions, problems arrise either it be not being able to import firebase or the importation of firebase
causes other parts of the code to go awire.
For the first sprint I made branches and pull requests on bitbucket, and gitkracken instead of using jira, but from here on that will be fixed

### Here are the links for my major commits: ###
https://bitbucket.org/cs3398f23changelings/hercules/commits/79c84df252992ce7a7616b0632d7e80b53aa5ac1
https://bitbucket.org/cs3398f23changelings/hercules/commits/fc51b0b596619703aa7f27846b22f1938b532311
https://bitbucket.org/cs3398f23changelings/hercules/commits/2cb61f54bb79e3ddd037f2ad818256b62880b44f
https://bitbucket.org/cs3398f23changelings/hercules/commits/5b7b32380bfc207160336ea632403f78ca3b5d10
https://bitbucket.org/cs3398f23changelings/hercules/commits/ae01e68f6316ba38ad21662ca02c02ed86bde078
https://bitbucket.org/cs3398f23changelings/hercules/commits/f7c3de62c56d29f9069d9a699f16e612b4c003d4


### Kacy Metcalf Sprint 1 ###
In the development of the Hercules app, I was tasked with creating the graph of the workouts and creating the button to generate
more graphs for each individual type of workout. Additionally, I was tasked with researching React Native. Along the way, I hit
a roadblock with running expo. Expo is what allows us to see the mobile app that we are creating. Because it doesn't work on my
phone, I could not see the changes I was making so I was unable to continue working on the graphs since I can't see what I'm 
doing. This work will be continued in Sprint 2. I did devise a plan to have the graph with a button over it and the button be
transparent so that the user just sees the graph. Additionally, I spent a lot of time helping my teammates with GitKraken errors
since I'm the only one with experience using GitKraken. Due to this, I adjusted my tasks accordingly. I also set up a weekly 
meeting time because our team felt it would be beneficial.

### Sprint 2 Goals ###
The next steps for sprint 2 is going to be finishing the front end and back end of our app. We were discussing this as a team and
I will likely be responsible for connecting the front end and back end work. We want to have a much more complete demo ready by 
the end of the second sprint so that the third sprint can be for adding extra features and fixing any bugs that come up.
More specifically, in sprint 2 we will be fixing Expo Go errors and then completing the graphs.

### Here are the links for Kacy's Branches: ###
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-59
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-62
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-66
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-67
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-100
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-101
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-103


### Shelby Cumings Sprint 1 ###
At the beginning of this sprint, although I had 10 hours of tasks assigned, I had sort of added whatever was available that I thought I could do because I wasn't sure what would be helpful or what my teammates would be doing during this sprint. Shortly thereafter, I was thankfully able to get a better idea of what would be helpful to our group and replaced some of my UI/frontend tasks with backend Firebase and Firestore creation/setup/integration that had been overlooked. I was able to set up Firebase and Firestore, but have not yet been able to integrate them with the application so that we can have real-time development models, partially due to a lack of understanding about my teammates' work and how all of our pieces integrate with each other. Hopefully this is very good experience and practice for professional scenarios which may be the same way.

### Tasks: ###
React Native Reserch: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-54

Firebase research: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-91
This branch includes two issues, SCRUM-91 and SCRUM-103. I initially researched firebase, but my research
led me to researching how to include Firestore compatibility in our app, so I researched that as well. I created
a new task in Jira (SCRUM-103) to better reflect my time spent during this sprint.

Basic Exercise Data: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?assignee=63c607e6417bef6fc906ae75&selectedIssue=SCRUM-95
This task does not have a commit/branch because although I initially believed we needed a coded class to store exercises, I have a better understanding of Firebase/Firestore now and instead created this data structure in Firestore.

Photos of Firestore organization and Firebase Setup: https://docs.google.com/document/d/1Lwe-VPmXzECMJ1wqAEnN2HDNPIg67Cmxv9qcbqJ-A8k/edit?usp=sharing

### What went well (or not)? ###
I'm very happy that our team is communicative and I was often able to receive assistance from or help other team members. Personally, I think that my research went very well and I found a lot of resources, but it was difficult to implement them (which is unsurprising). I think my next steps forward are troubleshooting our Firebase deployment as soon as possible.



### Retrospective ###

### What went well (TEAM): ###
-we were able to make significant progress in the UI
-we were able to create and set up firebase and firestore
-we were very good at keeping our work up-to-date with the main branch
-we communicated well as a team and were willing to help each other
### What did not go well(TEAM): ###
-could not fully integrate firebase and firestore into program
-had issues with Expo Go that are still ongoing
-we  were not able to complete all of our tasks because of the previously mentioned errors creating roadblocks
### What Might Be Impeding Us from Performing Better? ###
-Expo Go having issues deploying to see edits in real-time
-Not having a more regular team meeting time from the beginning of the project impeded us because the time in/after class was no sufficient to resolve roadblocks
-current methods/technologies might be feasible but not easiest or best path forward
### What can I do to Improve (Aaron): ###
-I can work on creating branches with every task and making sure that I do pull requests.
-Work on when, where, how I create branches and using the effects of "Tags" to reference other commits.
### What can I do to Improve (Kacy): ###
-I can work on researching Expo Go to help understand what the errors are and help my teammates and I overcome them
### What can I do to improve (Shelby): ###
Now that I have a better idea of my role in the group and what would be helpful in our development process,
I can more effectively organize my time and tasks in a manner that helps my teammates progress in their work.
### What can I do to improve (Kaleb): ###
I could have communicated the ideas I have for the app better and commented on my code so my teamates can read it and know how to extend upon it. I also need to make sure that I approve merge reqests rather than assuming someone else will.
### What can I do to improve (Julio): ###
-I can work on properly branching my tasks and giving them the propper allocated hours as they were severly under estemated. I can also look for different methods if one is taking too long 
for example how firebase integration is taking so long, I can look for other methods to integrate databases.

### SPRINT 2 REVIEW AND RETROSPECTIVE ###

### Kacy Metcalf's Sprint 2 ###
# Sprint 3 Goals #
Next sprint, I will be once again focusing on integrating graphs into the project now that expo works, the UI is set, and the backend runs.
There are graphs for both the workout day and the workout buttons. Making the graphs will require me to work with the front end and backend
and I expect it to be very time consuming to fit all of the pieces together. I currently plan on using the react-native-chart-kit to 
complete these tasks.

My tasks were a little muddled this sprint due to roadblocks. I was unable to complete any of my integration tasks without the front end and
back end being finished so I couldn't work most of this sprint. Dr. Lehr advised I pick up other teammates' tasks which was the turning point
when I started completing work for this project.

### Kacy's Tasks ###
Scrum-102 Resolve Roadblock with Expo
https://cs3398f23changelings.atlassian.net/browse/SCRUM-102 
commit: https://bitbucket.org/cs3398f23changelings/%7Bde7af554-b9f0-4a03-a2b0-3074ff0d0b1c%7D/commits/136ebd9b6ef5d7555755feb40f9fd560b50eb11c

Scrum-115 add ability to move workout up and down on list
https://cs3398f23changelings.atlassian.net/browse/SCRUM-115 
commit: https://bitbucket.org/cs3398f23changelings/%7Bde7af554-b9f0-4a03-a2b0-3074ff0d0b1c%7D/commits/e79cfee705e18f518a256a702df89f2127fbe33c

SCRUM-117 add screen when workout button is clicked
https://cs3398f23changelings.atlassian.net/browse/SCRUM-117
commit: https://bitbucket.org/cs3398f23changelings/%7Bde7af554-b9f0-4a03-a2b0-3074ff0d0b1c%7D/commits/4d4aa120c9117067d1e10dff5fa2efe5efc5d28c
 
SCRUM-122 add button to mind screen to add a new graphical tracker
https://cs3398f23changelings.atlassian.net/browse/SCRUM-122
commit: https://bitbucket.org/cs3398f23changelings/%7Bde7af554-b9f0-4a03-a2b0-3074ff0d0b1c%7D/commits/dec023ec0c9eeec1d44312638fb42757b797a055

SCRUM-123 add drop down screen to ask for input to graphical tracker when clicked
https://cs3398f23changelings.atlassian.net/browse/SCRUM-123
commit: https://bitbucket.org/cs3398f23changelings/%7Bde7af554-b9f0-4a03-a2b0-3074ff0d0b1c%7D/commits/daccccd1eda8fc04c26f157e9eb02f2ebb311694

SCRUM-125 Research integration of firestore
https://cs3398f23changelings.atlassian.net/browse/SCRUM-125
commit: https://bitbucket.org/cs3398f23changelings/%7Bde7af554-b9f0-4a03-a2b0-3074ff0d0b1c%7D/commits/322f37ed1d9f352d66f8f4bf13c145d0a55c5f01

SCRUM-131 add pre made trackers in mind section
https://cs3398f23changelings.atlassian.net/browse/SCRUM-131
commit: https://bitbucket.org/cs3398f23changelings/%7Bde7af554-b9f0-4a03-a2b0-3074ff0d0b1c%7D/commits/f575ab5b45f5002fe3a771755038b91c70dd71a5

SCRUM-156 Studied Workout.js and WorkoutList.js
https://cs3398f23changelings.atlassian.net/browse/SCRUM-156
commit: https://bitbucket.org/cs3398f23changelings/%7Bde7af554-b9f0-4a03-a2b0-3074ff0d0b1c%7D/commits/55f5a2419361fa34bb326cf821721d3c79e8779f

# What Kacy thought went well as a team #
Aaron and Kaleb work well together on the front end. Julio and Shelby got a lot done on the backend. They've been working on it this whole time
but this happened to be when their work paid off. Kacy did well at being a floater/neutral party who could help as needed.

# What Kacy thought did not go well as a team #
There are often extreme lack of understanding and miscommunication. I believe people let their frustrations and own experiences cloud
their ability to understand other's perspectives. We would do much better if we all took a breath and tried to understand the other person. 

# What Kacy thought went well as an individual #
I try very hard to make it known that no one is alone in this project and that we'll figure things out. If I think someone is being skipped over
or the work they done is being minimized I try to speak up for them because that's not cool. I also have told almost every team member at some point 
that I can help them when they vocalize that they are struggling. My offer often is not taken since I often don't know anything about the topic and
am therefore limited in my ability to help, but I try to none-the-less.

# What Kacy thought did not go well as an individual #
When we decided our tasks, I should have had the foresight to realize having all my tasks be dependent on others finishing their work early
was a recipe for disaster. In doing so, I completely blocked myself for well over half of this sprint.

# What Kacy thought impedes in the team #
Not being able to meet each work day to recap what we are doing. There was a lot of miscommunication especially once
we started swapping tasks. This could have been avoided with regular team meetings which is not reasonable as college students.

# What Kacy thinks she can do to improve #
Communicate more when I am stuck to find out if I can help someone else. I only asked one person if they needed help before Dr. Lehr suggested
I take a different person's tasks. Had I communicated more I would have known that even though that person declined, there were still others
I could assist.

### Julio Cantu Sprint 2 ###
In the developement of the Hercules app durring the second sprint, I was first tasked with making the back end for saving data and reading the data yet there was some miscommunication and i was waiting on my tasks until a certain task was done so i could complete mine, and after a while of having the road block and talking my task was switched to local storage, then again to personal user accounts, another issue I was having was that expo would not run on my phone and this wasnt fixed until near the end of the sprint where i was told to use the web version, after such i was able to get my tasks completed. What I have done is revised the app.js to make it look more clean and better support multiple screens so I could make a landing page for the login function for the users, then I went about making the 2 functions "signup and login" where when you sign up it makes your own location in the database for "mind, munchies, and workouts", following that I made it to where the user has to create a "strong password" which must consist of 1 upper and lower case letter, a number, a special character, and must be atleast 8 characters long.

### Here are the links for my major commits: ###


### Shelby Cumings Sprint 2 ###
Much of this sprint was spent troubleshooting our web application in order to make it functional; this took an extremely long time, despite my references to official documentation, ChatGPT, and even contacting an expert in Firebase and ReactNative integration. Unfortunately, in the end, we decided to abandon the idea of Firebase hosting for a website and instead are relying on Expo, as before, for our web application. After this, my tasks were re-evaluated and I began working on our Firestore setup and creating templates and documentation for my teammates on the frontend side of things to use when reading data from Firestore to display in the app. A major issue in this sprint for me is that I failed to initially name my branches with Jira's naming convention for task tracking and making new branches for every task. This was worsened by having to revise my tasks based on how long they actually took me/create new tasks for step-by-step troubleshooting with each individual file. While I attempted to change the names of the branches when able and to add the task identifier to the commit messages, I had major problems with this as well and ended up adding tags to the Git graph and notes in Jira to show where my work is located.

### Tasks: ###
SCRUM-98 Reset project to empty Firebase
- Examined each project file and emptied project of all but essential files
- Created and configured new Firebase project in console
- Acquired configuration info for next task
Jira: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJwIjoiYWRtaW4iLCJpIjoiZmZhMDA4MDg1YWQ3NGRkM2I4Njk3ZTdiYzJkYmU2ODkifQ%3D%3D&cloudId=d4f29c87-9d1e-472e-833b-a50053536073&customFilter=05596667-c06a-494b-bf06-c71f0e686764&selectedIssue=SCRUM-98
Bitbucket: https://bitbucket.org/cs3398f23changelings/hercules/commits/a3a5bfc27384acd9153268392c471340af03472b

SCRUM-106 Add in App.js file to empty Firebase branch
- Added old App.js file into new Firebase branch and modify to integrate with new project
- Implemented Firebase config data, initialized Firebase hosting and Firestore storage
Jira: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJwIjoiYWRtaW4iLCJpIjoiZmZhMDA4MDg1YWQ3NGRkM2I4Njk3ZTdiYzJkYmU2ODkifQ%3D%3D&cloudId=d4f29c87-9d1e-472e-833b-a50053536073&customFilter=05596667-c06a-494b-bf06-c71f0e686764&selectedIssue=SCRUM-106
Bitbucket: https://bitbucket.org/cs3398f23changelings/hercules/commits/66cee211e8eec26b6e26c3ab878c93bcb051cf17

SCRUM-107 Add in index.js file to empty Firebase branch
- Added old index.js file into new Firebase branch and modified it to integrate with new project and modified App.js
Jira: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJwIjoiYWRtaW4iLCJpIjoiZmZhMDA4MDg1YWQ3NGRkM2I4Njk3ZTdiYzJkYmU2ODkifQ%3D%3D&cloudId=d4f29c87-9d1e-472e-833b-a50053536073&customFilter=05596667-c06a-494b-bf06-c71f0e686764&selectedIssue=SCRUM-107
Bitbucket: https://bitbucket.org/cs3398f23changelings/hercules/commits/ffda5881cf7bbbe0d5fbd3a28946b1c3aada0109

SCRUM-149 Make literally anything show up on web version
- Conduct research, read documentation, examine errors, and make modifications to code to make simple "Hello World" display on a local web host
- Included difficulties in configuring index.js, application entry point for web, routing errors within App.js
Jira: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJwIjoiYWRtaW4iLCJpIjoiZmZhMDA4MDg1YWQ3NGRkM2I4Njk3ZTdiYzJkYmU2ODkifQ%3D%3D&cloudId=d4f29c87-9d1e-472e-833b-a50053536073&customFilter=05596667-c06a-494b-bf06-c71f0e686764&selectedIssue=SCRUM-149
**No associated commit because this task was a prerequisite for SCRUM-150 and committed there (see below)
**(I didn't want to create a commit that only displayed "Hello World" in case it caused confusion later)

SCRUM-150 Display old version on web
- Replaced basic Hello World testing file with group-written App.js file
- Examined errors within App.js and troubleshoot (included missing imports, improper references to docs, and modifying directory organization)
Jira: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJwIjoiYWRtaW4iLCJpIjoiZmZhMDA4MDg1YWQ3NGRkM2I4Njk3ZTdiYzJkYmU2ODkifQ%3D%3D&cloudId=d4f29c87-9d1e-472e-833b-a50053536073&selectedIssue=SCRUM-150
Bitbucket: https://bitbucket.org/cs3398f23changelings/hercules/commits/d233cb9feaf157bbf18a4286ca83a2c4f221b77e

SCRUM-151 Update web app to newest version 
- Merged updated main into fixed Firebase branch and thoroughly error-tested
Jira: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJwIjoiYWRtaW4iLCJpIjoiZmZhMDA4MDg1YWQ3NGRkM2I4Njk3ZTdiYzJkYmU2ODkifQ%3D%3D&cloudId=d4f29c87-9d1e-472e-833b-a50053536073&selectedIssue=SCRUM-151
Bitbucket: https://bitbucket.org/cs3398f23changelings/hercules/commits/448e27ff7458d4fa9391c44c558f807b049d74a1

SCRUM-96 Set up user folders in Firestore
Evaluate, optimize, and re-organize Firestore layout to most efficiently save/organize/read user info.
- Separated storage for each set, allowing each set to have a different number of weights/reps compatible with frontend dev
- Organized exercises into collections for each "split," compatible with frontend (arms, legs, etc.)
- Added documents to example user's folder for preferred weight units and unique userID
Jira: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJwIjoiYWRtaW4iLCJpIjoiZmZhMDA4MDg1YWQ3NGRkM2I4Njk3ZTdiYzJkYmU2ODkifQ%3D%3D&cloudId=d4f29c87-9d1e-472e-833b-a50053536073&customFilter=05596667-c06a-494b-bf06-c71f0e686764&selectedIssue=SCRUM-96
Screenshots: https://docs.google.com/document/d/1m1fQJ33TjmlPJa3884SDdGtL08XW-6r8vYVUvxGLjhs/edit?usp=sharing

SCRUM-155 Be able to write docs in Firestore
- Found and modified Firestore documentation to fit project and provide annotated examples
- Created HowToFirestore.txt document for group reference about how to read/write Firestore data
- Successfully implemented example document creation upon app initialization
- Patched document creation code to prevent error causing GUI to not be displayed
- Explained to group members how to use Firestore layout
Jira: https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJwIjoiYWRtaW4iLCJpIjoiZmZhMDA4MDg1YWQ3NGRkM2I4Njk3ZTdiYzJkYmU2ODkifQ%3D%3D&cloudId=d4f29c87-9d1e-472e-833b-a50053536073&customFilter=05596667-c06a-494b-bf06-c71f0e686764&selectedIssue=SCRUM-155
Bitbucket: https://bitbucket.org/cs3398f23changelings/hercules/pull-requests/63
Photo of testing: https://docs.google.com/document/d/1LUYrOjIuovRgE-hxvsI37a7wsaH4i05W2PEbYbMdTsE/edit?usp=sharing

### What Went Well? ###
- Firebase troubleshooting/experience
- Firestore management, research, and integration
Although I had an extremely frustrating start, by the end of this sprint I've learned a lot about reading/writing to Firestore, which I think is really cool! I have a pretty good understanding of how to manage a Firestore database and how to integrate different parts of it with our application. Even though we didn't end up using Firebase hosting, I did gain a lot of experience in common issues with Firebase/React Native integration and learned from an expert regarding the organization, structure, and function of Firestore features and configuration.

### What Didn't Go Well? ###
- Work wasted ):
- Still not great team communication (at least for backend)
I jumped the gun on creating my Firebase testing branch a few days before the sprint actually started, and continued working on that branch rather than creating branches with my task names so that they could be tracked in Jira. This was an oversight on my part as I didn't anticipate that the Firebase testing would take up so much of my time and so many tasks (my tasks were modified a week into the sprint to better reflect this) and it has caused me a lot of grief in terms of being able to track down my old work both to show my team and for our standup/retrospective. Additionally, I spent a ton of time on the Firebase testing and we didn't end up using it, as we abandoned the idea of Firebase hosting once it became clear that troubleshooting the web display every time a new feature is integrated would make us unable to complete the app's functionality in our last sprint.

### What Can I Do to Improve? ###
- Commit more often for better work tracking
- Ensure branches are named correctly and separate branches are made for each task
- Meet more often with group
I will know I am doing this better when my work is apparent in the Jira board and it is easier to find/organize in next sprint's retrospective. We will know communication is better when our team is able to integrate our features in a timely manner when they are completed, and when each team member understands and is able to explain each component of the project.

### Next Steps ###
In the next sprint, I hope to add in the backend storage functionality for each of the buttons so that data can be saved between sessions in the correct place. Additionally, I hope to create the access rules for Firestore in order to switch our app off of testing mode, work with Julio to initialize users' folders with preset workouts and foods, and flesh out the organization scheme for our "Mindfulness" habit tracker, as the group hasn't thoroughly discussed how this feature will work or be tracked.


### Kaleb Perez Sprint 2: ###
During this sprint, the majority of my contributions were focused on enhancing the workout screen functionality. I implemented several key features to improve the overall user experience. I introduced the ability to delete workouts from the list of workouts, making it easier for users to manage their workout routines. Additionally, I created the 'Add Workouts' button to simplify the process of adding new exercises. To enhance user customization, I added a drop-down menu to name workouts when initially added. The 'Settings' button was introduced, providing quick access to options for deleting and renaming both workouts and splits. Within the workout screen, I enabled users to add reps, weights lifted, and sets, and it now calculates percentage value increase recommendations. Furthermore, I worked collaboratively with Aaron to modularize his code, ensuring a more organized and efficient project structure."

### Tasks: ###
Title: add ability to delete workout from lists
ID: SCRUM-116
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-116
Title: create add workouts button
ID: SCRUM-113
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-113
Title: add ability to name workout
ID: SCRUM-114
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-114
Title: add ability to add reps and weights lifted in workout screen
ID: SCRUM-120
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-120
Title: add logic to recommend different amounts to lift or different possible workouts to try in workout screen
ID: SCRUM-121
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-121
Title: add ability to delete workout split
ID: SCRUM-139
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-139
Title: add ability to rename workout split
ID: SCRUM-126
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-126
Title: Assist Aaron with GitHub issues and modularizing breakfast buttons
ID: SCRUM-147
https://cs3398f23changelings.atlassian.net/jira/software/projects/SCRUM/boards/1?selectedIssue=SCRUM-147


### What Went Well? ###
Team:
We really came togther in the end and got a lot of work done fast. I think next sprint will go better since we are over the major roadblocks.
Personal:
Adding a lot of functionality in a short time and helping aaron modularize his code quickly
### What Didn't Go Well? ###
Our teamwork and communication is not the best, it leads to lots of standstills while waiting on help or a task to get done
### What is impeding us ###
Lack of communication and procrastination. These two factors are deadlocking us when some of us try to work.
### What Can I Do to Improve? ###
Help keep the team motivated and working on tasks, schedule more meetings, be more vocal about the work that needs to get done and when.
### Next Steps ###
I plan to add the final bits of UI functionality and then work on making it look as nice as possible for our final presentation. I will use a cohesive theme to beautify the app
