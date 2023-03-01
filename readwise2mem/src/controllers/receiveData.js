import { formatUniqueMem } from "./memController.js";
import fetchFromExportApi from "./readwiseClient.js";
import {
  exportReadwiseAfterDate,
  exportAllReadwise,
} from "./readwiseController.js";

const importReadwise2Mem = async (
  memApiKey,
  readwiseApiKEy,
  date,
  importAll
) => {
  try {
    // if (importAll) {
    //   const newExportAll = await exportAllReadwise(readwiseApiKEy, memApiKey);
    // } else {
    const newExportAfterDate = await exportReadwiseAfterDate(
      readwiseApiKEy,
      1676210778201,
      memApiKey
    );
    // const newExportAfterDate = await exportReadwiseAfterDate(readwiseApiKEy, date, memApiKey)
    // }
  } catch (error) {
    console.log(error);
  }
};

export { importReadwise2Mem };
