import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'

const LandingPage = () => {
    return(
        <div className="landing">
            <div className="landing_inner">
                <div className="landing_logo">
                    <img src={Logo} alt="" />
                </div>
                <Link to="/login" className='landing_btn'>GET STARTED</Link>
            </div>
        </div>
    )
}

export default LandingPage