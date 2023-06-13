import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import LoginFormPage from "../LoginFormPage";

function HomePage() {
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(login('sixeyes@aa.io', 'password'));
    };

    return (
        <div className="home">
            <div>
                <h1>Please log in to view your groups</h1>
            </div>

            <div>
                <LoginFormPage />
            </div>

            <div>
                <button onClick={handleSubmit}>Demo User</button>
            </div>
        </div>
    )
}

export default HomePage
