import express from "express";
import {selectSql, deleteSql, updateSql} from "../database/sql";
//고객 예약 취소 시 -  sale delete + vehicle 예약 상태 NO로 update
//관리자 판매 완료 시 - sale delete + vehicle delete
//관리자 판매 실패 시 - sale delete + vehicle 예약 상태 No로 update
//관리자 차량 삭제 - vehicle delete
const router = express.Router();

//고객 예약 취소
router.get('/usersale', async (req, res) =>{ 
    const mysale = await selectSql.getsale();
    res.render('deleteusersale',{
        mysale
    })
});

router.post('/usersale', (req, res) => {
    const vars = req.body;
    console.log(vars);
    const data = {
        Vin: vars.Vin
    };
    console.log(data);
    deleteSql.deletereservation(data);
    updateSql.update_vhc_reserve_NO(data);
    res.redirect('/delete/usersale');
});

//관리자 판매 완료 시
router.get('/complete', async (req, res) =>{ 
    const mysale = await selectSql.getsale();
    res.render('salecomplete',{
        mysale
    })
});

router.post('/complete', (req, res) => {
    const vars = req.body;
    console.log(vars);
    const data = {
        Vin: vars.Vin
    };
    console.log(data);
    deleteSql.delete_reserve_admin(data);

    res.send("<script>alert('완료 하였습니다!'); location.href='/manage'</script>");

    deleteSql.deletevehicle(data);
});

//관리자 판매 실패
router.get('/fail', async (req, res) =>{ 
    const mysale = await selectSql.getsale();
    res.render('salefail',{
        mysale
    })
});

router.post('/fail', (req, res) => {
    const vars = req.body;
    console.log(vars);
    const data = {
        Vin: vars.Vin
    };
    console.log(data);

    deleteSql.delete_reserve_admin(data);
    updateSql.update_vhc_reserve_NO(data);
    res.redirect('/delete/fail');
});

//관리자 차량 삭제
router.get('/admin', async (req, res) =>{ 
    const mysale = await selectSql.getsale();
    res.render('deletevehicle',{
        mysale
    })
});

router.post('/admin', (req, res) => {
    const vars = req.body;
    console.log(vars);
    const data = {
        Vin: vars.Vin
    };
    console.log(data);
    deleteSql.deletevehicle(data);
    res.redirect('/delete/admin');
});


module.exports = router;

