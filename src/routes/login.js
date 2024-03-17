import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();
export var logid;
export var adminid;
export function getlogid() {
    return logid;
}
//고객 아이디를 받아오는 함수
export function getadminid() {
    return adminid;
}
//관리자 아이디를 받아오는 함수
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getuser();
    //user table 내의 값들을 받아옴
    let whoAmI = '';
    let checkLogin = false;

    users.map((user) => {
        if(vars.id === user.uid && vars.password === user.password){ 
            //user table에 저장된 아이디와 패스워드가 같으면
            console.log(vars.uid); 
            checkLogin = true; // 로그인 성공
            if(user.isadmin === 'YES'){
                whoAmI = 'manager';
                adminid = user.uid;
                //user table 내의 isadmin이 YES 라면 관리자 아이디로 취급
            } else {
                whoAmI = 'user';
                logid = user.uid;
                //user table 내의 isadmin이 NO 라면 고객 아이디로 취급
            } 
        }
    })
    if (checkLogin && whoAmI === 'user') { 
        res.redirect('/select'); 
        
    } //고객의 예약정보 & 예약 가능한 차량 정보를 확인하는 페이지로 이동
    else if (checkLogin  && whoAmI === 'manager') {
        res.redirect('/manage');
        
    } //자신이 관리하는 예약정보 & 차량 정보를 확인하는 페이지로 이동
    else{
        console.log('login falied!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/'</script>"); 
    }
})

module.exports = router;