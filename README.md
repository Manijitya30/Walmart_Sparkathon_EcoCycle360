# EcoCycle360

EcoCycle360 is a sustainability-driven web platform designed to encourage recycling by offering customers reward points and leaderboard rankings for submitting recyclable materials. The collected materials — such as plastic, e-waste, paper, books, clothes, glass, and metal — are then supplied to recycling companies. This creates a win–win model, where customers are rewarded for their contributions and companies build a stronger brand image while supporting environmental goals.

---

## Project Structure

```
EcoCycle360/
│
├── admin/         # Admin dashboard (React)
├── customer/      # Customer portal (React)
├── backend/       # Node.js/Express backend API
├── ML_api/        # Python Flask ML API for CO₂ prediction
├── Model/         # ML model, dataset, and simulation scripts
```

---

## Features

### Admin Dashboard (`admin/`)
- **Customer Management:** View, search, and manage customer profiles and activity.
- **Order Management:** Track and manage placed orders and recycling returns.
- **Analytics Dashboard:** Visualize key metrics (customers, orders, recyclables, CO₂ savings) with charts and graphs.
- **In-Mall Submission:** Admins can submit recyclables on behalf of customers.
- **Authentication:** Secure admin login and registration.

### Customer Portal (`customer/`)
- **User Registration & Login:** Secure sign-up and sign-in for customers.
- **Order Placement:** Customers can place orders for recyclable items.
- **Checkout Flow:** Multi-step checkout with address, payment, and order confirmation.
- **Leaderboard:** See eco-score and CO₂ savings compared to peers.
- **Performance Dashboard:** Visual feedback on recycling performance and rewards (EcoCoins).
- **Profile Management:** View and update personal details.

### Backend API (`backend/`)
- **RESTful API:** Built with Node.js and Express, provides endpoints for authentication, users, orders, recyclables, and analytics.
- **PostgreSQL Database:** Stores users, orders, recycling data, and more.
- **Authentication:** JWT-based authentication for secure access.
- **Integration with ML API:** For CO₂ savings prediction.

### Machine Learning API (`ML_api/` & `Model/`)
- **Flask API:** Receives recycling data and predicts CO₂ savings using a trained ML model.
- **Model Training:** Scripts and datasets for training and updating the eco-impact prediction model.

---

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Zustand (state management), React Router
- **Backend:** Node.js, Express, PostgreSQL, JWT, dotenv
- **ML API:** Python, Flask, scikit-learn, pandas
- **DevOps:** Vite, ESLint, environment variable management

---

## How It Works

1. **Customers** register and log in to the portal, place orders, and submit recyclables.
2. **Admins** manage users, orders, and recyclables through a dedicated dashboard.
3. **Recycling Data** is sent to the ML API, which predicts CO₂ savings and returns results to the backend.
4. **Leaderboards** and **performance dashboards** motivate users to recycle more by showing their impact and rewards.
5. **All data** is securely stored and managed in a PostgreSQL database.

---

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3.x
- PostgreSQL