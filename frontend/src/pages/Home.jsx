import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

function Home() {
  const navigate = useNavigate();

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

    <div class = "homepage">
      <p1 style = {{marginTop: '3rem'}}>Welcome to</p1>
    <p1 style={{color: 'rgb(86, 185, 255)', fontSize: '100px'}}>Smart Notes</p1>
      <p2>Capture, organize, and access your ideas effortlessly anytime, anywhere</p2>
      <div>
      <button class = 'homebuttonL' onClick={() => navigate('/login')}>Login</button>
      <button class = 'homebuttonR' onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
    </>
  );
}

export default Home;