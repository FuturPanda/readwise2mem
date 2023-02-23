import formatUniqueMem from './memController.js'
import fetchFromExportApi from '../readwiseClient.js'
import {MemClient} from "@mem-labs/mem-node"


const formatAndCreate = (newData, memApiKey) => {
  for (let i=0; i< newData.length; i++) {
    const dataToSend = formatUniqueMem(newData[i])
    if (dataToSend){
      const memClient =  
      new MemClient({
        apiAccessToken: memApiKey
        });
      const newMem = memClient.createMem({
        content: dataToSend
        });
    }
  }
}

const exportAllReadwise = async (token, memApiKey) => {
  const allData = await fetchFromExportApi(token);
  formatAndCreate(allData, memApiKey)
  
}
const exportReadwiseAfterDate = async (token, date, memApiKey) => {
  try{
    console.log("export after date started")
    const lastFetchWasAt = new Date(date); //1676210778201
    console.log(lastFetchWasAt) 
    const newData = await fetchFromExportApi(token, lastFetchWasAt.toISOString()); 
    formatAndCreate(newData, memApiKey)
  }
  catch(error){
    console.log(error)
  }
}


export {exportReadwiseAfterDate, exportAllReadwise}