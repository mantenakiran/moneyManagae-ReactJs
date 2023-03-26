import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionsList: [],
    optionsInput: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state

    const filterDetails = transactionsList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({transactionsList: filterDetails})
  }

  onAddTransactionDetails = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionsInput} = this.state
    const typeOption = transactionTypeOptions.find(
      eachItem => eachItem.optionId === optionsInput,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionsInput: transactionTypeOptions[0].optionId,
    }))
  }

  titleInputValue = event => {
    this.setState({titleInput: event.target.value})
  }

  amountInputValue = event => {
    this.setState({amountInput: event.target.value})
  }

  selectInputValue = event => {
    this.setState({optionsInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state

    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state

    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state

    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionsInput, transactionsList} = this.state
    const balanceAmountDetails = this.getBalance()
    const incomeAmountDetails = this.getIncome()
    const expensesDetails = this.getExpenses()

    return (
      <div className="bg-container">
        <div className="title-container">
          <h1 className="heading">Hi, Richard</h1>
          <p className="welcome-text">
            Welcome back to your{' '}
            <span className="welcome-span">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceInput={balanceAmountDetails}
          incomeInput={incomeAmountDetails}
          expensesInput={expensesDetails}
        />
        <div className="bg">
          <div className="transaction-container">
            <form
              className="form-container"
              onSubmit={this.onAddTransactionDetails}
            >
              <h1 className="transaction-textEl">Add Transaction</h1>
              <div className="inputContainer">
                <label className="title-text" htmlFor="title">
                  TITLE
                </label>
                <div>
                  <input
                    value={titleInput}
                    onChange={this.titleInputValue}
                    className="input-Element"
                    placeholder="TITLE"
                    type="text"
                    id="title"
                  />
                </div>
              </div>

              <div className="inputContainer">
                <label className="title-text" htmlFor="amount">
                  AMOUNT
                </label>
                <div>
                  <input
                    value={amountInput}
                    onChange={this.amountInputValue}
                    className="input-Element"
                    placeholder="AMOUNT"
                    type="text"
                    id="amount"
                  />
                </div>
              </div>

              <div className="inputContainer">
                <label htmlFor="type" className="select-text">
                  TYPE
                </label>
                <select
                  value={optionsInput}
                  onChange={this.selectInputValue}
                  id="type"
                  className="input-Element"
                >
                  {transactionTypeOptions.map(eachItem => (
                    <option key={eachItem.optionId} value={eachItem.optionId}>
                      {eachItem.displayText}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>

          <div className="history-container">
            <h1 className="history-text">History</h1>
            <div className="history-list-container">
              <ul className="ul-list">
                <li className="list-headings">
                  <p className="headingEl">Title</p>
                  <p className="headingEl">Amount</p>
                  <p className="headingEle">Type</p>
                </li>
                {transactionsList.map(eachItem => (
                  <TransactionItem
                    deleteTransaction={this.deleteTransaction}
                    key={eachItem.id}
                    details={eachItem}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
