import { getRoomInfo } from "../hooks/Web3Client";
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useState } from "react";
import TransactionPanel from "@components/TransactionPanel";
import { getTransaction } from "hooks/Web3Client";

const ContractInfo = () => {
    //WEB3
    const {
        address,
        error,
    } = useWeb3();

    error ? console.log(error) : null;

    //STATE
    const [contracts, setContracts] = useState([]);
    const [showTransactionPanels, setShowTransactionPanels] = useState({});
    const [transactions, setTransactions] = useState(false);

    //FUNCTIONS
    const getRoom = () => {
        getRoomInfo(address)
            .then((response) => {
                console.log(response);
                setContracts(response);
                const obj = {};
                for (const contract of response) {
                    obj[contract.roomID] = false;
                    setShowTransactionPanels(obj);
                }
            })

            .catch((err) => {
                console.log(err);
            });
    }

    const doGetTransaction = async (address) => {
        setTransactions(await getTransaction(address));
    }

    const doShowTransaction = (roomID) => {
        setShowTransactionPanels({ ...showTransactionPanels, [roomID]: !showTransactionPanels[roomID] });
        doGetTransaction(address);
    }

    useEffect(() => {
        if (address) {
            getRoom();
        }
    }, [address]);

    return <div>
        {contracts && contracts.map((contract) => (
            <div key={contract.roomID} className="my-10 card w-100 bg-neutral text-neutral-content">
                <div className="card-body gap-6" >
                    <h2 className="card-title self-center">Room <span className="badge badge-secondary">#{contract.roomID}</span></h2>
                    <div className="flex justify-between items-center">
                        <div className="text-center">
                            <div className="mb-5">Owner</div>
                            <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                                {contract.roomOwner}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="mb-5">CID</div>
                            <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                                {contract.roomHash}
                            </div>
                        </div>

                        <div>
                            <button
                                className="btn btn-outline"
                                onClick={() => window.open(`https://${contract.roomHash}.ipfs.w3s.link`, '_blank')}>
                                Download
                            </button>
                        </div>



                        <div>
                            <button
                                className={showTransactionPanels[contract.roomID] ? "btn btn-secondary" : "btn btn-outline"}
                                onClick={() => {
                                    doShowTransaction(contract.roomID);
                                }}
                            >
                                {
                                    showTransactionPanels[contract.roomID] ? <span>CLOSE PANEL</span> : <span>SHOW TRANSACTIONS</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    {transactions && showTransactionPanels[contract.roomID] &&
                        <TransactionPanel
                            transactions={transactions.filter(transaction => transaction.id === contract.roomID)}
                        />
                    }
                </div>

            </div>))}

    </div>

}

export default ContractInfo;