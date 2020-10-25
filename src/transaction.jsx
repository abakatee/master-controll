import { useEffect } from "react"


function Transaction(props){

    useEffect(()=>{
        console.log(props)
    })

    return(

         <li className={props.transactionType}>
          {props.transactionName} <span> {props.transactionType ==="plus"? "+" : "-"} R$ 
          {Math.abs( props.transactionValue)}</span><button
           onClick={() => props.removeTransaction()} className="delete-btn">x</button>
        </li> 
    )
}
export default Transaction