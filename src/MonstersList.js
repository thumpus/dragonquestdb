import React, { useEffect, useState } from "react";
import { CardGroup } from "reactstrap"
import LinkCard from "./LinkCard";
import DragonQuestApi from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';

function MonstersList() {

    const [monsters, setMonsters] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(false);

    //fetch initial list of all monsters
    useEffect(() => {
        async function fetchAllMonsters() {
            const response = await DragonQuestApi.getMonsters();
            setMonsters(response);
        }
        fetchAllMonsters();
        setInfoLoaded(true);
    }, []);

    if (!infoLoaded || !monsters) return <h1>Loading...</h1>

    return (
        <React.Fragment>
            <br />
        <h1>Monsters</h1>
        {monsters.length 
        ? (
            <div className="row" style={{ display: "flex", padding: "50px"}}>
                <CardGroup width="100%">
                {monsters.map(m => (
                    <span><LinkCard 
                        type = "monsters" 
                        title = {m.name}
                        imgurl = {m.imgurl}
                        route = {m.id}
                        key = {m.id}/>
                    </span>
                ))}
                </CardGroup>
            </div>
        ) : (
            <p>No monsters found!</p>
        )}
        </React.Fragment>
    )
}

export default MonstersList;