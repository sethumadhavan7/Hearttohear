import React, { useState } from 'react';
import Api from '../Api/Api';

const Register = () => {
    const [userName, setUsername] = useState('');
    const [age, setAge] = useState(undefined);
    const [mobile, setMobile] = useState('');
    const [mail, setMail] = useState('');
    const [interests, setInterests] = useState([]);
    const [language, setLanguage] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confrimpassword, setconfrimpassword] = useState('');

    
    const handleRegister = async(e) => {
        e.preventDefault();
        
        const formData = {
            userName,
            age,
            mobile,
            mail,
            interests,
            language,
            gender,
            role,
            password
        };
        try {
            if(mobile.length === 10 && confrimpassword === password){
                console.log(formData)
                const response = await Api.post('/auth/register',formData)
                console.log(response.data)

            }
          else{
            alert("make fill form correctly")
          }
        } catch (error) {
            console.log(error)
        }
      
       
    };

   

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div>
                    <label>Mobile:</label>
                    <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Interests:</label>
                    <select
                      
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                    >
                       <option value="">Select Interrest</option>
                        <option value="Sports">Sports</option>
                        <option value="Song">Lisiting Song</option>
                        <option value="Travelling">Travelling</option>
                    </select>
                </div>
                <div>
                    <label>Language:</label>
                    <input
                        type="text"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="client">client</option>
                        <option value="helper">helper</option>
                    </select>
                </div>
                <div>
                    <label>confirm Password:</label>
                    <input
                        type="password"
                        value={confrimpassword}
                        onChange={(e) => setconfrimpassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
