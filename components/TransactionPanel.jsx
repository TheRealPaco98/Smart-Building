//WEB3
import {useWeb3} from "@3rdweb/hooks";

const TransactionPanel = ({transactions}) => {
    const {
        error,
    } = useWeb3();

    error ? console.log(error) : null;

    return <div className="card-body gap-6">
        {transactions && transactions.map((transaction) => (
            <div key={transaction.hash}>
                <div className="bg-indigo-900 rounded-lg p-2">
                    <div className="my-5">
                        <div className="mb-5"> Transaction:
                        </div>
                        <span className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                        {transaction.hash}
                    </span>
                    </div>

                    <div className="my-5">
                        <div className="mb-5">From:
                        </div>
                        <span className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                            {transaction.fr}
                    </span>
                    </div>

                    <div className="my-5">
                        <div className="mb-5">Date:
                        </div>
                        <span className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">
                        {transaction.data}
                    </span>
                    </div>
                </div>
            </div>))}
    </div>

}
export default TransactionPanel;