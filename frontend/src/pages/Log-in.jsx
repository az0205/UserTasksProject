import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import API from "../api/axios";

const Login = () => {
    
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();

        const email = (document.getElementById('email')).value;
        const password = (document.getElementById('password')).value;

        try {
            const res = await API.post("/auth/login", { email, password });

            localStorage.setItem("token", res.data.token);
            navigate("/main");
        }

        catch (err) {
            alert('Invalid credentials!');
        }

        /*const localUsers = localStorage.getItem('users');
        const users = (localUsers != null) ? JSON.parse(localUsers) : [];

        const email = (document.getElementById('email')).value;
        const password = (document.getElementById('password')).value;

        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
        localStorage.setItem('currentUser', user.email);
        localStorage.setItem('currentUsername', user.name);
        navigate('/main');
        }
        else {
        alert('Invalid credentials!');
        }*/
    };

    return (
<>
        <header>
    <div class="logo"></div>
    <nav>
      <Link to="/" class='nav'>Home</Link>
      <Link to="/login" class='nav'>Login</Link>
      <Link to="/register" class='nav'>Register</Link>
      
    </nav>
    </header>
        <div class = 'formPage'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" id = "email"  required /><br/>
            <input type="password" placeholder="Password" id = "password" required /><br/>
            <button type="submit">Login</button>
        </form>
            <br/>
            <p> Don't have an account?</p>
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
        </>
    )
};

export default Login;