## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Setup](#setup)

## <a name="introduction">🤖 Introduction</a>

Swipe is a web application that facilitates user matchmaking using a swipe-based interface, with integrated real-time chat functionality and notifications for seamless user interaction.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Web Technologies: HTMl, CSS, JavaScript, TypeScript
- CSS Frameworks: Tailwind CSS
- JS Frameworks: ReactJS, NodeJS, ExpressJS
- Databases: MongoDB
- State Management: Zustand
- Routing: React Router
- Real time communication: Socket.IO

## <a name="features">🔋 Features</a>

👉 **Login/Registration**: Users can create a new account or authenticate with existing credentials to access the platform, ensuring user data protection and enabling personalized experiences.

👉 **Swipe through user profiles to find matches**: Users can view and interact with profiles using a swipe-based interface (left to pass, right to like).

👉 **Real time alert notification on matching**: Matching is triggered when two users mutually like each other, and alert is sent to both the users.

👉 **Use real-time messaging to communicate with matches**: A built-in chat system allowing users to exchange messages instantly upon matching, enabled using WebSockets.

👉 **Enjoy interactive features like emoji support and notifications**: Users can enhance conversations with emoji reactions for a more expressive experience. Instant notifications alert users of new matches, messages, and activity updates.

## <a name="setup">🤸 Setup</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/keyur22/swipe.git
cd swipe
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
cd client && npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development or production
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLIENT_URL=your localhost:PORT
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

The app should now be running on [http://localhost:3000](http://localhost:3000) (client/frontend) and [http://localhost:5173](http://localhost:5173) (server/backend).
