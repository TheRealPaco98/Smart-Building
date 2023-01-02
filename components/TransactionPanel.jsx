//WEB3
import { useWeb3 } from "@3rdweb/hooks";

const TransactionPanel = ({ transactions }) => {
    const {
        address,
        error,
    } = useWeb3();

    error ? console.log(error) : null;

    return<div className="card-body gap-6">
          {transactions && transactions.map((transaction) => (
    <div>
        <div className="flex justify-between items-center">
        <div className="mb-5"> Transaction:
            <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                {transaction.hash}
            </div>
        </div>

        <div className="mb-5">From:
            <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                {transaction.fr}
            </div>
        </div>

        <div className="mb-5">Date:
            <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                {transaction.data}
            </div>
        </div>
    </div>
    </div>))}
</div>  
        
}
export default TransactionPanel;