import { useEffect, useState } from "react";
import { supabase } from "../supabaseConfig.js";
import { DateTime } from "luxon";
import {
  exportAllReadwise,
  exportReadwiseAfterDate,
} from "../controllers/readwiseController";
import Button from "./Button.jsx";
import CryptoJS from "crypto-js";
import { MemClient } from "@mem-labs/mem-node";
import { v4 as uuidv4 } from "uuid";

const ImportRM = ({ memApiKey, lastFetched, readwiseApiKey, userId }) => {
  // const [user, setUser] = useState("");
  const [error, setError] = useState(null);
  // const [lastFetched, setLastFetched] = useState("");
  const [importAllBtn, setImportAllBtn] = useState(false);

  const decrypt = (data) => {
    if (!data) return;
    const decrypted = CryptoJS.AES.decrypt(
      data,
      import.meta.env.VITE_ENCRYPTION_KEY
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const updateLastFetched = async () => {
    const newDate = DateTime.now();
    // console.log(newDate.toISO());
    const updatedDate = await supabase
      .from("profiles")
      .update({ last_fetched: newDate.toISO() })
      .eq("id", user);
  };

  const fetchReadwise = async () => {
    const lastFetchedMs = DateTime.fromISO(lastFetched).ts;
    // const exportAll = await exportAllReadwise(readwiseApiKey, memApiKey);
    console.log(userId);
    const exportAfterDate = await exportReadwiseAfterDate(
      decrypt(readwiseApiKey),
      lastFetchedMs,
      decrypt(memApiKey),
      userId
    );
    console.log("export started");
  };

  // To decoment after -- update DB user profile date last fetched
  // updateLastFetched();

  return (
    <div>
      <main>
        <Button
          text="TEST"
          fonction="Test import button"
          onClick={fetchReadwise}
        />
      </main>
    </div>
  );
};
export default ImportRM;
