https://minor-project-clg-4.onrender.com

for visiting my project 

Folder sturcture of my project is:-

quiz-app/

│
├── config/                     # Configuration files

│   └── passport.js             # Google OAuth configuration

│

├── middleware/                 # Middleware logic (if applicable)

│

├── authjs/                     # (Consider renaming to controllers/ or keep for auth logic)

│   └── auth.js

│

├── public/                     # Static assets (served to the client)

│   ├── assets/                 # Miscellaneous assets (icons, fonts, etc.)

│   ├── images/                 # Image files

│   ├── pdfs/                   # PDF files (if any)

│   ├── logincss/               # Login page styles

│   └── style.css               # Main stylesheet

│

├── routes/                     # Express route handlers

│   ├── authRoutes.js

│   └── quizRoutes.js

│

├── views/                      # EJS templates for rendering UI

│   ├── about.ejs

│   ├── dashboard.ejs

│   ├── index.ejs

│   ├── login.ejs

│   ├── quiz.ejs

│   ├── quiz-setup.ejs

│   ├── result.ejs

│   └── signup.ejs

│

├── .gitignore

├── package-lock.json

├── package.json

├── README.md

└── server.js      # Entry point of the Node.js application
