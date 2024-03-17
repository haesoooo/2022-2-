import express from "express";
// 소비자가 자신의 예약정보 & 가능한 차량을 조회할 수 있는 페이지
import { selectSql, updateSql } from "../database/sql";
const router = express.Router();

router.get('/', async function (req, res) {
    // TODO
    // class 정보 불러오기
    const mysale = await selectSql.getmysale();
    const vehicle = await selectSql.getpossiblevehicle();
        // 불러온 예약 정보와 가능한 차량 목록 같이 넘겨주기
        res.render('select', { 
            title: 'Your Reservation List',
            mysale,
            vehicle
         });

});



module.exports = router;