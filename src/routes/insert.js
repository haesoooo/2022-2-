import express from "express";
import { selectSql, updateSql, insertSql } from "../database/sql";
//예약 정보를 추가
//고객-관리자 간 예약 생성 시 sale을 추가 (insert) -> vehicle의 예약 정보 YES로 update
//insert into sale values() -> update vehicle set reservation = 'YES' where Vin = ;
const router = express.Router();

router.get('/shopping', async (req, res) =>{ 
    const mysale = await selectSql.getsale();
    res.render('shopping',{
        mysale
    })
});

router.post('/shopping', (req, res) => {
    const vars = req.body;
    console.log(vars);
    const data = {
        manageid: vars.manageid,
        reservedate: vars.reservedate,
        customerid: vars.customerid,
        Vin: vars.Vin
    };
    console.log(data);
    updateSql.update_vehicle_reserve(data);
    insertSql.createsale(data);
    res.redirect('/insert/shopping');
});


router.get('/adminvhc', async (req, res) =>{ 
    const vhc = await selectSql.getvehicle();
    res.render('adminvhc',{
        vhc
    })
});

router.post('/adminvhc', (req, res) => {
    const vars = req.body;
    console.log(vars);
    const data = {
        Vin: 'NULL',
        Model: vars.Model,
        Price: vars.Price,
        Type: vars.Type,
        Enginesize: vars.Enginesize,
        Seat: vars.Seat,
        Tone: vars.Tone,
        Reservation: vars.Reservation,
        salesperson_id: vars.salesperson_id
    };
    console.log(data);
    insertSql.createvehicle(data);
    res.redirect('/insert/adminvhc');
});




module.exports = router;