import React, { useEffect, useState } from "react";
import { CardGroup } from "reactstrap";
import LinkCard from "./LinkCard";
import DragonQuestApi from "./api";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShieldsList() {

    const [shields, setShields] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(false);

    //fetch initial list of all weapons
    useEffect(() => {
        async function fetchAllShields() {
            const response = await DragonQuestApi.getShields();
            setShields(response);
        }
        fetchAllShields();
        setInfoLoaded(true);
    }, []);

    if (!infoLoaded || !shields) return <h1>Loading...</h1>

    return (
        <React.Fragment>
            <br />
        <h1>Shields</h1>
        {shields.length 
        ? (
            <div className="row" style={{padding: "50px"}}>
                <CardGroup width="100%" className="cardGroup">
                {shields.map(s => (
                    <span><LinkCard 
                        type = "shields" 
                        title = {s.name}
                        imgurl = {s.imgurl}
                        route = {s.id}
                        key = {s.id}/>
                    </span>
                ))}
                </CardGroup>
            </div>
        ) : (
            <p>No shields found!</p>
        )}
        </React.Fragment>
    )
}

export default ShieldsList;