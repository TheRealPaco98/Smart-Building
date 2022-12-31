//REACT
import React, {useEffect, useState} from "react";
//WEB3
import {init} from "../hooks/Web3Client";
import {useWeb3} from "@3rdweb/hooks";
//COMPONENT
import Wallet from "@components/Wallet";
import AddPanel from "@components/AddPanel";
import ContractInfo from "@components/ContractInfo";

const Dashboard = () => {
    //WEB3
    const {
        address,
        error,
    } = useWeb3();
    error ? console.log(error) : null;

  //STATE
  const [showAddPanel, setShowAddPanel] = useState(false);

  const doClosePanel = () => {
      setShowAddPanel(false);
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
        {address &&  <div className="mt-20">
            <div className=" my-10 text-center">
                <button
                    className={showAddPanel ? "btn btn-secondary" : "btn btn-outline btn-secondary"}
                    onClick={() => setShowAddPanel(!showAddPanel)}
                >
                    {
                        !showAddPanel ? <span>Register new room</span> : <span>Close Panel</span>
                    }
                </button>
            </div>
            {!showAddPanel &&
                <ContractInfo />
            }
            {showAddPanel &&
                <AddPanel
                    onClosePanel={doClosePanel}
                />
            }
        </div>}
    </>
  );
};

export default Dashboard;
