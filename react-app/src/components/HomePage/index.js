import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import LoginFormPage from "../LoginFormPage";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
import SignupFormPage from "../SignupFormPage";
import "./HomePage.css"

function HomePage() {
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(login('sixeyes@aa.io', 'password'));
    };

    const handleLogSign = async (e) => {
        e.preventDefault();

        setIsLogin(!isLogin);
    }

    return (
        <div className="home">
            <div className="home-header">
                <h1>Please log in to view your groups</h1>
            </div>

            <div className="login-signup-sect">
                {isLogin ? (<LoginFormPage />) : (<SignupFormPage />)}
            </div>

            <div className="home-footer">
                {isLogin ? (<h3>Don't have an account? <button onClick={handleLogSign}>Sign Up</button></h3>) : (<h3>Already have an account? <button onClick={handleLogSign}>Log in</button></h3>)}
                <button onClick={handleSubmit}>Demo User</button>
            </div>
        </div>
    )
}

export default HomePage
