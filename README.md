## Social Media Application (Client)

Welcome to our social media application client! This application provides a full-stack experience for users to interact with a social media platform. Users can register, login, follow and unfollow other users, change profile pictures and cover pictures, post photos and text, like/unlike posts and comments, and interact with other users' content.

## Live Demo
https://social-media-front-end-pi.vercel.app/

## Installation
Clone the repository: https://github.com/slunecnicee/Social-media-app

git clone <repository_link>
Navigate to the client directory:

cd client
Install dependencies:

npm install
Start the development server:

npm start


# Technologies Used
React
React Router DOM
Material-UI
Axios
React Toastify
Timeago
Emotion
Web Vitals
bcrypt
dotenv


## Usage
Register/Login: Users can register for a new account or login with existing credentials.

Profile Management: Users can update their profile information, including profile picture, cover picture, and other details.

Social Interaction: Users can follow/unfollow other users, post photos and text, like/unlike posts and comments, and interact with other users' content.

Folder Structure
css
Copy code
client
│   README.md
│   package.json
│   ...
│
└───src
    │   App.js
    │   index.js
    │   ...
    │
    ├───components
    │   │   Header.js
    │   │   Footer.js
    │   │   ...
    │
    ├───pages
    │   │   Home.js
    │   │   Profile.js
    │   │   ...
    │
    ├───services
    │   │   AuthService.js
    │   │   UserService.js
    │   │   PostService.js
    │   │   ...
    │
    ├───utils
    │   │   api.js
    │   │   auth.js
    │   │   ...
    │
    └───styles
        │   global.css
        │   ...
        
## Contributing
Contributions are welcome! Please feel free to fork the repository and submit pull requests.

# License
This project is licensed under the ISC License.

# Credits
React: https://reactjs.org/
Material-UI: https://mui.com/
Axios: https://axios-http.com/
bcrypt: https://www.npmjs.com/package/bcrypt
dotenv: https://www.npmjs.com/package/dotenv

## Server README
## Social Media Application (Server)
Welcome to our social media application server! This server provides the backend functionality for our social media application, including user authentication, profile management, posting, and social interactions.

Installation
Clone the repository: https://github.com/slunecnicee/Social-media-app


git clone 
Navigate to the server directory:

cd server
Install dependencies:


npm install
Start the development server:


npm start

## Technologies Used
Node.js
Express
MongoDB with Mongoose
bcrypt
cors
dotenv
helmet
multer
morgan
Usage
Authentication: Users can register and login to access the social media platform.

Profile Management: Users can update their profile information, including profile picture and cover picture.

Posting: Users can post photos and text on their profile.

Social Interactions: Users can follow/unfollow other users, like/unlike posts and comments, and comment on posts.

## Folder Structure

server
│   README.md
│   package.json
│   ...
│
└───routes
│   │   authRoutes.js
│   │   userRoutes.js
│   │   postRoutes.js
│   │   ...
│
└───models
│   │   User.js
│   │   Post.js
│   │   ...
│
└───controllers
│   │   authController.js
│   │   userController.js
│   │   postController.js
│   │   ...
│
└───middlewares
│   │   authMiddleware.js
│   │   ...
│
└───config
│   │   db.js
│   │   ...
│
└───utils
│   │   errorResponse.js
│   │   ...
│
└───uploads
    │   ...
    


License
This project is licensed under the ISC License.

Credits
Node.js: https://nodejs.org/
Express: https://expressjs.com
