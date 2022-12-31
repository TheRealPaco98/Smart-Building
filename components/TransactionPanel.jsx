//WEB3



import { useWeb3 } from "@3rdweb/hooks";




const TransactionPanel = ({ transaction }) => {



    const {



        address,



        error,



    } = useWeb3();



    error ? console.log(error) : null;







    return <div className="card-body gap-6">



        <div>

            <div className="mb-5">Transaction



                <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">



                    {transaction.txHash}

                </div>



            </div>



            <div className="mb-5">From:



                <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">

                    {transaction.from}

                </div>



            </div>



            <div className="mb-5">Date:



                <div className="px-2 py-1 rounded-full bg-secondary font-mono font-medium">

                    {transaction.ts}

                </div>



            </div>





        </div>



    </div>



}



export default TransactionPanel;