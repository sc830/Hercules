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
[Insert relevant screenshots here]

### Project Status ###
Project is: In progress

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