import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from '../../assets/images/logo.png'

const Login = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [err, setErr] = useState(false)

    const handleLogin = () => {
        console.log('run');
        if (email === 'demo@wavetec.com' && pass === '123456')
        {
            localStorage.setItem('isLoggedIn', true)
            window.location.reload()
        }
        else
        {
            setErr(true)
        }
    }

    console.log('pass', pass);

    return(
        <div className="login">
            <div className="login_top">
                <Link to='/'><img src={Logo} alt="" className="login_logo" /></Link>
            </div>
            <div className="login_body">
                <div className="login_box">
                    <p className="login_title">Log In</p>
                    <label>Email</label>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                    {err && <p className="login_err">Invalid Email or Password</p>}
                    <button onClick={() => handleLogin()}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default Login