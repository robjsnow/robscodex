# 🌐 Rob's Codex

Welcome to **Rob's Codex**:  A personal blog where I share my journey in technology. This repository contains the code that runs my blog, built with modern web technologies.

## 📜 Project Overview

Rob's Codex is a simple yet powerful platform for sharing advice, tutorials, and reflections on technology. It combines a clean design with practical features to deliver a smooth reading experience.

### 🛠️ Tech Stack

- **Express.js** - Handles routing and server logic.
- **EJS (Embedded JavaScript)** - Renders dynamic HTML templates.
- **MongoDB** - Manages and stores all blog data.

## 🚀 Getting Started

Here’s how you can set up Rob's Codex on your local machine:

### Prerequisites

Make sure you have the following installed:

- Node.js & npm
- MongoDB

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/robscodex.git
    cd robscodex
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up MongoDB:**

   - Ensure MongoDB is running locally.
   - Create a `.env` file in the root directory and add your MongoDB URI:

     ```plaintext
     MONGODB_URI=mongodb://localhost:27017/robscodex
     ```

4. **Start the Application:**

    ```bash
    npm start
    ```

    Visit `http://localhost:3000` to view the blog.

## 🌱 Features

- **Dynamic Templating:** EJS for dynamic and reusable HTML templates.
- **RESTful Routing:** Express.js for clean and organized routing.
- **Data Management:** MongoDB for efficient data storage and retrieval.

## 🤝 Contributing

Suggestions and contributions are welcome! Feel free to fork the repo and submit a pull request.

## 📜 License

This project is open-source and licensed under the MIT License.
