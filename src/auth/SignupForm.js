import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert"
import { Button } from "reactstrap";

function SignupForm({ signup }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        isAdmin: false
    });
    const [formErrors, setFormErrors] = useState([]);
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        formData.username = formData.username.toLowerCase()
        let result = await signup({...formData, isAdmin: false });
        if (result.success) {
            navigate("/venture");
        } else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({...data, [name]: value }));
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label>Password</label>
                <input 
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label>Email</label>
                <input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }   

                <Button
                    type="submit"
                    onSubmit={handleSubmit}
                >
                  Submit
                </Button>
            </form>
        </div>
    )
}

export default SignupForm;