import formatUniqueMem from "./memController.js";
import fetchFromExportApi from "../readwiseClient.js";
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
    if (importAll) {
      const newExportAll = await exportAllReadwise(readwiseApiKEy, memApiKey);
    } else {
      const newExportAfterDate = await exportReadwiseAfterDate(
        "LLAgGoxZJ7q6oX15R2XFqKgq537OVyNw7fSLANLlgPOcAntC4n",
        1676210778201,
        "5c19295e-5cc2-42ef-9f1b-8ab295498a52"
      );
      // const newExportAfterDate = await exportReadwiseAfterDate(readwiseApiKEy, date, memApiKey)
    }
  } catch (error) {
    console.log(error);
  }
};

export { importReadwise2Mem };
