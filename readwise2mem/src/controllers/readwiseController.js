import formatUniqueMem from "./memController.js";
import fetchFromExportApi from "./readwiseClient.js";
import { MemClient } from "@mem-labs/mem-node";
import { supabase } from "../supabaseConfig.js";
import { v4 as uuidv4 } from "uuid";

const formatAndCreate = (newData, memApiKey, userId) => {
  for (let i = 0; i < newData.length; i++) {
    const memId = uuidv4();
    const dataToSend = formatUniqueMem(newData[i], userId, memId);
    if (dataToSend) {
      const memClient = new MemClient({
        apiAccessToken: memApiKey,
      });
      // console.log(newData);
      const newMem = memClient.createMem({
        content: dataToSend,
        memId: memId,
      });
    }
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
