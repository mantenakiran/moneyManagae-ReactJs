// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balanceInput, incomeInput, expensesInput} = props

  return (
    <div className="money-details-container">
      <div className="balance-container">
        <img
          alt="balance"
          className="balance-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        />
        <div className="text-cont">
          <p className="balance-text">Your Balance</p>
          <p data-testid="balanceAmount" className="amount">
            Rs {balanceInput}
          </p>
        </div>
      </div>

      <div className="income-container">
        <img
          alt="income"
          className="balance-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        />
        <div className="text-cont">
          <p className="balance-text">Your Income</p>
          <p data-testid="incomeAmount" className="amount">
            Rs {incomeInput}
          </p>
        </div>
      </div>

      <div className="expenses-container">
        <img
          alt="expenses"
          className="balance-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        />
        <div className="text-cont">
          <p className="balance-text">Your Expenses</p>
          <p data-testid="expensesAmount" className="amount">
            Rs {expensesInput}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
