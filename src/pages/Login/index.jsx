import { Link, useNavigate } from "react-router-dom"
import Logo from '../../assets/images/logo.png'

const Login = () => {
    const navigate = useNavigate()
    return(
        <div className="login">
            <div className="login_top">
                <Link to='/'><img src={Logo} alt="" className="login_logo" /></Link>
            </div>
            <div className="login_body">
                <div className="login_box">
                    <p className="login_title">Log In</p>
                    <label>Email</label>
                    <input type="email" placeholder="Email" />
                    <label>Password</label>
                    <input type="password" placeholder="Password" />
                    <button onClick={() => navigate('/home')}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default Login