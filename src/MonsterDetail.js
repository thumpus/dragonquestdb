import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardTitle, CardFooter, CardImg, CardHeader } from 'reactstrap';
import { Link, useParams } from "react-router-dom";
import DragonQuestApi from "./api";
import './App.css';

function MonsterDetail(props) {
    
    const { id } = useParams();
    const [monster, setMonster] = useState(null);

    useEffect(() => {
        async function fetchMonster(id) {
            let res = await DragonQuestApi.getMonster(id);
            setMonster(res);
        }
        fetchMonster(id);
    });

    if (!monster) return <h1>Loading...</h1>

    return (
        <div>
        <Card className = 'detailCard' style={{width: '30rem'}} body='50px'>
            <CardHeader>
            <CardImg alt={monster.name} src={monster.imgurl} style={{width: '250px'}}/>
            <CardTitle tag="h3">
                {monster.name}
            </CardTitle>
            </CardHeader>
            <CardBody>
                HP: {monster.hp} MP: {monster.mp} <br/>
                ATK: {monster.atk} DEF: {monster.def} AGILITY: {monster.agility}<br/>
                EXP: {monster.exp} GOLD: {monster.gold}
            </CardBody>
            <CardFooter>
                Abilities: {monster.abilities}<br/>
                Spells: {monster.spells}
            </CardFooter>
        </Card>
        <br />
        <Link to={'/monsters'}><button>Back</button></Link>
        </div>
    );
}

export default MonsterDetail;