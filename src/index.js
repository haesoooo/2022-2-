
import express from "express";
import logger from "morgan";
import path from "path";

import loginRouter from "./routes/login";
import manageRouter from "./routes/manage";
import selectRouter from "./routes/select";
import deleteRouter from "./routes/delete";
import insertRouter from "./routes/insert";
import updateRouter from "./routes/update";
const PORT = 7000;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')

app.use(logger("dev"));

app.use("/", loginRouter);
app.use("/manage", manageRouter); // 관리자 router
app.use("/insert", insertRouter); // 각각 CRUD 를 담당하는 4개의 router
app.use("/select", selectRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);

app.listen(PORT, () => {
    console.log('Example app listening at http://localhost:${PORT}')
})

