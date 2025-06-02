# Contributing to LearnFlow

Thank you for your interest in contributing to LearnFlow! This document provides guidelines and information for contributors to help maintain code quality and ensure a smooth collaboration process.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Testing](#testing)
- [Documentation](#documentation)

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background, experience level, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory language
- Personal attacks or political discussions
- Publishing private information without permission
- Any conduct that would be inappropriate in a professional setting

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 16+ and npm installed
- Git for version control
- A GitHub account
- Basic knowledge of React, JavaScript, and Firebase
- Familiarity with Tailwind CSS (preferred)

### First-Time Contributors

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/LearnFlow.git
   cd LearnFlow
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Lucifer88484/LearnFlow.git
   ```
4. **Follow the development setup** instructions below

## 🔧 Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Update `.env` with your Firebase and Gemini API credentials. See [SETUP.md](SETUP.md) for detailed configuration instructions.

### 3. Start Development Server

```bash
npm run dev
```

Your development server will be available at `http://localhost:5173`

### 4. Verify Setup

- Test authentication with demo accounts
- Try creating a course (instructor role)
- Test AI features with valid Gemini API key
- Ensure all components render correctly

## 📝 Contributing Guidelines

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features (e.g., `feature/quiz-timer`)
- `fix/` - Bug fixes (e.g., `fix/login-validation`)
- `docs/` - Documentation updates (e.g., `docs/api-reference`)
- `refactor/` - Code refactoring (e.g., `refactor/auth-context`)
- `style/` - UI/styling changes (e.g., `style/responsive-header`)

### Commit Message Format

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add password reset functionality
fix(quiz): resolve timer not stopping on completion
docs(readme): update installation instructions
```

### Development Workflow

1. **Create a new branch** from `main`:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our code standards

3. **Test your changes** thoroughly:
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat(scope): your descriptive message"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## 🎨 Code Standards

### JavaScript/React Standards

- **Use functional components** with hooks
- **Follow React best practices**:
  - Use `useState` and `useEffect` appropriately
  - Implement proper error boundaries
  - Use `useCallback` and `useMemo` for optimization when needed
- **Prop validation**: Use PropTypes or TypeScript interfaces
- **Component structure**:
  ```jsx
  // Imports
  import React from 'react';
  
  // Component documentation
  /**
   * Component description
   * @param {Object} props - Component props
   */
  const ComponentName = ({ prop1, prop2 }) => {
    // Hooks
    // Event handlers
    // Render logic
    
    return (
      // JSX
    );
  };
  
  export default ComponentName;
  ```

### CSS/Styling Standards

- **Use Tailwind CSS** for styling
- **Follow responsive design** principles
- **Use semantic class names** when custom CSS is needed
- **Maintain consistent spacing** using Tailwind's spacing scale
- **Ensure accessibility** with proper ARIA labels and keyboard navigation

### File Organization

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── auth/         # Authentication components
│   ├── course/       # Course-related components
│   └── layout/       # Layout components
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # External service integrations
├── utils/            # Utility functions
└── types/            # Type definitions
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Files**: camelCase for utilities, PascalCase for components
- **Variables**: camelCase (e.g., `userName`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)
- **Functions**: camelCase with descriptive names (e.g., `handleUserLogin`)

## 🔄 Pull Request Process

### Before Submitting

1. **Ensure your code follows** our standards
2. **Run linting and tests**:
   ```bash
   npm run lint
   npm run build
   ```
3. **Update documentation** if needed
4. **Test your changes** in different browsers and screen sizes
5. **Rebase your branch** on the latest main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Pull Request Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] Tested on different screen sizes
- [ ] Tested with different user roles
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated checks** must pass (linting, build)
2. **Code review** by maintainers
3. **Testing** in development environment
4. **Approval** and merge by maintainers

## 🐛 Issue Reporting

### Bug Reports

Use the bug report template and include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (browser, OS, screen size)
- **Screenshots or videos** if applicable
- **Console errors** if any

### Security Issues

For security vulnerabilities:
- **Do not** create public issues
- **Email directly**: hrishikeshmohite001@gmail.com
- **Include** detailed description and reproduction steps

## 💡 Feature Requests

When suggesting new features:

- **Check existing issues** to avoid duplicates
- **Provide clear use case** and benefits
- **Consider implementation complexity**
- **Discuss with maintainers** before starting work

## 🧪 Testing

### Manual Testing

- **Test all user roles** (Student, Instructor, Admin)
- **Verify responsive design** on different screen sizes
- **Check browser compatibility** (Chrome, Firefox, Safari, Edge)
- **Test accessibility** with keyboard navigation and screen readers

### Automated Testing

We encourage adding tests for:
- **Component functionality**
- **Utility functions**
- **API integrations**
- **User workflows**

## 📚 Documentation

### Code Documentation

- **Add JSDoc comments** for functions and components
- **Include prop descriptions** for React components
- **Document complex logic** with inline comments
- **Update README.md** for significant changes

### API Documentation

- **Document new endpoints** or service integrations
- **Include request/response examples**
- **Update environment variable documentation**

## 🙏 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: hrishikeshmohite001@gmail.com for direct contact

## 📄 License

By contributing to LearnFlow, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

**Thank you for contributing to LearnFlow!** 🎓✨

Your contributions help make online education more accessible and effective for everyone.
