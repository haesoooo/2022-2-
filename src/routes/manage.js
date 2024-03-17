import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function(req, res) {
    
    const salelist = await selectSql.getadminsale();
    console.log(salelist);
    const vehiclelist = await selectSql.getadminvehicle(); 
    res.render('manage', {
        salelist,
        vehiclelist
    });
});

module.exports = router;