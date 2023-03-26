import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardTitle, CardFooter, CardImg, CardHeader } from 'reactstrap';
import { Link, useParams } from "react-router-dom";
import DragonQuestApi from "./api";

function SpellDetail(props) {
    
    const { id } = useParams();
    const [spell, setSpell] = useState(null);

    useEffect(function loadSpell() {
        async function fetchSpell(id) {
            let res = await DragonQuestApi.getSpell(id);
            setSpell(res);
        }
        fetchSpell(id);
    });

    if (!spell) return <h1>Loading...</h1>

    return (
        <div>
        <Card style={{width: '25rem'}} body='50px'>
            <CardHeader>
            <CardImg alt={spell.name} src={spell.imgurl} style={{width: '250px'}}/>
            <CardTitle tag="h3">
                {spell.name}
            </CardTitle>
            </CardHeader>
            <CardBody>
                Level Learned: {spell.levellearned}<br/>
                MP Cost: {spell.mpcost}
            </CardBody>
            <CardFooter>
            {spell.effect} 
            </CardFooter>
        </Card>
        <br />
        <Link to={'/spells'}><button>Back</button></Link>
        </div>
    );
}

export default SpellDetail;