import {getRoomInfo} from "../hooks/Web3Client";
import {useWeb3} from "@3rdweb/hooks";
import {useEffect, useState} from "react";

const ContractInfo =  () => {
    //WEB3
    const {
        address,
        error,
    } = useWeb3();
    error ? console.log(error) : null;

    //STATE
    const [contract, setContract] = useState({});

    //FUNCTIONS
    const getRoom = () => {
        getRoomInfo(address)
            .then((response) => {
                console.log(response);
                setContract(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (address) {
            getRoom();
        }
    }, [address]);

    return <div>
        {contract && <div className="my-10 card w-100 bg-neutral text-neutral-content">
            <div className="card-body gap-6">
                <h2 className="card-title self-center">Room <span className="badge badge-secondary">#{contract.roomID}</span></h2>
                <div className="flex justify-between items-center">
                    <div className="text-center">
                        <div className="mb-5">Owner</div>
                        <div className="px-2 py-1 rounded-full bg-secondary hover:bg-gray-300 font-mono font-medium cursor-pointer duration-100">
                            {contract.r_owner}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="mb-5">Hash</div>
                        <div className="px-2 py-1 rounded-full bg-secondary hover:bg-gray-300 font-mono font-medium cursor-pointer duration-100">
                            {contract.r_hash}
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn btn-outline"
                            onClick={() => window.open(`https://${contract.r_hash}.ipfs.w3s.link`, '_blank')}
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>}
    </div>
}

export default ContractInfo;