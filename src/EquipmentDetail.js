import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardTitle, CardFooter, CardImg, CardHeader } from 'reactstrap';
import { Link, useParams } from "react-router-dom";
import DragonQuestApi from "./api";

function EquipmentDetail(props) {
    
    const { id } = useParams();
    const [equipment, setEquipment] = useState(null);

    useEffect(() => {
        async function fetchEquipment(id) {
            if (props.type === 'weapons') {
                let res = await DragonQuestApi.getWeapon(id);
                setEquipment(res);
            } else if (props.type === 'armor') {
                let res = await DragonQuestApi.getArmor(id);
                setEquipment(res);
            } else if (props.type === 'shields') {
                let res = await DragonQuestApi.getShield(id);
                setEquipment(res);
            }
            
        }
        fetchEquipment(id);
    });

    if (!equipment) return <h1>Loading...</h1>

    return (
        <div>
        <Card style={{width: '25rem'}} body='50px'>
            <CardHeader>
            <CardImg alt={equipment.name} src={equipment.imgurl} style={{width: '250px'}}/>
            <CardTitle tag="h3">
                {equipment.name}
            </CardTitle>
            </CardHeader>
            <CardBody>
                <h4>Modifier: +{equipment.modifier}</h4><br/>
            </CardBody>
            <CardFooter>
            Buy Price: {equipment.buyprice} <br /> Sell Price: {equipment.sellprice}
            </CardFooter>
        </Card>
        <br />
        <Link to={`/${props.type}`}><button>Back</button></Link>
        </div>
    );
}

export default EquipmentDetail;