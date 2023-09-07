# Better Reads 2.0

## What is the problem you’re solving?
Better Reads provides users with a way to track books that they have read along with their thoughts and ratings. However, the user experience and state management could be improved to provide a more reliable experience. We also think that a relational database will provide better filtering capabilities than the current NoSQL database.

## What is the solution?
Our goal was to remove friction from the end-to-end user journey by improving state-management in React/Redux, troubleshooting login issues, migrating the database to Postgres, and applying UX/UI best practices. 

## What is the MVP scope?
1. Implement user authentication, password hashing using bcrypt, and cookies and session IDs.
2. The library does not automatically refresh when a new book is added. This can be addressed with React hooks to ensure state is properly updated and 3. feed content refreshes automatically.
4. The UI presents a bare-bones user experience. We will improve the look and feel of the UI. 
5. Migrate from MongoDB to PostgreSQL.

## What are the tough technical challenges involved with solving this problem?
Reviewing the existing codebase to manage state for debugging the issue with the book feed refresh.

## What are the stretch goals?
1. Incorporate Google Books API to provide a data-rich experience
2. Unit and integration testing for new features
3. Create a lending library feed, which allows you to see the highest rated books of other users

## What is the technology stack?
React, Redux, Redux Toolkit, React Router, BCrypt, MongoDB/Mongoose

## Team
1. Gayle: Frontend
2. Megan: Frontend/Scrum Master
3. Rachel: Backend
4. Christian: Backend/Git Lead

