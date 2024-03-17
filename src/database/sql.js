import mysql from "mysql2";
import { getlogid } from "../routes/login";
import { getadminid } from "../routes/login";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'finalproject',
    password: '9087',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

//select문
export const selectSql = {
  getsale : async () => {
      const [rows] = await promisePool.query(`select * from sale`); 

      return rows
  }, // 전체 예약정보 read
  getvehicle : async () => {
    const [rows] = await promisePool.query(`select * from vehicle`); 

    return rows
}, // 전체 차량 정보 read
  getpossiblevehicle : async () => {
    const [rows] = await promisePool.query(`select * from vehicle where Reservation = 'NO'`); 

    return rows
}, // 예약 가능한 차량 정보만 read. Reservation 값이 NO 인지로 구분

getmysale : async () => {
  var logid = getlogid();
  const [rows] = await promisePool.query(`select * from sale where customerid = "${logid}"`); 

  return rows
}, // 고객이 자신의 예약한 정보들을 read. customid == 나의 로그인 아이디



getadminvehicle : async () => {
  var adminid = getadminid();
  const [rows] = await promisePool.query(`select * from vehicle where salesperson_id = "${adminid}"`); 

  return rows
}, // 관리자가 자신의 관리 차량 read

  getadminsale : async () => {
    var adminid = getadminid();
    const [rows] = await promisePool.query(`select * from sale where manageid = "${adminid}"`); 

    return rows
}, // 관리자가 자신의 관리 예약 정보들을 read
  getsalesperson : async () => {
      const [rows] = await promisePool.query(`select * from salesperson`); 

      return rows
  }, // 관리자 정보 read
  getcustomer : async () => {
      const [rows] = await promisePool.query(`select * from customer`);

      return rows
  }, // 고객 정보 read
  getuser : async () => {
    const [rows] = await promisePool.query(`select * from user`);
    console.log(rows)
    return rows
}, // 유저 정보 read
  
}

export const deleteSql = {
  deletereservation : async(data) =>{
    var logid = getlogid();
      const sql = `delete from sale where customerid="${logid}" and vid = "${data.Vin}"`;
      
      await promisePool.query(sql);
  }, // sale delete - 고객이 예약 삭제 (취소)

  delete_reserve_admin : async(data) =>{
    var logid = getlogid();
      const sql = `delete from sale where vid = "${data.Vin}"`;
      
      await promisePool.query(sql);
  },  // 관리자가 예약 삭제 (판매 실패 or 판매 완료)

  deletevehicle : async(data) =>{
      const sql = `delete from vehicle where Vin=${data.Vin}`;
      
      await promisePool.query(sql);
  }, // 차량 삭제

}


export const insertSql = {
  createvehicle : async (data) => { 
      const sql = `insert into vehicle values (NULL, "${data.Model}", "${data.Price}", "${data.Type}", "${data.Enginesize}","${data.Seat}","${data.Tone}","${data.Reservation}","${data.salesperson_id}")`;
  
      await promisePool.query(sql);
  }, // 차량 추가
  createsale : async (data) => {
      const sql = `insert into sale values (NULL, "${data.manageid}", "${data.reservedate}", "${data.customerid}", "${data.Vin}")`;
      
      await promisePool.query(sql);
  }, // 예약 추가


}


export const updateSql = {
   update_vehicle_info : async (data) => {
      const sql = `update vehicle set Model = "${data.Model}", price = "${data.Price}", Reservation = "${data.Reservation}" where Vin = "${data.Vin}"`;
      
      await promisePool.query(sql);
  }, // 차량 정보 수정

  update_sale_info : async (data) => {
    const sql = `update sale set reservedate = "${data.reservedate}", customerid = "${data.customerid}" where said = "${data.said}"`;
    
    await promisePool.query(sql);
}, // 예약 정보 수정
  update_vehicle_reserve : async (data) => {
      const sql = `update vehicle set reservation = 'YES' where Vin = "${data.Vin}"`;
      
      await promisePool.query(sql);
  },// 예약 완료상태로 수정
  update_vhc_reserve_NO : async (data) => {
    const sql = `update vehicle set reservation = 'NO' where Vin = "${data.Vin}"`;
    
    await promisePool.query(sql);
},// 예약 x 상태로 수정
}