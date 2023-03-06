import fetchFromExportApi from "./readwiseClient.js";
import { v4 as uuidv4 } from "uuid";

import { addBookToDB, checkBookDB } from "./supabaseController";

const formatAndCreate = (newData, memApiKey, userId) => {
  for (let i = 0; i < newData.length; i++) {
    const memId = uuidv4();
    checkBookDB(newData[i], userId, memId, memApiKey);
  }
};
const exportAllReadwise = async (token, memApiKey, userId) => {
  const allData = await fetchFromExportApi(token);
  formatAndCreate(allData, memApiKey, userId);
};
const exportReadwiseAfterDate = async (token, date, memApiKey, userId) => {
  console.log("export after date started");
  const lastFetchWasAt = new Date(date); //1676210778201
  const newData = await fetchFromExportApi(token, lastFetchWasAt.toISOString());
  formatAndCreate(newData, memApiKey, userId);
};
const fakeExportReadwise = async (dateNb = 0) => {
  console.log("Fake Import");
  const lastFetchWasAt = new Date(dateNb);
  const [alldata, error] = await fetchFromExportApi(
    "bloubliblou",
    lastFetchWasAt.toISOString()
  );
  if (error) alert(error);
};

export { exportReadwiseAfterDate, exportAllReadwise, fakeExportReadwise };
