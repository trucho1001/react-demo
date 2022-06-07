import React, { useState, useContext, useEffect } from "react";
import AlgoliaApiService from "../../adapters/xhr/AlgoliaApiService";
import { debounce } from "../../Utils";

export const DashboardPage = (props) => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  const getData = async () => {
    let result = await AlgoliaApiService.getAll(value);
    setItems(result.hits);
  };

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value != "") getData();
  }, [value]);

  const debouncedChangeHandler = debounce(changeHandler, 500);

  return (
    <div className="padding-1">
      <input
        onChange={debouncedChangeHandler}
        placeholder="Type something"
        className="margin bottom-1 padding-1"
      />
      {items.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
};
