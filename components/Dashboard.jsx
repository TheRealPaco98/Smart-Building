import Wallet from "@components/Wallet";
import React, { useState, useEffect } from "react";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import { init, setHash, readHash } from "../hooks/Web3Client";

const Dashboard = () => {
  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU1NjlBRjI5MjI0ZDFDNjI1QUUwZDQzMjE0ZTE5Q0I4NzFhQUQ4RGEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk5MjEwOTUxNzUsIm5hbWUiOiJQcm9nZXR0byJ9.p9dqW2LWdCcYAwOoHgQKOMZvl8pRzYMzv7YX6L4_MhU",
  });

  //STATE
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");
  const [hashed, setHashed] = useState("");

  //FUNCTIONS
  function setCid(cid) {
    setHash(cid)
      .then((tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function storeFiles(file) {
    const cid = client.put(file);
    cid.then((value) => {
      setIsLoading(false);
      setHashed(value);
      setCid(value);
    });
  }

  function handleCaptureFile(e) {
    e.preventDefault();
    console.log("capturing file...");
    const fileInput = document.getElementById("csvFile");
    const selectedFile = fileInput.files[0];
    console.log(selectedFile);
    setFile(fileInput.files);
  }

  function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    console.log("You clicked submit.");
    storeFiles(file);
  }

  //EFFECT
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="flex justify-end my-5">
        <Wallet />
      </div>
      <div className="mt-10">
        <div>
          <div className="flex flex-col mb-10">
            <p className="mb-5">Register your report</p>
            <div>
              <input
                id="csvFile"
                accept=".csv"
                onChange={handleCaptureFile}
                type="file"
                className="file-input file-input-bordered file-input-secondary w-full max-w-xs mr-3"
              />
              <button
                className={
                  isLoading ? "loading btn btn-secondary" : "btn btn-secondary"
                }
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <p className="mb-5">Insert your room info</p>
            </div>
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Insert ID Room"
                className="input input-bordered input-secondary w-full max-w-xs"
              />
              <input
                type="text"
                placeholder="Insert Owner"
                className="input input-bordered input-secondary w-full max-w-xs"
              />
              <input
                type="text"
                disabled={true}
                value={hashed}
                placeholder="Insert Hash"
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </div>
          </div>
        </div>
        {/*<form onSubmit={handleSubmit}>*/}
        {/*  <input*/}
        {/*    type="file"*/}
        {/*    id="csvFile"*/}
        {/*    accept=".csv"*/}
        {/*    onChange={handleCaptureFile}*/}
        {/*  ></input>*/}
        {/*  <input type="submit"></input>*/}
        {/*</form>*/}
        {/*<div className="container">*/}
        {/*  <button onClick={readHash}>HASH</button>*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default Dashboard;
