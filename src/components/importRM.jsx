import { useState } from "react";
import { supabase } from "../supabaseConfig.js";
import { DateTime } from "luxon";
import {
  exportAllReadwise,
  exportReadwiseAfterDate,
} from "../controllers/readwiseController";
import Button from "./Button.jsx";
import CryptoJS from "crypto-js";

const ImportRM = ({
  memApiKey,
  lastFetched,
  readwiseApiKey,
  userId,
  importStatus,
}) => {
  const [error, setError] = useState(null);
  const [importStatusState, setImportStatusState] = useState(importStatus);

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
    const updatedDate = await supabase
      .from("profiles")
      .update({ last_fetched: newDate.toISO() })
      .eq("id", userId);
  };

  const fetchReadwiseAll = async () => {
    console.log("start import all");
    const exportAll = await exportAllReadwise(
      decrypt(readwiseApiKey),
      decrypt(memApiKey),
      userId
    );
    updateLastFetched();
  };
  const fetchReadwise = async () => {
    console.log("start import from date");
    const lastFetchedMs = DateTime.fromISO(lastFetched).ts;
    const exportAfterDate = await exportReadwiseAfterDate(
      decrypt(readwiseApiKey),
      lastFetchedMs,
      decrypt(memApiKey),
      userId
    );
    updateLastFetched();
  };
  const handleImportStatus = () => {
    if (importStatusState == true) {
      setImportStatusState(false);
    } else setImportStatusState(true);
  };

  return (
    <div>
      <main>
        <Button
          text="TEST"
          fonction="Test import button"
          onClick={fetchReadwise}
        />
        <Button
          text="Import All"
          fonction="Test import button"
          onClick={fetchReadwiseAll}
        />
        <Button
          text="Update Import"
          fonction="Test import button"
          onClick={fetchReadwise}
        />
      </main>
    </div>
  );
};

export default ImportRM;
