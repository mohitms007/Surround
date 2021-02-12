# Surround (Styling under Development)
A Tech-Community Sharing Platform using which users can post, comment, link anything related to technology.

## Getting started
To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)



## Functionality overview

The application is a tech news site called "Surround". It uses a custom API for all requests, including authentication. You can view a live demo over after some changes.

**General functionality:**

- Authenticate users via Firebase (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles, Likes

**The general page breakdown looks like this:**

- Home page
    - Uses React Router
        - List of tags
        - List of articles pulled from either Feed, Global, or by Tag
        - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Use FirebaseAuth (store the token in localStorage)
- Settings page ()
- Editor page to create/edit articles
- Article page (URL: /#/article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page ()
    - Show basic user info

