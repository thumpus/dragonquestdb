import React, { useContext, useEffect, useState } from 'react';
import UserContext from './auth/UserContext';
import Profile from "./Profile";
import { Card, CardImg, CardTitle } from "reactstrap";
import DragonQuestApi from './api';


function Shop () {
    const { currentUser } = useContext(UserContext);
    const [weapons, setWeapons] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(null);
    const [weapon, setWeapon] = useState(null);

    useEffect(() => {
        async function fetchWeapons() {
            const response = await DragonQuestApi.getWeapons();
            const responseWeapon = await DragonQuestApi.getWeapon(currentUser.weaponid);
            setWeapons(response);
            setWeapon(responseWeapon);
            setInfoLoaded(true);
        }
        fetchWeapons();
    })

    async function buyWeapon(id) {
        let weapon = await DragonQuestApi.getWeapon(id);
        if (currentUser.gold >= weapon.buyprice) {
            let newData = {
                gold: (currentUser.gold - weapon.buyprice),
                weaponid: (id)
            }
            await DragonQuestApi.editUser(currentUser.username, newData);
            window.location.reload();
        } else {
            alert("You don't have enough gold!")
        }
    }

    if (!infoLoaded) return <h1>Loading...</h1>
    return (
        <div>
            <br />
            <Profile currentUser={currentUser}/>
            <br />
            <h2>Current Weapon: {weapon.name}</h2>
            <br />
            {weapons.map(w => (
                <button onClick={buyWeapon.bind(this, w.id)}>
                <Card body className="text-center"
                style = {{
                    width: '12rem',
                    height: '16rem',
                    padding: '10px'
                }}>
                    <CardTitle>
                        <p>{w.name}</p>
                    </CardTitle>
                    <CardImg
                        bottom
                        alt={w.name}
                        src={w.imgurl}
                        style = {{width:'100px'}}
                    />
                        
                </Card>
                <p>Price: {w.buyprice}</p>
                <p>Modifier: +{w.modifier}</p>
            </button>
            ))}
            
        </div>
    )
}

export default Shop;