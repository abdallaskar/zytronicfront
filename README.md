# Real-Time Chat Application (Frontend)

This is the **frontend** of a real-time chat application built with **Next.js, React, TailwindCSS, Redux Toolkit, and Socket.io**.  
It connects with a **Node.js backend** that handles authentication, conversations, and message delivery.

---

## 🎯 Objective

- Build a **complete real-time chat system (Full Stack)**.
- **Frontend**: Next.js with React, Redux Toolkit, Socket.io client, TailwindCSS.
- **Backend**: Node.js, Express, JWT authentication, Socket.io, and MongoDB (or MySQL).
- **Features**:

  - User authentication (JWT or OAuth).
  - Start **one-to-one real-time conversations**.
  - Send and receive **text messages and images**.
  - Instant delivery using **WebSockets (Socket.io)**.
  - **Inbox page** to show conversations and timestamps.
  - Persistent storage for **users, conversations, and messages**.

  **Demo Video:** [Click here to watch](https://your-demo-video-link.com)
  **backend:** [Click here to backend repo](https://github.com/abdallaskar/zytronicBack)

---

## 🛠️ Tech Stack (Frontend)

- **Next.js 15** – React Framework
- **React 19** – UI library
- **TailwindCSS 4** – Styling
- **Redux Toolkit** – State management
- **Socket.io Client** – Real-time messaging
- **Firebase** – Optional image/file storage
- **Chart.js + React-Chartjs-2** – Example dashboards

---

## 📂 Project Structure

```
zytronicfront/
├── components/         # Reusable React components
├── features/           # Redux slices and feature logic
├── pages/              # Next.js pages (routes)
├── public/             # Static assets
├── styles/             # Tailwind and global styles
├── utils/              # Utility functions
├── store.js            # Redux store setup
├── socket.js           # Socket.io client setup
└── ...
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

````bash
# Clone the repository
git clone https://github.com/abdallaskar/zytronicfront.git
cd zytronicfront

# Install dependencies
npm install


### Running the Development Server

```bash
npm run dev


Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 🧑‍💻 Technical Approach

- **Component-based architecture** for maintainability and reusability.
- **Redux Toolkit** for scalable and predictable state management.
- **Socket.io** for real-time, bidirectional communication.
- **TailwindCSS** for rapid and consistent UI development.
- **Next.js** for server-side rendering and optimized routing.
- Clean, well-organized codebase with clear separation of concerns.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.
````
