import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>Login Page</h1>

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

            <button onClick={handleLogin}>Login</button>

        </div>
    )
}

export default LoginPage