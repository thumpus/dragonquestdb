import React, { useEffect, useState } from "react";
import { CardGroup } from "reactstrap";
import LinkCard from "./LinkCard";
import DragonQuestApi from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';

function SpellsList() {

    const [spells, setSpells] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(false);

    //fetch initial list of all weapons
    useEffect(() => {
        async function fetchAllSpells() {
            const response = await DragonQuestApi.getSpells();
            setSpells(response);
        }
        fetchAllSpells();
        setInfoLoaded(true);
    }, []);

    if (!infoLoaded || !spells) return <h1>Loading...</h1>

    return (
        <React.Fragment>
            <br />
        <h1>Spells</h1>
        {spells.length 
        ? (
            <div className="row" style={{ display: "flex", padding: "50px"}}>
                <CardGroup width="100%">
                {spells.map(s => (
                    <span>
                    <LinkCard 
                        type = 'spells'
                        title = {s.name}
                        imgurl = {s.imgurl}
                        route = {s.id}
                        key = {s.id}/>
                    </span>
                ))}
                </CardGroup>
            </div>
        ) : (
            <p>No spells found!</p>
        )}
        </React.Fragment>
    )
}

export default SpellsList;