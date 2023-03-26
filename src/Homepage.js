import React from "react";
import { CardGroup } from "reactstrap";
import LinkCard from "./LinkCard";

function Homepage() {
    
    return( 
        <div>
            <br />
            <h1>Dragon Quest DB</h1>
            <p>Welcome to the Dragon Quest Database, a repository of info on the classic 1986 NES JRPG, Dragon Quest!
                <br />
                Check out the info below or click "Venture Forth!" to fight some monsters!
            </p>
            <div style={{ display: "flex", padding: "50px", margin: 'auto'}}>
                <CardGroup width="100%" >
                    <LinkCard type = 'monsters' title = 'Monsters' imgurl = 'https://i.imgur.com/7ptUc4c.png' route=''/>
                    <LinkCard type = 'weapons' title = 'Weapons' imgurl = 'https://i.imgur.com/T1RRWIM.png' route=''/>
                    <LinkCard type = 'armor' title = 'Armor' imgurl = 'https://i.imgur.com/3EdEram.png' route=''/>
                    <LinkCard type = 'shields' title = 'Shields' imgurl = 'https://i.imgur.com/lGu7hLe.png' route=''/>
                    <LinkCard type = 'spells' title = 'Spells' imgurl = 'https://i.imgur.com/o3jS5Wz.png' route=''/>
                </CardGroup>
            </div>
        </div>
    )
}

export default Homepage;