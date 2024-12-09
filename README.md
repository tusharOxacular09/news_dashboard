# News Nexus - Your Ultimate News Dashboard

**News Nexus** is an advanced, interactive, and visually appealing News Dashboard built with **Next.js**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**. It integrates **GitHub Authentication** for secure login, provides **Chat & Graph visualizations**, and uses the **News API** for real-time news data collection.

This application offers powerful features such as news search & filter, saving articles to local storage, exporting saved news as CSV & PDF, and much more. The beautifully designed admin dashboard and cool features ensure a seamless user experience.

---

### 🚀 Demo Video

### Watch the project in action:

[![Project Demo](https://img.youtube.com/vi/qDOnY-GdLe0/0.jpg)](https://www.youtube.com/watch?v=qDOnY-GdLe0)

---

### ⚙️ Technologies Used

- **Next.js 15**: The latest version for an optimized and scalable React framework.
- **TypeScript**: For enhanced development experience and static typing.
- **Redux Toolkit**: Efficient state management across the application.
- **Tailwind CSS**: For modern, responsive, and utility-first styling.
- **News API**: For real-time news data collection.
- **NextAuth.js & GitHub Authentication**: Seamless authentication with GitHub for secure login.
- **Chat and Graph Visualizations**: Display insightful graphical representations of news data.

---

### 📦 Features

- **News Search & Filter**: Find articles based on keywords, topics, and categories.
- **Save News as Payout**: Save your favorite news articles locally for future reference.
- **Export Saved News**: Export your saved articles in **CSV** and **PDF** format.
- **GitHub Authentication**: Login with GitHub via **NextAuth.js** for protected routes.
- **Protected Routes**: Secure your pages and ensure only authenticated users have access.
- **Beautiful Admin Dashboard**: Manage news articles and user activity with a stunning admin panel.
- **Real-Time Data**: News updates from the **News API** for up-to-date content.
- **Responsive Design**: Enjoy an excellent user experience across all devices.

---

### 🛠️ Installation Steps

Follow the steps below to clone the project to your local machine:

1. **Clone the repository**:

   ```bash
   git clone git@github.com:tusharOxacular09/news_dashboard.git
   cd news_dashboard
   ```

2. **Install dependencies**:

   Make sure you are using **Node.js v22** or above. You can verify your version using `node -v`.

   Install project dependencies by running:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Although it's **not recommended** to push environment variables to the repository (as it could expose sensitive information), for **local testing purposes**, the required environment variables are included in the `.env.local` file.

   **DO NOT** push `.env.local` files to any public repository in production.

   In your `.env.local` file, include the following environment variables (make sure to replace the placeholders with your own credentials):

   ```
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your-client-id
   NEXT_PUBLIC_GITHUB_CLIENT_SECRET=your-client-secret
   NEXT_PUBLIC_NEWS_API_KEY=your-news-api-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3000`.

---

### 🧑‍💻 How to Contribute

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

### ⚙️ Recommended Versions

- **Node.js**: v22 or above.
- **Next.js**: v15 or above.

---

### 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### 💬 Contact

Feel free to reach out if you have any questions or suggestions.

Happy coding! ✨
