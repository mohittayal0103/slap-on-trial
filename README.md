# Slap On! - DJ Console Skins Landing Page

A stunning, modern landing page for **Slap On!** - premium DJ console laminations and skins. Built with React, featuring a dark theme with neon accents and a bold, energetic design.

## 🎨 Features

- **Modern Design**: Dark mode with neon violet and teal accents
- **Responsive Layout**: Fully responsive design that works on all devices
- **Product Showcase**: Display DJ console skins with detailed information
- **Shopping Cart**: Full e-commerce functionality with cart management
- **Admin Panel**: Manage products and orders
- **Custom Notifications**: Theme-matched toast notifications
- **Smooth Animations**: Engaging micro-animations and transitions

## 🚀 Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- React Icons
- Vite

### Backend
- Node.js
- Express
- CORS

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/LandingPage.git
   cd LandingPage
   ```

2. **Install dependencies**
   
   Install client dependencies:
   ```bash
   cd client
   npm install
   ```
   
   Install server dependencies:
   ```bash
   cd ../server
   npm install
   ```

## 🏃‍♂️ Running the Project

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

### Production Build

Build the client:
```bash
cd client
npm run build
```

## 📁 Project Structure

```
LandingPage/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   │   └── assets/        # Images, logos, product photos
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context (ShopContext)
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Backend Express server
│   ├── server.js          # Main server file
│   └── package.json
└── README.md
```

## 🎯 Key Components

- **Navbar**: Navigation with active tab highlighting and cart icon
- **Hero**: Eye-catching hero section with call-to-action
- **ProductShowcase**: Display products with add-to-cart functionality
- **Features**: Highlight key product benefits
- **HowItWorks**: Step-by-step guide for customers
- **Contact**: Contact information and social links
- **Admin Panel**: Product and order management

## 🎨 Color Scheme

- **Primary**: Nardo Gray (#808080)
- **Accent 1**: Neon Violet (#8B5CF6)
- **Accent 2**: Neon Teal (#14B8A6)
- **Background**: Black (#000000)
- **Highlight**: Yellow (#FFD700)

## 🛠️ Customization

To customize the theme colors, edit the Tailwind configuration in `client/tailwind.config.js`.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ for Slap On!

---

**Note**: Remember to update the GitHub repository URL in the installation section with your actual GitHub username.
