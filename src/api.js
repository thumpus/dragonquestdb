import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 * API Class.
 * 
 * Static class tying together methods used to get/send to the API.
 * 
 * No frontend stuff here, and no API-aware stuff elsewhere in the frontend.
 */

class DragonQuestApi {
    // token for interactions with API will be stored here
    static token;

    static async request(endpoint, data = {}, method = "get") {

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${DragonQuestApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    static async getMonster(id) {
        let res = await this.request(`monsters/${id}`);
        return res.monster;
    }

    static async getMonsters(name) {
        let res = await this.request(`monsters`, { name });
        return res.monsters;
    }

    static async getWeapons(name) {
        let res = await this.request(`weapons`, { name });
        return res.weapons;
    }

    static async getWeapon(id) {
        let res = await this.request(`weapons/${id}`);
        return res.weapon;
    }

    static async getArmors(name) {
        let res = await this.request(`armor`, { name })
        return res.armor;
    }
    
    static async getArmor(id) {
        let res = await this.request(`armor/${id}`);
        return res.armor;
    }

    static async getShields(name) {
        let res = await this.request(`shields`, { name })
        return res.shields;
    }

    static async getShield(id) {
        let res = await this.request(`shields/${id}`);
        return res.shield;
    }

    static async getSpells(name) {
        let res = await this.request(`spells`, { name });
        return res.spells;
    }

    static async getSpell(id) {
        let res = await this.request(`spells/${id}`);
        return res.spell;
    }

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
      }
    
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
      }

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
      }

    static async editUser(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
      }

    static async getUsers() {
        let res = await this.request(`users`);
        return res.users;
    }

    static async getStats(lvl) {
        let res = await this.request(`stats/${lvl}`);
        return res.stats;
    }
}

// for now, put token ("testuser" / "password" on class)
DragonQuestApi.token = "";

export default DragonQuestApi;