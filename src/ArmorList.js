import React, { useEffect, useState } from "react";
import { CardGroup } from "reactstrap";
import LinkCard from "./LinkCard";
import DragonQuestApi from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';

function ArmorList() {

    const [armor, setArmor] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(false);

    //fetch initial list of all weapons
    useEffect(() => {
        async function fetchAllArmor() {
            const response = await DragonQuestApi.getArmors();
            setArmor(response);
        }
        fetchAllArmor();
        setInfoLoaded(true);
    }, []);

    if (!infoLoaded || !armor) return <h1>Loading...</h1>

    return (
        <React.Fragment>
            <br />
        <h1>Armor</h1>
        {armor.length 
        ? (
            <div class="row" style={{ display: "flex", padding: "50px"}}>
                <CardGroup width="100%">
                {armor.map(a => (
                    <span><LinkCard 
                        type = "armor" 
                        title = {a.name}
                        imgurl = {a.imgurl}
                        route = {a.id}
                        key = {a.id}/>
                    </span>
                ))}
                </CardGroup>
            </div>
        ) : (
            <p>No armor found!</p>
        )}
        </React.Fragment>
    )
}

export default ArmorList;