import { useWeb3 } from "@3rdweb/hooks";

const Wallet = () => {
  const {
    connectWallet,
    address,
    error,
    disconnectWallet,
    balance,
    chainId,
    getNetworkMetadata,
  } = useWeb3();
  error ? console.log(error) : null;
  const networkMetadata = getNetworkMetadata(1);
  return (
    <div className="flex flex-col justify-end items-center">
      {address ? (
        <div>
          <div className="card w-100 bg-neutral text-neutral-content">
            <div className="card-body gap-6">
              <h2 className="card-title self-center">Wallet</h2>
              <p>
                <span className="mr-5">Account</span>
                <span className="px-2 py-1 rounded-full bg-secondary hover:bg-gray-300 font-mono font-medium cursor-pointer duration-100">
                  {address}
                </span>
              </p>
              <p>
                <span className="mr-5">Chain ID</span>
                <span className="px-2 py-1 rounded-full bg-secondary hover:bg-gray-300 font-mono font-medium cursor-pointer duration-100">
                  {chainId}
                </span>
              </p>
              <p>
                <span className="mr-5">Balance</span>
                <span className="px-2 py-1 rounded-full bg-secondary hover:bg-gray-300 font-mono font-medium cursor-pointer duration-100">
                  {`${networkMetadata?.symbol} ${balance?.formatted} `}
                </span>
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-outline"
                  onClick={() => disconnectWallet()}
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className="btn" onClick={() => connectWallet("injected")}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Wallet;
