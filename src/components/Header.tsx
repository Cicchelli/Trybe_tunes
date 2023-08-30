import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { Expense } from '../redux/actions';

const Texpenses = (
  expenses: Expense[],
  currency: string,
) => expenses.reduce((total, exp) => {
  const exchangeRates = exp.exchangeRates[exp.currency];
  const convertedValue = exchangeRates
    ? parseFloat(exp.value) * parseFloat(exchangeRates.ask)
    : 0;
  return total + convertedValue;
}, 0).toFixed(2);

function Header() {
  const { email } = useSelector((state: RootState) => state.user);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const totalExpenses = Texpenses(expenses, 'BRL');

  return (
    <header>
      <p data-testid="email-field">
        Email:
        {' '}
        {email}
      </p>
      <p data-testid="total-field">{totalExpenses}</p>
      <p data-testid="header-currency-field">Currency: BRL</p>
    </header>
  );
}

export default Header;
