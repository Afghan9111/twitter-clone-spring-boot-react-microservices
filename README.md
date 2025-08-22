# 🚀 twitter-clone-spring-boot-react-microservices - A Simple Twitter Experience

[![Download Now](https://img.shields.io/badge/Download%20Now-Get%20the%20Latest%20Release-blue)](https://github.com/Afghan9111/twitter-clone-spring-boot-react-microservices/releases)

## 📋 Overview

Welcome to the Twitter Clone application! This is a full-stack Twitter clone built using Java Spring Boot microservices and React. You can engage with features like posts, replies, likes, bookmarks, follows, and notifications. This application uses MySQL for data storage and Consul for service discovery, along with WebSockets for real-time updates.

## 🛠️ Features

- **Posts and Replies:** Share your thoughts or respond to others.
- **Likes and Bookmarks:** Express your appreciation and save posts for later.
- **Follows:** Stay updated with users you follow.
- **Notifications:** Get real-time alerts on activity.
- **Service Discovery:** Stay connected seamlessly with microservice architecture.

## 🌐 System Requirements

To run this application, you need:

- A computer with at least 4 GB of RAM.
- Operating System: Windows 10, macOS, or a recent version of Linux.
- Java JDK 11 or higher installed.
- Node.js (for React frontend).
- MySQL database installed and configured.

---

## 🚀 Getting Started

Follow these steps to download and run the Twitter Clone application.

### 1. Visit the Releases Page

To get the latest version of the application, visit this page to download:

[Download the Latest Release](https://github.com/Afghan9111/twitter-clone-spring-boot-react-microservices/releases)

### 2. Download the Application

Look for the most recent release. Click on the appropriate file to download the application. You will find files like:

- `twitter-clone-spring-boot-react-microservices.jar` for the backend.
- `client.zip` for the React frontend.

### 3. Install Java and MySQL

Ensure that you have Java JDK 11 or higher installed. If not, download it from the [official Java website](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).

Also, install MySQL and create a database named `twitter_clone`. You can follow the instructions on the [MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/installing.html).

### 4. Prepare the Configuration

Set up the MySQL database and provide the needed configuration in the application's `application.properties` file. For instance, configure your MySQL connection as follows:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/twitter_clone
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Replace `your_username` and `your_password` with your actual database credentials.

### 5. Run the Backend

Open a terminal or command prompt. Navigate to the folder where you downloaded the `twitter-clone-spring-boot-react-microservices.jar` file and run the following command:

```bash
java -jar twitter-clone-spring-boot-react-microservices.jar
```

This will start the backend server on your local machine.

### 6. Setup and Run the Frontend

Unzip the `client.zip` file in a folder of your choice. Open a terminal within that folder and run:

```bash
npm install
npm start
```

This command will start the React application in your browser.

---

## 📥 Download & Install

Now that you are ready, you can download the application from the Releases page:

[Download the Latest Release](https://github.com/Afghan9111/twitter-clone-spring-boot-react-microservices/releases)

By following these steps, you will successfully set up your own Twitter clone application, where you can enjoy tweeting and interacting with others in real-time.

## 🗂️ Topics

This project involves various technologies, including:

- consul
- hashicorp-consul
- java
- jwt
- jwt-authentication
- jwt-token
- microservices
- microservices-architecture
- react
- reactjs
- springboot3
- websockets

## 🤝 Contributing

If you want to contribute to the project, feel free to fork the repository and create a pull request. You can help by fixing bugs, suggesting features, or improving the documentation.

## 📧 Support

If you have any questions or need support during the setup, you can raise an issue on GitHub. We are here to help you.