import express from "express";
import { MemClient } from "@mem-labs/mem-node";
// import supabase from "./backend/config/supabaseConfig.js"
import { importReadwise2Mem } from "./src/backend/controllers/receiveData.js";
const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api", (req, res) => {
  console.log("Serveur.js received : " + req.body);

  // const response = importReadwise2Mem(req.body.apiMem,req.body.apiRead, req.body.dateImp, req.body.impAll)
  // response.then((data) => console.log(" serverjs response log = " + data))
});
app.post("/api/user", (req, res) => {
  console.log("newuser creation");
  const response = "new creation";
  res.body = response;
});
app.post("/api/me", (req, res) => {
  console.log("mes informations sont là ! ");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
