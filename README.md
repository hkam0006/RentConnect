# RentConnect - a rental property manager
###### Developed by Team SE7EN, 2024

## Overview

RentConnect is a rental web application designed to be used by property managers (and real estate companies) to effectively manage their portfolio of properties; and for prospective renters to view and apply for new properties. The app is built using React (JavaScript) and relies on integration with an online instance of Supabase to provide both a centralised database and methods of authentication. 

## Git Repo

- Backend has nothing  
- Frontend contains everything

### Deployment

First, you must have a version of Node.JS (version 18 or higher) running on your machine.  
You can then run two npm commands inside `/frontend/`:  
> `npm install`  
> `npm start`

These two commands should install all required dependencies and then start up the web service which will be hosted on `localhost` at port 3000\.

### Manager Components

- Account setup  
  - For the creation of a property manager account as well as joining or creating a company  
- Add property  
  - For checking valid property details and adding it to a company.  
- Application details  
  - Retrieves a renter’s details, allowing you to view, approve and add comments to each section.  
- Applications  
  - Retrieves applications for properties you own.  
- Contacts  
  - Allows a user to quickly find contacts. Allows sorting by name, phone, email, last contacted and has a button to directly message that user.  
- Dashboard page  
  - Information relevant to the property managers.  
- Inspection page  
  - Allows property managers to view upcoming inspections, accepting, declining or editing them.  
- Inspection run  
  - Allows property managers to view upcoming inspection runs, displaying the inspection location, time and allows viewing on a map.  
- Keys  
  - Allows property managers to manage key sets within their company and tracking details such as key set status, borrower information, property address, issue and due dates and other relevant information.   
  - Allows property managers to create new key sets and manage keyset check-ins and check outs.  
- Messaging  
  - Allows a user to message another user. Retrieves messages by fetching rows containing that user’s id. Initially queries for all messages then uses subscribers to listen for new messages and uses mutator to add messages.  
- Profile page  
  - For changing property manager account details and seeing other property managers’ accounts  
  - For seeing information about renter accounts  
- Property page  
  - For seeing information about a property  
- Property search  
  - Allows a property manager to search for properties, allowing them to view the listing as a renter would.  
- Waiting for company  
  - For when a property manager is not in a company, they can request to join a company.

### Renter Components

- Account setup  
  - For creating a normal user account for those who would like to find a property to rent.  
- Application page  
  - The application section is in the dashboard page, users can browse these properties and click a single one to learn more about the details of each property.  
- Profile page  
  - Allows users to track profile completion, apply for properties using their RentConnect profile and monitor the status of their rental applications.  
- Property page  
  - Allows a renter to view a property, showing a description as well as allowing them to contact the relevant agent and apply for it.  
- Renter Profile  
  - Allow users to manage their personal details, which includes private details, employee information, licence, and supporting documents  
- Renter contacts  
  - Allows a user to quickly find contacts. Allows sorting by name, phone, email, last contacted and has a button to directly message that user.  
- Renter home  
  - Allow users to know their current property application and the status for each, and users can search for properties by using the search bar and the property list.  
- Renter inspection  
  - Allow users to check the inspection date and time, and users can edit the time or cancel/revert the inspection in that page. These updates will notify the property manager based on the company ID.  
- Renter references  
  - Allow users to add their reference both from employer or previous property manager/owner.  
- Inspection application  
  - Inside the property details page, to let users apply an inspection to a particular property.  
- Property application  
  - Inside the property details page, to let users apply an property to a particular property.  
- Contacts  
  - Allows a user to quickly find contacts. Allows sorting by name, phone, email, last contacted and has a button to directly message that user.  
- Renter message  
  - Allows a user to message another user. Retrieves messages by fetching rows containing that user’s id. Initially queries for all messages then uses subscribers to listen for new messages and uses mutator to add messages.

### Public Components

The components in this sections contains elements of the application that is interactable by users who have not signed in yet

- Landing page  
  - Page that users are on when they first visit the app. Users can search for properties, or sign up or login to the app  
- Sign up  
  - Allows users to sign up either as a property manager or as a tenant.  
- Login   
  - Allows users to login if they have previously signed up  
- Public property  
  - Allows users to view property listings without having to have signed up or logged in  
- Property Map  
  - Displays a map on the properties part of the public properties

## Supabase Components

- Queries  
  - Contains a range of supabase query hooks, sorted by table  
- Mutators  
  - Contains a range of supabase mutators for updating and deleting hooks, sorted by table  
- Subscribers  
  - useSubscribeTableByRenterID.js contains a generic subscriber which can be used for a specific table and renter.  
  - Other more specialised subscribers exist in their own directories.  
- Hooks \- useAuthListener  
  - The useAuthListener hooks listens for authentication changes and manages user sessions. When a user signs in, it checks if their account setup is complete and determines their role (property manager or renter) using Supabase queries. Based on the role, it navigates users to appropriate setup pages (/AccountSetUpPM or /AccountSetUpR). The hook also updates Redux with user’s information and manages loading state. If a user signs out, it dispatches a logout action and redirects them to the landing page. This hook ensures role based navigation and session management.

## Supabase

- Database tables  
- User sign up / property manager sign up  
- RLS

Database tables:

## CI/CD

This project uses GitHub Actions for Continuous Integration (CI) to automate testing on every push or pull request to the \`main\` branch. To add new tests for the project, Create a new test file with a \`.test.js\` extension e.g.,  NewFeature.test.js. 
