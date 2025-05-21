# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Slooze Inventory Management System

A modern inventory management dashboard built with React, Redux, and Tailwind CSS. The app supports two roles: Manager and Store Keeper, each with their own permissions and dashboard views.

<!--  -->

🚀 Features
Role-based Authentication:
Manager and Store Keeper login with different dashboards and permissions.
Dashboard Analytics:
View total products, low stock, and out-of-stock analytics.
Product Management:
Add, edit, and delete products (Manager only).
Store Keeper can view and update product stock.
Recent Activity Table:
See the latest product changes and stock status.
Protected Routes:
Only authorized users can access certain pages.
Dark/Light Theme Toggle
Responsive Design

<!--  -->

🧑‍💼 Credentials
Use these credentials to log in as different roles:
Manager
Email: manager@example.com
Password: password123
Store Keeper
Email: storekeeper@example.com
Password: password123

<!--  -->

🗺️ App Flow

Login Page
Enter credentials (see above).
On successful login, you are redirected based on your role.
Routing & Role-based Access
/login — Login page for all users.
/ — Manager Dashboard (only accessible by Manager).
/products — Product management (accessible by both Manager and Store Keeper).
All other routes redirect to the appropriate dashboard or login.

Dashboard (Manager)
View analytics: total products, low stock, out of stock.
See recent product activity.

Products Page
Manager: Can add, edit, and delete products.
Store Keeper: Can view products and update stock.
Navigation
Sidebar and topbar with navigation links based on user role.
Theme toggle and logout button.
Logout
Logs out the user and redirects to the login page.

<!--  -->

🛠️ Tech Stack

Frontend: React, Redux Toolkit, React Router, Tailwind CSS
State Management: Redux (with slices for auth, products, theme)
UI: Tailwind CSS, React Icons
Notifications: react-toastify

src/
├── app/ # Redux slices (auth, products, theme)
├── assets/ # Images and static assets
├── components/ # Layout, ProtectedRoute, etc.
├── pages/ # Dashboard, Products, Login
├── routes/ # App routing
├── ui/ # (UI components, if any)
├── App.jsx # Main app component
└── main.jsx # Entry point

<!--  -->

📝 How to Use
Clone the repository

Install dependencies
npm install


Run locally
npm start

Deploy
For Vercel, make sure to add a vercel.json with SPA rewrites if using React Router.
<!--  -->
🔒 Credentials Recap
| Role | Email | Password |
|---------------|------------------------|--------------|
| Manager | manager@example.com | password123 |
| Store Keeper | storekeeper@example.com| password123 |
<!--  -->
📢 Notes
All data is stored in Redux state (no backend).
Credentials are hardcoded for demo purposes.
For production, implement a real backend and secure authentication.