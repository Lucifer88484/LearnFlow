<div align="center">
  <img src="public/assets/logos/learnflow-logo.svg" alt="LearnFlow" width="300" />

  <h1>LearnFlow</h1>
  <p><strong>A comprehensive, modern Learning Management System</strong></p>

  <p>Built with React, Firebase, and Gemini AI. This open-source platform provides a complete solution for online education with role-based access control, AI-powered content generation, and real-time collaboration features.</p>

  <p>
    <a href="#-quick-start"><strong>Quick Start</strong></a> •
    <a href="#-features"><strong>Features</strong></a> •
    <a href="#-demo"><strong>Demo</strong></a> •
    <a href="#-deployment"><strong>Deployment</strong></a> •
    <a href="#-contributing"><strong>Contributing</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18+-blue?logo=react" alt="React 18+" />
    <img src="https://img.shields.io/badge/Firebase-Latest-orange?logo=firebase" alt="Firebase" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/AI-Gemini%202.0-purple?logo=google" alt="Gemini AI" />
    <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
  </p>
</div>

---

## ✨ Features

### 🔐 Authentication & User Management
- **Firebase Authentication** with email/password
- **Role-based access control** (Student, Instructor, Admin)
- **User profile management** with customizable profiles
- **Persistent login sessions** with automatic token refresh

### 📚 Course Management
- **Hierarchical course structure** (Courses → Modules → Lessons)
- **Multiple content types** (Text, Video, PDF, Interactive)
- **Course discovery** with search and filtering
- **Enrollment system** with instant access
- **Progress tracking** with completion percentages

### 🧠 AI-Powered Features (Gemini 2.0 Flash)
- **Automated quiz generation** from course content
- **Learning objective creation** based on course descriptions
- **Content enhancement** and expansion
- **Course outline generation** for instructors

### 📝 Assessment System
- **Interactive quiz builder** with multiple question types
- **Real-time scoring** and immediate feedback
- **Multiple attempt tracking** with progress saving
- **Detailed analytics** for instructors

### 💬 Discussion & Collaboration
- **Threaded comment system** for each lesson
- **Real-time updates** using Firestore listeners
- **Instructor response highlighting**
- **Moderation tools** for content management

### 📊 Analytics & Progress Tracking
- **Student progress dashboards** with visual indicators
- **Instructor analytics** with enrollment and completion rates
- **Admin platform overview** with comprehensive statistics
- **Achievement badges** and milestone tracking

### 🎨 Modern UI/UX
- **Responsive design** optimized for all devices
- **Tailwind CSS** with custom design system
- **Dark/light mode support** (coming soon)
- **Accessibility compliant** with ARIA labels and keyboard navigation
- **Loading states** and error boundaries throughout

## 🛠️ Technology Stack

### Frontend
- **React 18+** with functional components and hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling and responsive design
- **Lucide React** for consistent iconography

### Backend & Database
- **Firebase Firestore** for real-time database
- **Firebase Authentication** for user management
- **Firebase Storage** for file uploads (ready for implementation)

### AI Integration
- **Google Gemini 2.0 Flash** for content generation
- **Custom AI prompts** optimized for educational content

### Development Tools
- **ESLint** for code quality
- **PostCSS** for CSS processing
- **Autoprefixer** for browser compatibility

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Firebase project with Firestore and Authentication enabled
- Google AI Studio account for Gemini API access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lucifer88484/LearnFlow.git
   cd LearnFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your actual Firebase and Gemini API credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication and Firestore Database

### 2. Configure Authentication
1. In Firebase Console, go to Authentication → Sign-in method
2. Enable Email/Password authentication
3. Add your domain to authorized domains

### 3. Set up Firestore Database
1. Create a Firestore database in production mode
2. Update security rules (see `firestore.rules` in project)

### 4. Get Configuration
1. Go to Project Settings → General
2. Scroll down to "Your apps" and click the web icon
3. Copy the configuration object to your `.env` file

## 🤖 Gemini AI Setup

1. **Get API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file as `VITE_GEMINI_API_KEY`

2. **Configure Usage**
   - The app uses Gemini 2.0 Flash model for content generation
   - Customize prompts in `src/services/gemini.js`
   - Monitor usage in Google AI Studio dashboard

## 👥 User Roles & Permissions

### 🎓 Student
- Browse and enroll in courses
- Access course content and lessons
- Take quizzes and track progress
- Participate in discussions
- View personal dashboard with progress

### 👨‍🏫 Instructor
- Create and manage courses
- Add lessons and course content
- Create quizzes with AI assistance
- Monitor student progress
- Respond to student discussions
- Access instructor analytics

### 👑 Admin
- Manage all users and roles
- Oversee all courses and content
- Access platform-wide analytics
- Moderate discussions and content
- Configure platform settings

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card)
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── course/         # Course-related components
│   ├── quiz/           # Quiz and assessment components
│   └── discussion/     # Discussion and comment components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # External service integrations
├── utils/              # Utility functions
└── types/              # TypeScript type definitions (future)
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License & Legal

### Open Source License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Commercial Use & Attribution
While LearnFlow is open source and free to use, we kindly request proper attribution for commercial deployments:

#### ✅ **Permitted Uses**
- ✅ Personal and educational use
- ✅ Internal company training systems
- ✅ Non-profit educational institutions
- ✅ Modification and redistribution
- ✅ Commercial use with proper attribution

#### 📋 **Attribution Requirements for Commercial Use**
- Include "Powered by LearnFlow" in your application footer or about page
- Link back to the original LearnFlow repository
- Maintain copyright notices in source code
- Consider contributing improvements back to the project

#### 🏷️ **Trademark Notice**
The "LearnFlow" name and logo are trademarks of Hrishikesh Mohite. For commercial use:
- **Recommended**: Use your own branding and logo
- **Required**: Obtain permission for LearnFlow trademark usage
- **Contact**: hrishikeshmohite001@gmail.com for commercial licensing

#### ⚖️ **Legal Disclaimer**
- Software provided "as is" without warranty
- Suitable for production but requires proper security auditing
- Authors not liable for damages or issues
- Third-party licenses must be maintained

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Firebase Team** for the backend infrastructure
- **Google AI** for Gemini API access
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions
- **Email**: Contact the maintainer at hrishikeshmohite001@gmail.com
- **Website**: www.hrishikeshmohite.com
- **GitHub**: https://github.com/Lucifer88484

---

<div align="center">
  <img src="public/assets/logos/learnflow-horizontal.svg" alt="LearnFlow" width="200" />

  <p><strong>Built with ❤️ by Hrishikesh Mohite</strong></p>
  <p>Empowering education through technology</p>

  <p>
    <a href="https://www.hrishikeshmohite.com">🌐 Website</a> •
    <a href="https://github.com/Lucifer88484">💻 GitHub</a> •
    <a href="mailto:hrishikeshmohite001@gmail.com">📧 Email</a>
  </p>
</div>
