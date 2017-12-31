# AngularJS homework #6 - using route

Start with a good example at W3Schooles.com:

http://www.w3schools.com/angular/tryit.asp?filename=try_ng_w3css

It shows a list of users (which is in a JS array) and allows NEW / EDIT on a selected user.
This homework is to enhance this app in the following way:

1. Add a few new fields such as Title, Sex, Age. It should be to all aspects, including list, new, and edit;
2. Implement filtering / searching and sorting to the User list.
3. Implement 'Delete User' - add a new column in the User list. In this column, each rows shows a
'delete' icon. By clicking it, the selected user will be deleted from the list (and the JS array).
4. Implement paging / pagination by having 'Prev Page' and 'Next Page'. (the size of each page is
pre-defined, such as 20).

Note: You should create your own code files for this.

## Homework 7
This homework is to enhance this app in the following way:

- To split the page into 3 separate 'pages': User List, New User, and Edit User.
- Each page will be actually a `<div>` and will be displayed as part of index.html.
- It is controlled by AngularJS via `ng-view`.

Two things may be needed to complete this homework:
1. Need to learn how to use `ng-view`;
2. May need to run this within a web server (until you turn off the web
security in a web browser).

## Homework 9
This homework is to enhance this app in the following way:
To create an angularJS service that encapsulates the USERS array and all the other shared functions. The instance of this service will be shared among all the controllers.

Two things may be considered to complete this homework:
1. It's up to you to choose a form of the service: Factory, Service and Provider, and leverage as
much of its functionality as possible.
2. It's up to you to decide which functions will be in this service. However, there should be no
global objects (data or functions) after this homework.