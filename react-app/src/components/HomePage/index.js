import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import LoginFormPage from "../LoginFormPage";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
import SignupFormPage from "../SignupFormPage";
import "./HomePage.css"

function HomePage() {
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(true)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(login('sixeyes@aa.io', 'password'));
        history.push("/groups")
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

            <div className={isLogin ? "login-signup-sect isLogin" : "login-signup-sect isSignup"}>
                {isLogin ? (<LoginFormPage />) : (<SignupFormPage />)}

                <div className="home-footer">
                    {isLogin ? (<h3>Don't have an account? <button onClick={handleLogSign} className="login-signup-buttons">Sign Up!</button></h3>) : (<h3>Already have an account?<button onClick={handleLogSign} className="login-signup-buttons">Log in!</button></h3>)}
                    <button onClick={handleSubmit}>Demo User</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage
