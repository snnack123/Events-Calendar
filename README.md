# Title: Events Calendar

<br />

## Project detalis

- **ReactJS** for building user interfaces and a Single-Page Web Application;
- **NodeJS** for backend part;
- **Tailwind CSS** which is a utility-first CSS framework for rapidly building custom user interfaces;
- Relational database for storing data (**MySQL Workbench**).

<br />

## Libraries used

- **React Router** that is the standard routing library for React;
- **Redux** that is used as a data store for any UI layer;
- **ExpressJS** for designing and building web applications quickly and easily;
- **BCrypt** to build a password security platform that scales with computation power and always hashes every password with a salt;
- **JSONWebToken** for creating a localStorage token by hashing a special data to can recongnize the user;
- **CORS** that allows a server to indicate any origins (domain, scheme, or port);
- **Sequelize** that makes it easy to manage a SQL database;
- **DayJS** which is a minimalist JavaScript date library for parsing, validating, manipulating, and formatting dates
- **EmailJS** which is a service that allows us to send emails directly from our client-side JavaScript code.

<br />

## Deploy detalis
- Frontend part was deployed on Firebase;
- Backend part and database are deployed on Heroku.

<br />

## Project story

### First contact with the website

First time the user accesses the website, he will see the home page with some indications about how to use the website and the calendar page.

<br />

### Register user

To use our application, user must create an user account and write some personal data (full name, email, age and a password).
Before creating the new account, the application will validate the form. If something is wrong, it will tell the user what to rewrite and correct.<br />
After creating the account, the user will receive an email for an **activation code**.

<br />

### Login

After typing the email and password, the app will check if there is an account with that email and it will check the password.
If everything is ok, the application will check if the user has the used activation code to activate the account. <br />
**If the account is not validated** he must type the activation code. After this step, he will be redirected to the calendar page.

<br />

### Calendar page

On this page, the user will see two calendars. <br />
The small one can change the month individually. On the other hand, if the bigger one is triggered, the smaller one will be updated. <br />
Also, the user can see a "Create" button for creating new events and a "Today" button to go to the current day. <br />
If the user doesn't select a day when he wants to create a new event, he could just press the "Create" button and the current day will be autoselected.

<br />

***Create event***

Creating the event window can be opened by clicking "Create" button or selecting a day from the calendar. <br />
The user must type a title, a description and choose a color for the new event. <br />
After validating the inputs, the event will be created and the calendar will be updated.

***Update event***

Updating window events can be opened by clicking on an existing event in the calendar. <br />
Here, the user can change anything he wants! <br />
After typing the new information and pressing the 'Update' button, the app will validate the inputs and will update the event and the calendar.

***Delete event***

This event can be used by clicking on an existing event and pressing on the 'trash' icon.
After clicking that icon, the event will be deleted and the calendar will be updated.


<br />

#### Restrictions:
- Can't create events in the past;
- The user can't see his events if is not logged in or the token is expired;
- The user can't create, update or delete an existing event if he is not logged in or the token is expired;
- The user can't navigate to the register or login page if is logged in;
- The user can't navigate to the calendar page if is not logged in;

<br />

#### Important: 
- After login, will automatically be generated a token that will expire in 1 hour;
- If token is expired, the user must login again.

<br />

## App test:
[Will be available soon](#)
