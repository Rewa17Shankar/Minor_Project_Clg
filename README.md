# Quiz Application - College Minor Project

A web-based quiz application built with Node.js and Express.js that provides an interactive quiz experience with Google OAuth authentication and dynamic question fetching from the Open Trivia Database API.

## 🚀 Features

- **Interactive Quiz Interface**: Clean and responsive quiz interface built with EJS templates
- **Google OAuth Authentication**: Secure login system using Google OAuth 2.0
- **Dynamic Quiz Content**: Questions fetched from Open Trivia Database (OpenTDB) API
- **Multiple Quiz Categories**: Support for various quiz topics and difficulty levels
- **User Dashboard**: Personalized dashboard for tracking quiz progress and results
- **Responsive Design**: Mobile-friendly interface with modern CSS styling
- **Database Integration**: User data and quiz results stored in PostgreSQL/Supabase

## 🛠️ Tech Stack

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Initial database setup with pgAdmin
- **Supabase** - Cloud database service (current)

### Frontend
- **EJS** - Embedded JavaScript templating engine
- **CSS** - Custom styling for responsive design
- **JavaScript** - Client-side interactivity

### APIs & Services
- **Open Trivia Database (OpenTDB) API** - Quiz questions and data
- **Google OAuth 2.0** - Authentication service
- **Render** - Deployment platform

## 📁 Project Structure

```
Minor_Project_Clg/
├── config/
│   ├── db.js              # Database configuration
│   ├── passport.js        # Passport.js OAuth setup
│   └── middleware/        # Custom middleware
├── public/
│   ├── assets/           # Static assets
│   ├── images/           # Image files
│   ├── pdfs/             # PDF resources
│   ├── index.js          # Main frontend JavaScript
│   ├── login.css         # Login page styling
│   └── style.css         # Main stylesheet
├── routes/
│   ├── authRoutes.js     # Authentication routes
│   └── quizRoutes.js     # Quiz-related routes
├── views/
│   ├── 404.ejs           # Error page
│   ├── about.ejs         # About page
│   ├── dashboard.ejs     # User dashboard
│   ├── quiz-setup.ejs    # Quiz configuration
│   ├── quiz.ejs          # Quiz interface
│   └── results.ejs       # Results display
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Dependencies and scripts
├── package-lock.json    # Lock file
├── README.md            # Project documentation
└── server.js            # Main server file
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- PostgreSQL or Supabase account
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rewa17Shankar/Minor_Project_Clg.git
   cd Minor_Project_Clg
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URL=your_database_connection_string
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Session Secret
   SESSION_SECRET=your_session_secret
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **Database Setup**
   - Set up your PostgreSQL database or create a Supabase project
   - Update the database connection string in your `.env` file

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 🎮 How to Use

1. **Authentication**: Sign in using your Google account
2. **Quiz Setup**: Choose quiz category, difficulty, and number of questions
3. **Take Quiz**: Answer questions within the time limit
4. **View Results**: Check your score and correct answers
5. **Dashboard**: Track your quiz history and performance

## 🌐 API Integration

### Open Trivia Database API
- **Base URL**: `https://opentdb.com/api.php`
- **Features Used**:
  - Multiple categories (Science, History, Sports, etc.)
  - Different difficulty levels (Easy, Medium, Hard)
  - Various question types (Multiple choice, True/False)

### Google OAuth 2.0
- Secure authentication flow
- User profile information retrieval
- Session management

## 🚀 Deployment

The application is deployed on **Render** platform:

1. **Build Command**: `npm install`
2. **Start Command**: `npm start`
3. **Environment Variables**: Configure all required environment variables in Render dashboard

**Live Demo**: [Your Render App URL]

## 🤝 Contributing

This is a college minor project, but contributions and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes as part of a college minor project.

## 🎓 Academic Information

- **Project Type**: College Minor Project
- **Developer**: Rewa17Shankar
- **Technologies Learned**: Full-stack web development, API integration, OAuth authentication, database management

## 📞 Contact

**Rewa Shankar**
- GitHub: [@Rewa17Shankar](https://github.com/Rewa17Shankar)
- Project Link: [https://github.com/Rewa17Shankar/Minor_Project_Clg](https://github.com/Rewa17Shankar/Minor_Project_Clg)

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing free quiz questions
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) for authentication
- [Render](https://render.com/) for hosting services
- [Supabase](https://supabase.com/) for database services
- College faculty and peers for guidance and support

---

⭐ If you found this project helpful, please consider giving it a star!





<img width="1294" height="605" alt="image" src="https://github.com/user-attachments/assets/13bf227e-3935-40ee-bf85-3c22b4d82a49" />
<img width="1315" height="598" alt="image" src="https://github.com/user-attachments/assets/7afe4a67-6cc0-458a-8e80-31437b8769a6" />
<img width="1303" height="604" alt="image" src="https://github.com/user-attachments/assets/0f9f3d4d-edc7-48ad-8772-595b25070c8f" />
<img width="1300" height="604" alt="image" src="https://github.com/user-attachments/assets/510e5a6e-1d05-4894-aa7d-795831a7309a" />
<img width="1287" height="580" alt="image" src="https://github.com/user-attachments/assets/b38f3d50-5934-4ee7-b694-862cf2c95bbc" />
