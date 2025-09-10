# ✅ Chronous - The God of Time Management

A **modern, responsive, and minimal** Task Manager app built with **React + TailwindCSS + Flask (Python)**.  
Easily add, edit, delete tasks, and manage **comments** for each task with a clean UI.  
Supports **task filtering (All / Completed / Incomplete)** and a **responsive design** for **mobile, tablet, and desktop**.  

---

## ✨ Features
- 📌 **Add / Edit / Delete Tasks**
- 💬 **Add Comments** for each task (with edit & delete)
- 🎯 **Filter Tasks** → All | Completed | Incomplete
- 📱 **Fully Responsive UI** (Mobile → Tablet → Laptop)
- 🌗 **Dark Mode Toggle**
- ⚡ **Fast Backend** with Flask REST API
- 🗄 **SQLite Database** (via Flask-Migrate & SQLAlchemy)

---

## 🖥️ Tech Stack
### Frontend
- ⚛️ React
- 🎨 TailwindCSS
- 🔄 Axios (for API calls)

### Backend
- 🐍 Flask
- 🗄 SQLAlchemy + Flask-Migrate (database)
- 📡 REST API (CRUD for tasks & comments)

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
````

### 2️⃣ Backend Setup (Flask)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (Windows)
source venv/bin/activate  # (Mac/Linux)

pip install -r requirements.txt

# Setup database
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Run backend
flask run
```

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Now open 👇

Frontend will run on http://localhost:5173/

Backend will run on http://127.0.0.1:5000/

---

## 📂 Project Structure

```
task-manager-app/
│── backend/              # Flask API + Database
│   ├── app.py            # Main Flask app
│   ├── models.py         # Database models
│   ├── migrations/       # Flask-Migrate migrations
│   └── ...
│
│── frontend/             # React + Tailwind frontend
│   ├── src/
│   │   ├── App.jsx       # Main React app
│   │   ├── index.css     # Tailwind styles
│   │   └── ...
│   └── package.json
│
└── README.md
```

---

## 🌍 Deployment

* **Frontend** → [Vercel](https://chronous-2649.vercel.app)
* **Backend** → [Railway](https://chronous-production.up.railway.app)

---

## 🛠️ Future Improvements

* 🔐 User Authentication (Login / Signup)
* 📅 Due dates & reminders
* 📊 Task analytics dashboard
* ☁️ Cloud DB (Postgres / MongoDB)
* 📱 PWA support (Installable app)

---

## 📸 Screenshots (Demo)

### Mobile

👇 

<img width="367" height="803" alt="image" src="https://github.com/user-attachments/assets/cb3140d6-d892-4452-b310-ac2b4d62f094" />


### Tablet

👇

<img width="476" height="632" alt="image" src="https://github.com/user-attachments/assets/03a7f1ac-e9ad-4252-83b9-89cb7dce7f32" />


### Laptop

👇 

<img width="1918" height="913" alt="image" src="https://github.com/user-attachments/assets/0fb4fbc4-1e85-4675-86e4-54235dd1ddad" />


---

## 👩‍💻 Author

Made with ❤️ by **Aryan Palaspagar**

