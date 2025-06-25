🛒 E-Commerce Web Application
A full-stack e-commerce platform built using React, Node.js, Express, and MongoDB. This application allows users to browse products, manage a shopping cart, place orders, and admins to manage inventory and orders.

🚀 Features
🔐 User Authentication (Login / Register)

🛍️ Product Listing, Search, and Filter

🛒 Cart and Checkout

📦 Order History and Admin Order Management

⚙️ Admin Dashboard for Product Management

💾 Data stored in MongoDB

💡 Clean UI with Bootstrap

🧰 Tech Stack
Frontend	Backend	Database
React, React Router	Node.js, Express.js	MongoDB
Axios, Bootstrap	JWT, Bcrypt, CORS, dotenv	Mongoose ODM

📁 Project Structure
bash
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   └── utils/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
├── .env
|--Output.png
├── package.json
└── README.md
📦 Installation & Run Locally
1. Clone the repository
bash
git clone https://github.com/sreedinesh/E-commerce-shopease.git
cd E-commerce-shopease
2. Setup Backend
bash
cd backend
npm install
# Create .env file
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
npm start
3. Setup Frontend
bash
cd ../frontend
npm install
npm start
4. Access App
Open browser:

arduino

Frontend:  http://localhost:5173/ 
Backend: http://localhost:5000
🧪 Sample Admin Login
Email: admin@example.com
Password: admin123

(Or register and manually update role in DB)

📸 Screenshots
/Output.png
/Output(2).png

📌 Future Improvements
Add payment gateway integration (Razorpay/Stripe)

Add product images and categories

Improve order tracking and status

Deploy to cloud (Render / Vercel / Netlify / MongoDB Atlas)

🙌 Contributing
Pull requests are welcome. For major changes, please open an issue first.

📄 License
This project is licensed under the MIT License.

