
import { useEffect, useState } from 'react';
import './index.css';
import Transaction from './transaction'
function App() {

  const [dummyTransactions,setDummyTransactions] = useState(()=>{
    const stickyTransactions = window.localStorage.getItem('transaction')
    return stickyTransactions !== null ? JSON.parse(stickyTransactions) : []

  })
  const [inputName,setInputName] = useState("")
  const [inputValue,setInputValue] = useState("")
  const [expenses,setExpenses] = useState(0)
  const [income,setIncome] = useState(0)
  const [total,setTotal] = useState(0)



const addTransaction = event =>{
  event.preventDefault()
  const isSomeInputEmpty = inputValue.trim() === "" || inputName.trim() === ""
  if(isSomeInputEmpty){
    alert('Por favor, preencha os campos nome e valor da transação')
    return
  }

  
  const newTransaction = {
    id:1,name:inputName,value: parseInt(inputValue)
  }
  setDummyTransactions(dummyTransactions => [...dummyTransactions,newTransaction])
  setInputName("")
  setInputValue("")
}


const handleIncome = transactionAmount =>{
  setIncome(transactionAmount.filter(value => value > 0)
  .reduce((accumulator,value) => accumulator+value,0))
}
const handleExpensses = transactionAmount =>{
  setExpenses(transactionAmount.filter(value => value < 0)
  .reduce((acummulator,value) => acummulator+value,0)
  )
}
const handleTotal = transactionAmount =>{
  setTotal(transactionAmount.reduce((acummulator,value)=> acummulator + value,0))
}



useEffect(()=>{
  const transactionAmount = dummyTransactions.map(transaction => transaction.value)
  localStorage.setItem('transaction',JSON.stringify(dummyTransactions))
  handleIncome(transactionAmount)
  handleExpensses(transactionAmount)
  handleTotal(transactionAmount)
},[dummyTransactions])
  
const removeTransactions = i =>{
  console.log(i)
  let newDummyTransactions = dummyTransactions
  newDummyTransactions = newDummyTransactions.filter((value,index)=> index !== i)
  console.log(newDummyTransactions)
  setDummyTransactions(newDummyTransactions)
} 


  return (
    <div className="App">
      <h2>Controle de despesas</h2>

      <div className="container">
        <h4>Saldo atual</h4>

        <h1 id="balance" className="balance">{'R$ '+ total.toFixed(2) }</h1>

        <div className="inc-exp-container">
          <div>
            <h4>Receitas</h4>
            <p id="money-plus" className="money plus">{'+ R$ ' + income.toFixed(2)} </p>
          </div>

          <div>
            <h4>Despesas</h4>
            <p id="money-minus" className="money minus">{'- R$ ' + expenses.toFixed(2)}</p>
          </div>
        </div>
        
        <h3>Transações</h3>
        <div className="scroll">
        <ul id="transactions" className="transactions">
          {dummyTransactions.map((transaction, index) => 
              <Transaction 
              transactionType={transaction.value < 0 ?"minus" : "plus"}
               transactionName={transaction.name} 
               transactionValue={transaction.value}
               key={index}
               index={index}
               removeTransaction={()=> {removeTransactions(index)}}
              ></Transaction>
            )}
        </ul>
        </div>
        <h3>Adicionar transação</h3>

        <form id="form" onSubmit={addTransaction}>
          <div className="form-control">
            <label htmlFor="text">Nome</label>
            <input autoFocus type="text" id="text" placeholder="Nome da transação"
            value={inputName}
            onChange={event => setInputName(event.target.value) }
            />
          </div>

          <div className="form-control">
            <label htmlFor="amount">Valor <br />
              <small>(negativo - despesas, positivo - receitas)</small>
            </label>
            <input type="number" id="amount" placeholder="Valor da transação"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            />
          </div>

          <button className="btn">Adicionar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
