import React, { useContext, useState, useEffect } from "react";
import UserContext from "./auth/UserContext";
import SignUpForm from "./auth/SignupForm"
import LoginForm from "./auth/LoginForm"
import Profile from "./Profile.js";
import { Link } from "react-router-dom";
import DragonQuestApi from "./api";
import './App.css';


function VentureForthHome({ login, signup, logout }) {

    const [users, setUsers] = useState(null);
    const { currentUser } = useContext(UserContext);
    const [infoLoaded, setInfoLoaded] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            const response = await DragonQuestApi.getUsers();
            setUsers(response);
            setInfoLoaded(true);
        }
        fetchUsers();
    })

    function loggedOut() {
        return (
            <div>
                <SignUpForm signup = {signup} />
                <LoginForm login = {login} />
            </div>
        )
    }

    function loggedIn() {
        return (
            <div>
            
            <Link to={'/venture/battle'}><button>Venture Forth!</button></Link>
            <br />
            <br />
            <Profile currentUser={currentUser} />
            <br />
            <Link to={'/venture/shop'}><button>Weapon Shop</button></Link><br />
            <br />
            <button onClick={logout}>Log out</button>
    
            </div>
        )
    }

    function leaderboard() {
        return (
            <div>
                <br />
                <h1>Leaderboard</h1>
                
                <table>
                    <th>Username</th>
                    <th>Level</th>
                    <th>Kills</th>
                {users.map(u => (
                    <tr>
                        <td>{u.username}</td>
                        <td>{u.lvl}</td>
                        <td>{u.kills}</td>
                    </tr>
                ))}
                </table>
            </div>
        )
    }  

    if (!infoLoaded) return <h1>Loading...</h1>

    return(
        <div>
            <br />
            <h1>VENTURE FORTH!</h1>
            <img src='https://i.imgur.com/sWDpz31.png' width = '500rem' alt = 'Dragon Quest Box Art'></img>
            <p>A simple game where you smack monsters who won't even fight back! <br />
                Gain gold to buy new weapons and work your way to become the most notorious killer in all of Alefgard!
            </p>
            <div>
            {currentUser ? loggedIn() : loggedOut() }

            {leaderboard()}
            </div>
            <br />
        </div>
    )
}

export default VentureForthHome;