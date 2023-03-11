import axios from 'axios'
import { useState } from 'react'


const PayButton = () => {

    const [disable, setDisable] = useState(false)


    const handleCheckout = () => {
        let product = {
            foo: "product01"
        }
        axios.post(`http://localhost:5000/api/checkout/create-checkout-session`, {
            product
        })
            .then((res) => {
                if (res.data.url) {
                    window.location.href = res.data.url
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const handleCreateAccountId = () => {
        setDisable(true)
        axios.post(`http://localhost:5000/api/checkout/createAccountAndLink`)
            .then((res) => {
                console.log("==>", res.data.id)
                if (res.data.url) {
                    window.location.href = res.data.url
                }
                setDisable(true)
            })
            .catch((error) => {
                setDisable(false)
                console.log(error)
            })
    }


    const handleTransfer = () => {
        axios.post(`http://localhost:5000/api/checkout/transfer`)
            .then((res) => {
                console.log("==>", res.data.id)
                if (res.data.url) {
                    window.location.href = res.data.url
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <>
            <button className="uiButton" onClick={() => handleCheckout()}>checkOut</button>
            {
                disable ?

                    <button className="uiButton"
                        style={{
                            width: "auto"
                        }}
                        disabled={true}
                    >
                        <div className="spinner">
                            <svg
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                                    stroke="white"
                                />
                            </svg>
                        </div>
                    </button>
                    :
                    <button
                        style={{
                            width: "auto"
                        }}
                        className="uiButton"
                        onClick={() => handleCreateAccountId()}
                    >create Account</button>
            }
            <button className="uiButton" onClick={() => handleTransfer()}>Transfer</button>



        </>
    )
}


export default PayButton;