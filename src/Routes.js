import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import EquipmentDetail from "./EquipmentDetail";
import MonsterDetail from "./MonsterDetail";
import WeaponsList from "./WeaponsList";
import MonstersList from "./MonstersList";
import ArmorList from "./ArmorList"
import ShieldsList from "./ShieldsList";
import SpellDetail from "./SpellDetail";
import SpellsList from "./SpellsList";
import VentureForthHome from "./VentureForthHome";
import Battle from "./Battle";
import Shop from "./Shop";


function Router({ login, signup, logout }) {

    
    return (
        <Routes>
            <Route exact path = "/" element={<Homepage/>} />
            <Route exact path = "/monsters" element={<MonstersList/>} />
            <Route exact path = "/monsters/:id" element={<MonsterDetail/>} />
            <Route exact path = "/weapons" element={<WeaponsList />} />
            <Route exact path = "/weapons/:id" element={<EquipmentDetail type="weapons" />} />
            <Route exact path = "/armor" element={<ArmorList />} />
            <Route exact path = "/armor/:id" element={<EquipmentDetail type="armor"/>} />
            <Route exact path = "/shields" element={<ShieldsList />} />
            <Route exact path = "/shields/:id" element={<EquipmentDetail type="shields"/>} />
            <Route exact path = "/spells" element={<SpellsList />} />
            <Route exact path = "/spells/:id" element={<SpellDetail />} />
            <Route exact path = "/venture" element={<VentureForthHome login={login} signup={signup} logout={logout}/>} />
            <Route exact path = "/venture/battle" element={<Battle />} />
            <Route exact path = "/venture/shop" element={<Shop />} />
        </Routes>
        )
}

export default Router;