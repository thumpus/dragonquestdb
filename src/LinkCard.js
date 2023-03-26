import React from "react";
import { Card, CardImg, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import './App.css';

/**
 * 
 * Basic link card to be used to link to detail pages. Props should include:
 * type (monsters, weapons, armor, spells, shields) to be used for the route
 * title
 * imgurl
 * route
 */
function LinkCard(props) {
    return (
        <div className="card">
            <Link to={`/${props.type}/${props.route}`}>
                <Card body className="text-center"
                style = {{
                    width: '15rem',
                    height: '15rem',
                    padding: '1px'
                }}>
                    <CardTitle>
                        <p>{props.title}</p>
                    </CardTitle>
                    <CardImg
                        bottom
                        alt={props.title}
                        src={props.imgurl}
                        style = {{width:'120px'}}
                    />
                        
                </Card>
            </Link>
        </div>
    )
}

export default LinkCard;

