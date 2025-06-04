import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'

function LoginPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login',
            {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email})
            }
        );

        if (response.ok) {
            navigate('/browse');
        } else {
            alert('login failed :( try again')
        }
    };

    return (
        <div className="login-background">
            <div className="login-content">
                <h1>Dog Finder</h1>

                <div className="login-container">
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <br></br>

                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <br></br>

                    <button onClick={handleLogin}>login</button>
                </div>
            </div>
            

            

        </div>
    )
}

export default LoginPage