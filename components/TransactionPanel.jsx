//REACT
import {useEffect, useState} from "react";
//WEB3
import {useWeb3} from "@3rdweb/hooks";
import { showTransactions } from "hooks/Web3Client";

const TransactionPanel = () => {
    const {
        address,
        error,
    } = useWeb3();
    error ? console.log(error) : null; 
    

    return <div className="card-body gap-6">
            <div className="flex justify-between items-center">
                
                        <div className="mb-5">Transaction
                            <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                                {showTransactions().txHash}
                               
                            </div>
                        </div>
                        <div className="mb-5">From:
                            <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                                {showTransactions().from}
                            </div>
                        </div>
                        <div className="mb-5">To:
                            <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                                {showTransactions().to}
                            </div>
                        </div>
                        <div className="mb-5">Date:
                            <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                                {showTransactions().ts}
                            </div>
                        </div>
                
            </div>
        </div>
}
export default TransactionPanel;