import { formatUniqueMem, appendMem } from "./memController.js";
import fetchFromExportApi from "./readwiseClient.js";
import { supabase } from "../supabaseConfig.js";
import { v4 as uuidv4 } from "uuid";

import { addBookToDB, checkBookDB } from "./supabaseController";

const formatAndCreate = (newData, memApiKey, userId) => {
  for (let i = 0; i < newData.length; i++) {
    const memId = uuidv4();
    checkBookDB(newData[i], userId, memId, memApiKey);
  }
};
const exportAllReadwise = async (token, memApiKey) => {
  const allData = await fetchFromExportApi(token);
  formatAndCreate(allData, memApiKey);
};
const exportReadwiseAfterDate = async (token, date, memApiKey, userId) => {
  try {
    console.log("export after date started");
    const lastFetchWasAt = new Date(date); //1676210778201
    console.log(lastFetchWasAt);
    const newData = await fetchFromExportApi(
      token,
      lastFetchWasAt.toISOString()
    );
    formatAndCreate(newData, memApiKey, userId);
  } catch (error) {
    console.log(error);
  }
};

export { exportReadwiseAfterDate, exportAllReadwise };
