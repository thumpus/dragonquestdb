import React, { useEffect, useState } from "react";
import { CardGroup } from "reactstrap";
import LinkCard from "./LinkCard";
import DragonQuestApi from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';

function WeaponsList() {

    const [weapons, setWeapons] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(false);

    //fetch initial list of all weapons
    useEffect(() => {
        async function fetchAllWeapons() {
            const response = await DragonQuestApi.getWeapons();
            setWeapons(response);
        }
        fetchAllWeapons();
        setInfoLoaded(true);
    }, []);

    if (!infoLoaded || !weapons) return <h1>Loading...</h1>

    return (
        <React.Fragment>
            <br />
        <h1>Weapons</h1>
        {weapons.length 
        ? (
            <div class="row" style={{ display: "flex", padding: "50px"}}>
                <CardGroup width="100%" className="cardGroup">
                {weapons.map(w => (
                    <span><LinkCard 
                        type = "weapons" 
                        title = {w.name}
                        imgurl = {w.imgurl}
                        route = {w.id}
                        key = {w.id}/>
                    </span>
                ))}
                </CardGroup>
            </div>
        ) : (
            <p>No weapons found!</p>
        )}
        </React.Fragment>
    )
}

export default WeaponsList;