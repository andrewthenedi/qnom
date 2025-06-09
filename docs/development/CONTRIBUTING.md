# Contributing to QNom

Thank you for your interest in contributing to QNom! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We pledge to:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on collaboration over conflict

### Unacceptable Behavior

- Harassment, discrimination, or hate speech
- Trolling, insulting, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct deemed inappropriate

## Getting Started

1. **Fork the Repository**
   ```bash
   # Fork via GitHub UI, then clone your fork
   git clone https://github.com/YOUR_USERNAME/qnom.git
   cd qnom
   ```

2. **Set Up Development Environment**
   - Follow the [Setup Guide](SETUP.md)
   - Ensure all tests pass before making changes

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

**Bug Report Template:**
```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS 12.0]
- Node version: [e.g., 18.12.0]
- Browser: [if applicable]

## Additional Context
Any other relevant information
```

### Suggesting Features

Feature requests are welcome! Please provide:

**Feature Request Template:**
```markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Mockups, examples, or other relevant information
```

### Submitting Code

1. **Small Changes** (typos, small bugs)
   - Can be submitted directly via PR
   - Include clear description

2. **Large Changes** (new features, major refactoring)
   - Open an issue first for discussion
   - Get approval before implementing
   - Break into smaller PRs if possible

## Development Process

### 1. Issue Assignment

- Check the issue tracker for available tasks
- Comment on an issue to claim it
- Wait for assignment before starting work
- Ask questions if requirements are unclear

### 2. Development Workflow

```bash
# 1. Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# 2. Create feature branch
git checkout -b feature/issue-123-new-feature

# 3. Make changes
# ... edit files ...

# 4. Run tests
npm test

# 5. Commit changes
git add .
git commit -m "feat: add new feature (#123)"

# 6. Push to your fork
git push origin feature/issue-123-new-feature
```

### 3. Code Review Process

- All code must be reviewed before merging
- Address all review comments
- Keep discussions professional and constructive
- Re-request review after making changes

## Coding Standards

### JavaScript/TypeScript

```javascript
// Use meaningful variable names
const userEmail = 'user@example.com'; // Good
const e = 'user@example.com'; // Bad

// Use async/await over promises
// Good
async function fetchUser(id) {
  try {
    const user = await db.users.findById(id);
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

// Avoid deeply nested code
// Use early returns
function processUser(user) {
  if (!user) {
    return null;
  }
  
  if (!user.isActive) {
    return null;
  }
  
  // Process active user
  return transformUser(user);
}
```

### File Organization

```
src/
├── api/
│   ├── routes/       # API route definitions
│   ├── validators/   # Request validation
│   └── index.js      # Route aggregation
├── controllers/      # Business logic
├── models/           # Data models
├── services/         # External services
├── utils/            # Utility functions
└── config/           # Configuration
```

### Naming Conventions

- **Files**: kebab-case (e.g., `user-service.js`)
- **Classes**: PascalCase (e.g., `UserService`)
- **Functions**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Interfaces**: PascalCase with 'I' prefix (e.g., `IUserService`)

### Code Quality Rules

1. **No console.log in production code**
   ```javascript
   // Use proper logging
   logger.info('User created', { userId: user.id });
   ```

2. **Handle errors properly**
   ```javascript
   try {
     await riskyOperation();
   } catch (error) {
     logger.error('Operation failed', error);
     throw new AppError('Operation failed', 500);
   }
   ```

3. **Validate input**
   ```javascript
   function createUser(data) {
     if (!data.email || !isValidEmail(data.email)) {
       throw new ValidationError('Invalid email');
     }
     // ... rest of function
   }
   ```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Test additions or corrections
- **chore**: Maintenance tasks
- **ci**: CI/CD changes

### Examples

```bash
# Feature
feat(auth): add OAuth2 integration

# Bug fix
fix(api): handle null user in profile endpoint

# Documentation
docs(readme): update installation instructions

# With scope and body
feat(user): add email verification

- Add verification token generation
- Send verification email on signup
- Add endpoint to verify token

Closes #123
```

### Commit Best Practices

1. Keep commits atomic and focused
2. Write clear, descriptive messages
3. Reference issues when applicable
4. Use present tense ("add" not "added")
5. Keep subject line under 50 characters

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] Commit messages follow guidelines
- [ ] Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No console.log statements
- [ ] No commented-out code
```

### Review Process

1. **Automated Checks**
   - CI/CD must pass
   - Code coverage maintained
   - No linting errors

2. **Code Review**
   - At least one approval required
   - Address all feedback
   - Resolve all conversations

3. **Merge Requirements**
   - Squash commits if needed
   - Update branch with main
   - Delete branch after merge

## Testing Guidelines

### Test Structure

```javascript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user with valid data', async () => {
      // Arrange
      const userData = { email: 'test@example.com' };
      
      // Act
      const user = await userService.createUser(userData);
      
      // Assert
      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
    });
    
    it('should throw error with invalid email', async () => {
      // Arrange
      const userData = { email: 'invalid-email' };
      
      // Act & Assert
      await expect(userService.createUser(userData))
        .rejects.toThrow('Invalid email');
    });
  });
});
```

### Testing Requirements

1. **Unit Tests**
   - Test individual functions/methods
   - Mock external dependencies
   - Aim for 80%+ coverage

2. **Integration Tests**
   - Test API endpoints
   - Test database operations
   - Test service interactions

3. **E2E Tests** (when applicable)
   - Test critical user flows
   - Test across different browsers
   - Test error scenarios

### Test Best Practices

- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Test edge cases
- Keep tests independent
- Use factories for test data

## Documentation

### Code Documentation

```javascript
/**
 * Creates a new user in the system
 * @param {Object} userData - User data object
 * @param {string} userData.email - User's email address
 * @param {string} userData.name - User's full name
 * @returns {Promise<User>} The created user object
 * @throws {ValidationError} If user data is invalid
 * @throws {DuplicateError} If email already exists
 */
async function createUser(userData) {
  // Implementation
}
```

### API Documentation

- Document all endpoints
- Include request/response examples
- Document error responses
- Keep OpenAPI/Swagger spec updated

### README Updates

Update README when:
- Adding new features
- Changing setup process
- Adding dependencies
- Changing configuration

## Community

### Getting Help

- **Discord**: [Join our Discord](https://discord.gg/qnom)
- **Discussions**: Use GitHub Discussions
- **Issues**: Check existing issues first
- **Stack Overflow**: Tag with `qnom`

### Communication Channels

1. **GitHub Issues**: Bug reports, feature requests
2. **GitHub Discussions**: General questions, ideas
3. **Discord**: Real-time chat, quick questions
4. **Email**: security@qnom.io (security issues only)

### Recognition

We value all contributions! Contributors are:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in commit messages

## License

By contributing to QNom, you agree that your contributions will be licensed under the project's license.

## Questions?

If you have questions about contributing, please:
1. Check this guide
2. Search existing issues/discussions
3. Ask in Discord
4. Create a new discussion

Thank you for contributing to QNom! 🎉