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
        axios.post(`http://localhost:5000/api/checkout/CreateAccountId`,{})
        .then((res)=>{
            console.log("==>",res)
            // if(res.data.url){
            //     window.location.href = res.data.url
            // }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleCreateAccount = () => {
        axios.post(`http://localhost:5000/api/checkout/accountCreate`,{})
        .then((res)=>{
            console.log("==>",res)
            // if(res.data.url){
            //     window.location.href = res.data.url
            // }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <>
            <button onClick={()=>handleCheckout()}>checkOut</button>
            <button onClick={()=>handleCreateAccountId()}>create Account id</button>
            <button onClick={()=>handleCreateAccount()}>create Account</button>
        </>
    )
}


export default PayButton;