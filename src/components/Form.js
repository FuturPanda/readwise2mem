const Form = () => {
  return (
    <div>
      <h1>Readwise To Mem v0.1.0</h1>
      <main>
        <form action="">
          <div>
            <p>Readwise API key : </p>
            <input type="text" className="input-api-readwise" required={true} />
          </div>
          <div>
            <p>Mem API key : </p>
            <input type="text" className="input-api-mem" required={true} />
          </div>
          <div>
            <p>Import from (date): </p>
            <input type="text" className="import-from-date" required={true} />
            <label className="checkbox">
              <input
                type="checkbox"
                name="import-all"
                className="import-all-checkbox"
              />
              <p>Import All </p>
            </label>
          </div>
          <button className="import-button" type="submit">
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
                Date : <span className="import-date-display"> ? </span>
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Form;
