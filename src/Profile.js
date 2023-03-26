import React from "react";

function Profile({ currentUser }) {

    
    return (
        <table>
            <th>{currentUser.username}</th><th> Level {currentUser.lvl} </th> <th> Gold {currentUser.gold} </th> <th> EXP {currentUser.exp}</th><th>Monsters Slain {currentUser.kills}</th> 
        </table> 
    )

}

export default Profile;