import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/LoginPage.css";
import { userData } from "../../services/Connection";

function LoginPage() {
  return (
    <div className="login">
      <CredentialField />
    </div>
  );
}

function CredentialField() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLoginClick = () => {
    const matchData = (username) => {
      return userData.find((user) => user.username === username);
    };

    const matchedUser = matchData(username);

    if (matchedUser && matchedUser.password === password) {
      // Store the user data in local storage
      localStorage.setItem("userData", JSON.stringify(matchedUser));

      // console.log("Role:", matchedUser.role);
      // console.log(typeof matchedUser.username);
      switch (matchedUser.role) {
        case "user":
          navigate("/User");
          break;
        case "manager":
          navigate("/Manager");
          break;
        case "admin":
          navigate("/Admin");
          break;
        case "staff":
          navigate("/Staff");
          break;
        default:
          navigate("/");
          break;
      }
    } else {
      alert("Error: Invalid credentials");
    }
  };

  // const handleClick = () => {
  //   return userData.forEach((user) => {
  //     console.log(user.username);
  //   });
  // };

  return (
    <div className="credential">
      <button onClick={handleBackClick}>Back</button>
      <input
        onChange={handleUsernameInput}
        type="text"
        placeholder="Username"
      />
      <input
        onChange={handlePasswordInput}
        type="password"
        placeholder="Password"
      />
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
}

export default LoginPage;

/*


### Best Practices

1. **Secure Authentication**:
   - Always use secure methods to handle authentication, such as HTTPS and secure password hashing.
   - Never store plain-text passwords. Use libraries like bcrypt for hashing.

2. **Role-Based Access Control**:
   - Implement role-based access control on both frontend and backend to ensure security.
   - Validate user roles and permissions on the server-side to prevent unauthorized access.

3. **Redirecting After Login**:
   - Use `useNavigate` from `react-router-dom` for clean navigation based on user roles.
   - Ensure that the navigation logic is easy to maintain and extend.

4. **Error Handling**:
   - Provide user-friendly error messages for invalid credentials or other issues.
   - Consider using state management libraries like Redux or Context API to manage authentication state.

5. **Mock Authentication**:
   - Replace mock authentication with actual API calls to your backend service.
   - Use state management to handle user sessions and roles effectively.

*/

// JWT IMLIMENTATION
/*

To implement JWT authentication in your React app, you'll need to follow these steps:

1. **Update your login logic to handle JWT token issuance and storage.**
2. **Ensure secure storage of the JWT token on the client side.**
3. **Validate the token and use it for protected routes.**

Let's implement this in your existing code. Below are the optimized steps and code:

### 1. Update the Login Logic to Handle JWT Token

First, you need to update your backend to issue a JWT token upon successful login. Then, update the frontend login logic to handle the JWT token.

#### Backend (Express.js Example)

Here is a simple example of how you might issue a JWT token in your backend upon successful login:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [
  { username: 'johndoe', password: 'securepasswordhash1', role: 'user' },
  // Add more users as needed
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### 2. Update the Frontend Logic

Update your React login logic to handle the JWT token:

#### Frontend (`LoginPage.jsx`)

```javascript
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/LoginPage.css';

function LoginPage() {
  return (
    <div className="login">
      <CredentialField />
    </div>
  );
}

function CredentialField() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLoginClick = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        // Store the token in localStorage or cookies
        localStorage.setItem('jwtToken', token);

        // Decode the token to get the user role
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userRole = decodedToken.role;

        // Navigate to the respective dashboard based on user role
        switch (userRole) {
          case 'user':
            navigate('/User');
            break;
          case 'manager':
            navigate('/Manager');
            break;
          case 'admin':
            navigate('/Admin');
            break;
          case 'staff':
            navigate('/Staff');
            break;
          default:
            navigate('/');
            break;
        }
      } else {
        alert('Error: Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="credential">
      <input type="text" placeholder="Username" value={username} onChange={handleUsernameInput} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordInput} />
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default LoginPage;
```

### Explanation

1. **Backend**:
   - When the user logs in, the backend verifies the credentials and issues a JWT token containing the username and role.

2. **Frontend**:
   - The login function sends a request to the backend with the login credentials.
   - If the credentials are valid, the backend responds with a JWT token.
   - The frontend stores the token in `localStorage`.
   - The token is decoded to get the user role and the user is navigated to the appropriate dashboard based on their role.

### Token Storage and Security

For added security, consider using secure HTTP-only cookies for storing the JWT token to prevent XSS attacks. However, this might require server-side adjustments and is more complex than using `localStorage`.

With this setup, you have a secure and scalable method for handling user sessions with JWTs. If you need further details or have more questions, feel free to ask! 😊















Yes, having a backend is essential for handling JWTs effectively. Here's why a backend is necessary:

### Why You Need a Backend for JWT

1. **Authentication and Issuing Tokens**: 
   - The backend is responsible for authenticating users and issuing JWTs upon successful login. This involves verifying the user's credentials against a database and generating a signed token.

2. **Secure Token Handling**:
   - The backend securely handles the secret key used to sign the JWT. This secret key must be kept confidential to ensure that the tokens cannot be tampered with.

3. **Token Validation**:
   - The backend can validate incoming JWTs on protected routes to ensure that the user is authenticated and authorized to access certain resources.

4. **Role-Based Access Control**:
   - The backend can decode the JWT to retrieve user information (e.g., roles, permissions) and enforce role-based access control.

### Basic Workflow for JWT with Backend

1. **User Login**:
   - The user sends their credentials (username and password) to the backend.
   - The backend verifies the credentials and, if valid, generates a JWT.

2. **Token Storage**:
   - The token is sent back to the client, which stores it securely (e.g., in localStorage, sessionStorage, or HTTP-only cookies).

3. **Authenticated Requests**:
   - For subsequent requests, the client includes the JWT in the authorization header.
   - The backend validates the token and grants access to protected resources.

### Example Backend Implementation (Node.js with Express)

Here's a simple example of how you might set up a backend to handle JWTs using Node.js and Express:

#### Install Dependencies

```bash
npm install express body-parser jsonwebtoken
```

#### Create the Backend Server

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const users = [
  { username: 'johndoe', password: 'securepasswordhash1', role: 'user' },
  // Add more users as needed
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}!` });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Frontend Integration

Update your frontend to handle the token received from the backend, as shown in the previous example:

#### Frontend (`LoginPage.jsx`)

```javascript
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/LoginPage.css';

function LoginPage() {
  return (
    <div className="login">
      <CredentialField />
    </div>
  );
}

function CredentialField() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLoginClick = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        // Store the token in localStorage or cookies
        localStorage.setItem('jwtToken', token);

        // Decode the token to get the user role
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userRole = decodedToken.role;

        // Navigate to the respective dashboard based on user role
        switch (userRole) {
          case 'user':
            navigate('/User');
            break;
          case 'manager':
            navigate('/Manager');
            break;
          case 'admin':
            navigate('/Admin');
            break;
          case 'staff':
            navigate('/Staff');
            break;
          default:
            navigate('/');
            break;
        }
      } else {
        alert('Error: Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="credential">
      <input type="text" placeholder="Username" value={username} onChange={handleUsernameInput} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordInput} />
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default LoginPage;
```

### Summary

Using a backend to handle JWT authentication ensures secure and robust session management, protecting your application against various security vulnerabilities. If you have any more questions or need further assistance, feel free to ask! 😊

*/
