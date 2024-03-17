import express from "express";
import { selectSql, updateSql } from "../database/sql";
//차량 수정, 예약 수정 (관리자모드)
const router = express.Router();

//차량 정보 수정
router.get('/vhc', async (req, res) => {
    const vhc = await selectSql.getvehicle();
    res.render('updatevhc',{
        vhc
    });
});

//수정을 누르면 update query실행
router.post('/vhc', async (req, res) => {
    const vars = req.body;
    const data = {
        Vin: vars.Vin,
        Price: vars.Price,
        Model: vars.Model,
        Reservation: vars.Reservation
    }
    
    await updateSql.update_vehicle_info(data); 

    res.redirect('/update/vhc'); //차량 수정 페이지로 이동
}
    )

//예약 정보 수정
router.get('/sale', async (req, res) => {
    const sale = await selectSql.getsale();
    res.render('updatesale',{
        sale
    });
});

//수정을 누르면 update query실행
router.post('/sale', async (req, res) => {
    const vars = req.body;
    const data = {
        reservedate: vars.reservedate,
        customerid: vars.customerid,
        said: vars.said,
    }
    
    await updateSql.update_sale_info(data); 

    res.redirect('/update/sale'); // 예약 수정 페이지로 이동
}
    )

module.exports = router;

