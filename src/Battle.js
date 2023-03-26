import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./auth/UserContext";
import Profile from "./Profile"
import DragonQuestApi from "./api";


function Battle () {
    const [monster, setMonster] = useState(null);
    const [hp, setHp] = useState(null);
    const [stats, setStats] = useState(null);
    const [nextLevel, setNextLevel] = useState(null);
    const [weapon, setWeapon] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(null)
    const { currentUser } = useContext(UserContext);
    
    useEffect(() => {
        async function fetchStats() {
            const response = await DragonQuestApi.getStats(currentUser.lvl);
            const responseNext = await DragonQuestApi.getStats((currentUser.lvl) + 1);
            const responseWeapon = await DragonQuestApi.getWeapon(currentUser.weaponid);
            setStats(response);
            setNextLevel(responseNext);
            setWeapon(responseWeapon);
            setInfoLoaded(true);
        }
        fetchStats();
    })

    const navigate = useNavigate();
    
   
    async function getMonster() {
        let id = Math.floor(Math.random() * 40 + 1);
        const response = await DragonQuestApi.getMonster(id);
        setMonster(response);
        setHp(response.hp)
    }

    function attack() {
        let dmg = ((stats.atk + weapon.modifier) - (monster.agility / 2)) / (2 + (Math.random() * 2));
        if (dmg < 0) {
            dmg = 1;
        }
        setHp(hp - dmg);
        checkVictory();
    }

    async function checkVictory() {
        
        if (hp <= 1) {
            setMonster(null);
            let newUserData;
            if ((currentUser.exp + monster.exp) >= nextLevel.exp){
                alert("Level up!")
                newUserData = {
                    lvl: (currentUser.lvl + 1),
                    exp: (currentUser.exp + monster.exp),
                    gold: (currentUser.gold + monster.gold),
                    kills: (currentUser.kills + 1)
                }
                } else {
                newUserData = {
                exp: (currentUser.exp + monster.exp),
                gold: (currentUser.gold + monster.gold),
                kills: (currentUser.kills + 1)
                }}   
            await DragonQuestApi.editUser(currentUser.username, newUserData);
            window.location.reload();
        }
        
     
    }

    
    if (!currentUser) navigate('/venture')
    if (!infoLoaded) return <h1>Loading...</h1>

    return (
        <React.Fragment>
      
        <Profile currentUser={currentUser}/>
        <br />
        {monster ? (
        <div>

            <h2>{monster.name}</h2>
            <img src = {monster.imgurl} style = {{width:'200px'}} alt = {monster.name}></img><br />
            <br />
            <progress value={hp} max={monster.hp}>{hp}</progress><br /> 
            <br />
            <button onClick={attack}>Attack!</button>
            
        </div>
        ) : 
        (<button onClick={getMonster}>Find Monster!</button>) }
        
        
        </React.Fragment>
    )
}

export default Battle;