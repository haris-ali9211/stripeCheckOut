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
    return (
        <>
            <button onClick={()=>handleCheckout()}>checkOut</button>
        </>
    )
}


export default PayButton;