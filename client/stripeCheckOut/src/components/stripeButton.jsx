import axios from 'axios'

const PayButton = () => {

    const handleCheckout = () => {
        let product= {
            foo :"product01"
        }
        axios.post(`http://localhost:5000/api/checkout/create-checkout-session`,{
            product
        })
        .then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    const handleCreateAccountId = () => {
        axios.post(`http://localhost:5000/api/checkout/createAccountAndLink`)
        .then((res)=>{
            console.log("==>",res.data.id)
            if(res.data.url){
                window.location.href = res.data.url
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    const handleTransfer = () => {
        axios.post(`http://localhost:5000/api/checkout/transfer`)
        .then((res)=>{
            console.log("==>",res.data.id)
            if(res.data.url){
                window.location.href = res.data.url
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    return (
        <>
            <button onClick={()=>handleCheckout()}>checkOut</button>
            <button onClick={()=>handleCreateAccountId()}>create Account id</button>
            <button onClick={()=>handleTransfer()}>Transfer</button>
        </>
    )
}


export default PayButton;