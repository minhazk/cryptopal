# Cryptocurrency Support Forum Web Application

This is a web application built using React Vite and Firebase, designed to provide a platform for novice cryptocurrency traders to seek advice, share experiences, and connect with other traders. The website allows users to create posts, comment on posts from other users, follow each other, and send direct messages.

## Tech Stack

The web application was built using the following technologies:

-   **React Vite**
-   **Firebase**

## Getting Started

To get started with the web application, follow these steps:

1. Clone the repository using `git clone`.
2. Install the required npm packages by running `npm install`.
3. Create a `.env` file in the root directory with your Firebase database keys.

REACT_APP_FIREBASE_API_KEY=<your-firebase-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<your-firebase-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<your-firebase-app-id>

4. Run the application using `npm start`.

## Features

The web application includes the following features:

-   **Authentication**: Users can sign up for an account, log in, and log out. Authentication is handled using Firebase authentication.
-   **Posts**: Users can create posts and view posts created by other users. Posts can be filtered by category (e.g. Bitcoin, Ethereum, Altcoins).
-   **Comments**: Users can comment on posts and view comments made by other users.
-   **Followers**: Users can follow other users and view a list of their followers and the users they are following.
-   **Direct Messages**: Users can send direct messages to other users.

## License

This web application is licensed under the MIT License.
