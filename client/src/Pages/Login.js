import React, { useState } from 'react';
import Api from '../Api/Api';
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [mobile, setmoblie] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
          
        try {

          const formdata ={
            mobile,
            password
          }

          const response = await Api.post('/auth/login',formdata)
          console.log(response.data.user);

         if(response.data.user.role === "client")
         {
            localStorage.setItem("Mental-App",JSON.stringify(response.data.user))
            navigator('/client');
         }
        else if(response.data.user.role === "helper")
        {
            localStorage.setItem("Mental-App",JSON.stringify(response.data.user))
            navigator('/helper')
        }
            
        } catch (error) {
            console.log(error);
        }
        

        setLoading(false);
    };


    return (
        <> 
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Mobile No:</label>
                    <input
                        type="number"
                        value={mobile}
                        onChange={(e) => setmoblie(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default Login;
