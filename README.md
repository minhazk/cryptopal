# Cryptopal - Cryptocurrency Support Forum Website

## Table of Contents

-   [Project Description](#project-description)
-   [Technologies Used](#technologies-used)
-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Configuration](#configuration)
-   [Usage](#usage)

## Project Description

Cryptopal is a web application built using React Vite and Firebase, designed to provide a platform for novice cryptocurrency traders to seek advice, share experiences, and connect with other traders. The website offers a welcoming and interactive space where cryptocurrency enthusiasts can interact and learn from one another.

## Features

- **User Posts**: Users can create and share posts, sharing their insights, questions, and experiences related to cryptocurrency trading. This feature encourages discussions and knowledge sharing within the community.

- **Comments**: Users can comment on posts made by other users, fostering conversation and providing feedback or additional information.

- **Follow System**: The platform includes a follow system, allowing users to connect with one another. By following other users, traders can keep track of their posts and activities.

- **Direct Messaging**: Users can send direct messages to each other, enabling private and one-on-one communication. This feature facilitates personal discussions and networking.

- **Ranking System**: The website employs a ranking system based on points. Users earn points from upvotes on their posts and comments and lose points from downvotes. These points contribute to a user's overall rank within the community.

- **User Profiles**: Each user has a profile where they can showcase their achievements, including the points they've earned and their rank within the community. User profiles also allow for customization and personalization, such as uploading images and sharing additional information.

## Technologies Used

- React Vite
- Firebase
- Firestore

## Getting Started

To run this project, follow these steps:

### Prerequisites

Before you begin, ensure you have met the following requirements:

-   [Node.js](https://nodejs.org/) installed on your system.
-   **Firebase Account**: You'll need a Firebase account to obtain Firebase configuration keys.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/minhazk/cryptopal.git
    cd cryptopal
    ```

2. Install the required Node.js modules:
    
    ```bash
     npm install
    ```

## Configuration

Create a `.env` file in the project root directory with the following environment variables:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

Please replace the placeholders (e.g., your_firebase_api_key) with your actual credentials and information.

## Usage

1. Make sure you have completed the [Configuration](#configuration) steps to set up the necessary environment variables.

2. Start the development server with the following command:

    ```bash
    npm run dev
    ```

This will launch the project locally, and you can access it in your web browser at http://localhost:3000.
