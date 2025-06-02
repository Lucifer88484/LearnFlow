# 🚀 LMS Platform Setup Guide

This guide will help you set up the LMS Platform on your local machine and deploy it to production.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 16+** and npm
- **Git** for version control
- **Firebase CLI** (install with `npm install -g firebase-tools`)
- **Google AI Studio account** for Gemini API access

## 🔧 Local Development Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Lucifer88484/LearnFlow.git
cd LearnFlow

# Install dependencies
npm install
```

### 2. Firebase Project Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "my-lms-platform")
4. Enable Google Analytics (optional)
5. Create project

#### Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Add your domain to **Authorized domains** (for production)

#### Set up Firestore Database
1. Go to **Firestore Database** → **Create database**
2. Choose **Start in production mode**
3. Select a location close to your users
4. Create database

#### Get Firebase Configuration
1. Go to **Project Settings** → **General**
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the configuration object

### 3. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Update `.env` with your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key

# Application Configuration
VITE_APP_NAME=My LMS Platform
VITE_APP_VERSION=1.0.0
```

### 4. Gemini AI Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `VITE_GEMINI_API_KEY`

### 5. Firebase Security Rules

Deploy the Firestore security rules:

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules
```

### 6. Start Development Server

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`

## 🎯 Testing the Application

### Default Demo Accounts

The application includes demo information on the login page:

- **Student**: `student@demo.com` / `password123`
- **Instructor**: `instructor@demo.com` / `password123`
- **Admin**: `admin@demo.com` / `password123`

### Creating Real Accounts

1. Click "Sign up" on the login page
2. Fill in the registration form
3. Choose your role (Student/Instructor)
4. Complete registration

### Testing AI Features

1. Navigate to the **Demo** page (available in the navigation)
2. Try the AI-powered features:
   - Course creation with AI assistance
   - Quiz generation from course content
   - Interactive quiz taking
   - Progress tracking

## 🚀 Production Deployment

### Option 1: Firebase Hosting

```bash
# Build the project
npm run build

# Initialize Firebase Hosting
firebase init hosting

# Deploy to Firebase
firebase deploy
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts to configure your deployment
```

### Option 3: Netlify

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 🔒 Security Configuration

### Firestore Security Rules

The included `firestore.rules` file provides:

- **Role-based access control**
- **User data protection**
- **Course and content security**
- **Admin-only system settings**

### Environment Variables

Never commit your `.env` file to version control. For production:

1. Set environment variables in your hosting platform
2. Use secure secret management
3. Rotate API keys regularly

## 📊 Monitoring and Analytics

### Firebase Analytics

1. Enable Analytics in Firebase Console
2. Add analytics tracking to your app
3. Monitor user engagement and performance

### Error Monitoring

Consider adding error monitoring services:

- **Sentry** for error tracking
- **LogRocket** for session replay
- **Firebase Crashlytics** for crash reporting

## 🔧 Customization

### Branding

1. Update `VITE_APP_NAME` in environment variables
2. Replace logo and favicon in `public/` directory
3. Customize colors in `tailwind.config.js`

### Features

The platform is modular. You can:

- Add new user roles
- Extend course content types
- Integrate additional AI services
- Add payment processing
- Implement video streaming

### Styling

- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for design system changes
- Create new components in `src/components/`

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Firebase Connection Issues:**
- Verify API keys in `.env`
- Check Firebase project settings
- Ensure Firestore is enabled

**AI Features Not Working:**
- Verify Gemini API key
- Check API quotas in Google AI Studio
- Review network connectivity

**Authentication Issues:**
- Check Firebase Auth configuration
- Verify authorized domains
- Review security rules

### Getting Help

1. Check the [GitHub Issues](https://github.com/Lucifer88484/LearnFlow/issues)
2. Review Firebase documentation
3. Check Gemini AI documentation
4. Join our community discussions

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Gemini AI Documentation](https://ai.google.dev/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Need help?** Open an issue or contact the maintainer at [hrishikeshmohite001@gmail.com](mailto:hrishikeshmohite001@gmail.com)

**Developer:** Hrishikesh Mohite
**Website:** [www.hrishikeshmohite.com](https://www.hrishikeshmohite.com)
**GitHub:** [https://github.com/Lucifer88484](https://github.com/Lucifer88484)
