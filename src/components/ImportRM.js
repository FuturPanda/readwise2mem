import { useEffect, useState } from "react";
import { supabase } from "../backend/config/supabaseConfig.js";
import { DateTime } from "luxon";
import {
  exportAllReadwise,
  exportReadwiseAfterDate,
} from "../backend/controllers/readwiseController.js";

const ImportRM = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState("");
  const [importAllBtn, setImportAllBtn] = useState(false);
  const getApiKey = async () => {
    const { data } = await supabase.from("profiles").select("*");
    const user = data[0];
    setUser(user);
    console.log(user);
  };
  const handleChangeImportAll = (e) => {
    setImportAllBtn(e.target.checked);
  };

  const updateLastFetched = async () => {
    const newDate = DateTime.now();
    console.log(newDate.toISO());
    const updatedDate = await supabase
      .from("profiles")
      .update({ last_fetched: newDate.toISO() })
      .eq("id", user.id);
  };

  const fetchReadwise = async () => {
    const {
      mem_api_key: memApiKey,
      readwise_api_key: readwiseApiKey,
      last_fetched: lastFetched,
    } = user;
    const lastFetchedMs = DateTime.fromISO(lastFetched).ts;
    if (importAllBtn == true) {
      // const exportAll = await exportAllReadwise(readwiseApiKey, memApiKey);
    } else {
      //   const exportAfterDate = await exportReadwiseAfterDate(
      //     readwiseApiKey,
      //     lastFetchedMs,
      //     memApiKey
      //   );
      console.log("export started");
    }
    updateLastFetched();
  };

  useEffect(() => {
    getApiKey();
  }, []);
  return (
    <div>
      <h1>Readwise To Mem v0.1.0</h1>
      <main>
        <form action="">
          <div>
            <p>Import from (date): </p>
            <input type="text" className="import-from-date" required={true} />
            <label className="checkbox">
              <input
                type="checkbox"
                name="import-all"
                className="import-all-checkbox"
                value="import-all"
                onChange={handleChangeImportAll}
              />
              <p>Import All </p>
            </label>
          </div>
          <button
            className="import-button"
            type="submit"
            onClick={fetchReadwise}
          >
            Import to Mem
          </button>
        </form>
        <div>
          <h2>Details</h2>
          <ul>
            <li>
              <p>
                Status : <span className="status-display"> ? </span>
              </p>
            </li>
            <li>
              <p>
                Date : <span className="import-date-display"> {} </span>
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ImportRM;
