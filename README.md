## Train Scheduler
This scheduling tool uses Firebase to store data and display a snapshot of that data in a table, with calculations for the next arrival and 'minutes away' that use the Moment js library.

## Index
1. How it works
2. Instructions
3. Built with
4. User Feedback

# How it works
Users can submit a train name, destination, time of first train, and train frequency. An if statement blocks blank submissions. Submissions that include data are pushed to Firebase as an object, and the form data is 'emptied'.  

Using the child_added event, a snapshot of the database is retrieved each time new train data is added, and each child's data is used(with Moment js) to calculate the next departure time for each train, and the length of time in minutes the next departure time is from now. Important note: Moment js is used to begin the first train time *1 year ago* in order to ensure the time happens before now.

In the Bootstrap jumbotron, Moment js is used to display the date and current local time. 

# Instructions
Create the train of your dreams, choose a romantic train name, pick a destination(I've used local destinations, but really ...go crazy), enter the time of the first train in military time('13:00' is 1 PM), and choose whatever frequency you'd like; can a train to Sri Lanka really leave every single minute? *Only in your heart.*
 
# Built with
* [Bootstrap](https://getbootstrap.com/) - The web framework used
* [jQuery](https://jquery.com/) - DOM manipulation and events
* [Firebase](https://firebase.google.com/) - database logic
* [Moment js](https://momentjs.com/) - library of logic for times/dates

 
# User Feedback
Felt strange showing this one to people, so... I didn't! I did, however, complain about Firebase a lot. 

Please pour one out for the folks who made Moment js. 
