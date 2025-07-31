import { useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async(e) => {

        e.preventDefault();

        const email = (document.getElementById('email')).value;
        const password = (document.getElementById('password')).value;
        const name = (document.getElementById('name')).value;

        try {
            await API.post("/auth/register", { name, email, password });

            navigate("/login");
        }
        catch(err){
            alert("User with this email already exists")
        }


        /*const localUsers = localStorage.getItem('users');
        const users = (localUsers != null) ? JSON.parse(localUsers) : [];
        
        const email = (document.getElementById('email')).value;
        const password = (document.getElementById('password')).value;
        const name = (document.getElementById('name')).value;

        if (users.find(user => user.email === email)) {
            alert('User already exists!');
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        navigate("/login");*/
    }
    


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
            <h1>Register</h1>
            <form onSubmit= {handleRegister}>
                <input type="text" placeholder="Name" id = "name" required /><br/>
                <input type="email" placeholder="Email" id = "email" required /><br/>
                <input type="password" placeholder="Password" id = "password" required /><br/>
                <button type="submit">Register</button>
            </form>
            <br/>
            <p> Already have an account?</p>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
        </>
    )
};

export default Register;