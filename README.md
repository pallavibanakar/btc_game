# 🎮 BTC Prediction Game - Frontend

This is the React frontend for the BTC Prediction Game. It interacts with a Rails API backend to allow users to sign in, view BTC prices, make predictions, and track their score.

## 🛠️ Tech Stack

- **React**
- **React Router** for routing
- **Render** for deployment

## 🌟 Core Features

- 🔐 **User Auth** (Sign up, Login)
- 📈 **Fetch BTC Price** from backend (Coinbase API via Rails)
- 🎯 **Make Predictions** (up or down)
- ⌛ **One active bid at a time** (can't predict again until resolved)
- 🏆 **Live Score Update** after predictions resolve
- 🔁 **Auto-refresh** after resolution

## 🚀 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/pallavibanakar/btc_game.git
cd btc_game
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables  
Create a `.env` file in the root directory and add:
```
REACT_APP_API_URL=http://localhost:3001
```

### 4. Run the development server
```bash
npm run dev
```

---

## 📦 Build for Production
```bash
npm run build
```
## 🔗 Backend API
The React app communicates with the backend API:  
👉 [BACKEND API](https://github.com/pallavibanakar/bid_game_rails)
