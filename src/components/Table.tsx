import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import { Expense, deleteExpenseAction, editExpenseAction } from '../redux/actions';

function Table() {
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const dispatch = useDispatch();

  function edit(editedExpense: Expense) {
    dispatch(editExpenseAction(editedExpense));
  }

  function erase(expenseId: number) {
    dispatch(deleteExpenseAction(expenseId));
  }

  const info = (expen: Expense) => {
    const currencyInfo = expen.exchangeRates[expen.currency];

    if (currencyInfo && currencyInfo.ask) {
      const message = parseFloat(currencyInfo.ask).toFixed(2);
      const convertedValue = (parseFloat(currencyInfo.ask)
      * parseFloat(expen.value)).toFixed(2);

      return {
        name: currencyInfo.name,
        message,
        convertedValue,
      };
    }
    return {
      name: expen.currency,
      message: 'Taxa de câmbio não disponível',
      convertedValue: 'Taxa de câmbio não disponível',
    };
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expen: Expense) => {
            const currencyInfo = info(expen);
            return (
              <tr key={ expen.id }>
                <td>{expen.description}</td>
                <td>{expen.tag}</td>
                <td>{expen.method}</td>
                <td>{parseFloat(expen.value).toFixed(2)}</td>
                <td>{currencyInfo.name}</td>
                <td>{currencyInfo.message}</td>
                <td>{currencyInfo.convertedValue}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => edit(expen) }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => erase(expen.id) }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
