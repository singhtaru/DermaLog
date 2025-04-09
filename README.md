
---

# 🧴 DermaLog – Skincare Tracking App

DermaLog is a React-based skincare tracking app that helps users log their skincare routine, track skin conditions, set reminders, and get AI-powered skincare insights.

![DermaLog Preview](image-1.png)

---

## 🚀 Features

- ✅ **Routine Logger** – Track daily skincare products used.  
- ✅ **Skin Condition Tracker** – Log skin health and monitor trends.  
- ✅ **AI Skincare Assistant** – Get personalized product recommendations using the Gemini API.  
- ✅ **Reminder System** – Set email reminders for skincare routines (Firebase integration).  
- ✅ **Insights & Analytics** – Visualize skin condition trends with Recharts.js.  
- ✅ **Firestore Database** – *(Planned)* Store skincare logs in Firestore for seamless data management.  

---

## 🛠 Tech Stack

**Frontend:**  
- React  
- Tailwind CSS  

**Backend:**  
- Node.js  
- Express *(for Firebase email reminders)*  

**Database:**  
- Firestore *(for storing logs, pending integration)*  

**AI API:**  
- Gemini API *(for skincare suggestions)*  

---

## 📂 Project Structure

```
skincare-tracker/
├── public/                         # Static assets
├── src/
│   ├── components/                 # Reusable UI components (Navbar, AI Assistant, Tracker)
│   ├── pages/                      # Main pages (RoutineLogger, SkinTracker, Insights)
│   └── firebase.js                 # Firebase config
├── skincare-tracker-backend/
│   ├── server.js                   # Node.js backend for sending reminders
│   └── .env                        # Secret environment variables (NOT committed)
├── package.json                    # Dependencies
└── README.md                       # Project documentation 
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/singhtaru/skincare-tracker.git
cd skincare-tracker
```

### 2️⃣ Install Dependencies

```bash
npm install
cd skincare-tracker-backend
npm install
```

### 3️⃣ Set Up Firebase and Service Account Key

- Go to [Firebase Console](https://console.firebase.google.com/) and create a new project  
- Navigate to **Project Settings > Service Accounts**  
- Click **Generate new private key**  
- Save the file as `serviceAccountKey.json` inside `skincare-tracker-backend/`  
  *(Make sure this file is listed in `.gitignore`)*

### 4️⃣ Create a `.env` File

Inside `skincare-tracker-backend/`, create a `.env` file with the following content:

```env
PORT=5000
FIREBASE_SERVICE_ACCOUNT=./serviceAccountKey.json
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password-or-app-password
```

> **⚠️ Note:** Do **NOT** commit `.env` or `serviceAccountKey.json` to GitHub.

---

### 5️⃣ Run the App

Open two terminals:

**Frontend:**

```bash
npm run dev
```

**Backend:**

```bash
cd skincare-tracker-backend
node server.js
```

---

### 6️⃣ Deployment (Optional)

- **Frontend**: Deploy with [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)  
- **Backend**: Deploy with [Render](https://render.com/), [Railway](https://railway.app/), or [Heroku](https://heroku.com/)

---

## 🔐 Environment & Secrets Policy

Secrets like `.env` and `serviceAccountKey.json` are not tracked in Git. If you accidentally commit them:

1. Remove the file from the repo:

```bash
git rm --cached path/to/secretfile
```

2. Add the filename to `.gitignore`

3. To remove them from commit history, use:

- [`git filter-repo`](https://github.com/newren/git-filter-repo)
- or [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

---

## 🛠 TODO / Future Enhancements

- [ ] Fix Firestore integration for skin condition storage  
- [ ] Add profile authentication (e.g., Google login)  
- [ ] Enhance AI assistant with better skincare recommendations  

---
