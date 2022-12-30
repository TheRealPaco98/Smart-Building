//REACT
import {useEffect, useState} from "react";
//WEB3
import {setRoom} from "../hooks/Web3Client";
import {useWeb3} from "@3rdweb/hooks";
import {Web3Storage} from "web3.storage/dist/bundle.esm.min.js";
const AddPanel = ({onClosePanel}) => {
    //WEB3
    const client = new Web3Storage({
        token: process.env.NEXT_PUBLIC_WEB3_TOKEN,
    });
    const {
        address,
        error,
    } = useWeb3();
    error ? console.log(error) : null;

    //STATE
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [file, setFile] = useState("");
    const [owner, setOwner] = useState("");
    const [idRoom, setIdRoom] = useState("");

    //FUNCTIONS
    function setCid(hashedFile) {
        setRoom(address, owner, hashedFile, idRoom)
            .then((tx) => {
                console.log(tx);
                setFile("")
                setOwner("")
                setIdRoom("")
                setIsLoading(false);
                onClosePanel(true);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }

    function storeFiles(file) {
        const cid = client.put(file);
        cid.then((hashedFile) => {
            setCid(hashedFile);
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

    function handleSubmit() {
        setIsLoading(true);
        console.log("You clicked submit.");
        storeFiles(file);
    }

    useEffect(() => {
        if (file && owner !== "") {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [file, owner]);

    return <div>
        <p className="mb-5">Register your report</p>
        <div className="flex gap-10">
            <div>
                <input
                    id="csvFile"
                    accept=".csv"
                    onChange={handleCaptureFile}
                    type="file"
                    className="file-input file-input-bordered file-input-secondary w-full max-w-xs mr-3"
                />
            </div>
            <div className="flex gap-10 mb-10">
                <input
                    type="text"
                    value={owner}
                    onChange={($event) => setOwner($event.target.value.trim())}
                    placeholder="Insert Owner"
                    className="input input-bordered input-secondary w-full max-w-xs"
                />
            </div>
            <div className="flex gap-10 mb-10">
                <input
                    type="text"
                    value={idRoom}
                    onChange={($event) => setIdRoom($event.target.value.trim())}
                    placeholder="Insert Room ID"
                    className="input input-bordered input-secondary w-full max-w-xs"
                />
            </div>
        </div>
        <div className="flex flex-col">
            <button
                className={
                    isLoading ? "loading btn btn-secondary" : "btn btn-secondary"
                }
                disabled={isDisabled}
                onClick={handleSubmit}
            >
                Send
            </button>
        </div>
    </div>
}

export default AddPanel;