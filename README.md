# 🛒 ngMart – Angular E-Commerce Platform

ngMart is a scalable e-commerce web application built with **Angular**, featuring product listings, a shopping cart, wishlist, and checkout flow.
The project demonstrates reusable components, routing, guards for role-based access, and integration with a mock API powered by **json-server**.

---

## 🚀 Features

- Product listing with details view
- Add to cart and checkout functionality
- Authentication with route guards (protected routes)
- Role-based access (e.g., user vs. admin)
- State management with RxJS & services
- Responsive UI (mobile & desktop friendly)
- Mock RESTful API using **json-server**

---

## 🛠️ Tech Stack

- **Frontend:** Angular, TypeScript, Angular Router, Angular Forms, RxJS, Angular Material
- **Backend (Mock API):** json-server
- **Tooling:** Node.js, npm, Angular CLI, Git

---

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ngMart.git
   cd ngMart
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the mock API (must be started before the Angular app)**

   ```bash
   npx json-server db.json --watch --port 3000
   ```

4. **Start the Angular app**

   ```bash
   ng serve
   ```

5. Open the app in your browser at [http://localhost:4200](http://localhost:4200).

---

## 📂 Project Structure

```
ngMart/
│── src/
│   ├── app/
│   │   ├── components/    # Reusable UI components
│   │   ├── models/        # Data models
│   │   ├── services/      # API & state management
│   │   ├── guards/        # Route guards
│   │   ├── pages/         # Feature pages (Products, Cart, Checkout, Auth)
│   │   └── app-routing.module.ts
│   └── assets/
│── db.json                # Mock API data
```

---

## 📸 Screenshots

(Add some screenshots or GIFs here to showcase the UI)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a pull request or an issue.

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify it.
