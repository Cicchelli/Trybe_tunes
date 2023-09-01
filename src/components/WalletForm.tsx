import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrenciesAction, addExpenseAction,
  editExpenseAction,
  finishEditingAction } from '../redux/actions';
import { RootState } from '../redux/reducers';

function WalletForm() {
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const dispatch = useDispatch();
  const currencies = useSelector((state: RootState) => state.wallet.currencies);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const isEditing = useSelector((state: RootState) => state.wallet.editor);
  const idToEdit = useSelector((state: RootState) => state.wallet.idToEdit);

  useEffect(() => {
    const fetchCurr = async () => {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      const fetchedCurrencies = Object.keys(data);

      dispatch(setCurrenciesAction(fetchedCurrencies));
    };
    fetchCurr();
  }, [dispatch]);

  useEffect(() => {
    if (isEditing && idToEdit !== null) {
      const editedExpense = expenses.find((exp) => exp.id === idToEdit);
      if (editedExpense) {
        setExpense(editedExpense.value);
        setDescription(editedExpense.description);
        setCurrency(editedExpense.currency);
        setMethod(editedExpense.method);
        setTag(editedExpense.tag);
      }
    }
  }, [isEditing, idToEdit, expenses]);

  const despesa = (e: { target: {
    value: React.SetStateAction<string>; }; }) => {
    setExpense(e.target.value);
  };

  const descricao = (e: { target:
  { value: React.SetStateAction<string>; }; }) => {
    setDescription(e.target.value);
  };

  const moeda = (e: { target: {
    value: React.SetStateAction<string>; }; }) => {
    setCurrency(e.target.value);
  };

  const metodo = (e: { target: {
    value: React.SetStateAction<string>; }; }) => {
    setMethod(e.target.value);
  };

  const etiqueta = (e: { target: {
    value: React.SetStateAction<string>; }; }) => {
    setTag(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const exchangeRates = currencies.reduce((acc, curr) => {
      acc[curr] = {
        code: data[curr].code,
        codein: data[curr].codein,
        name: data[curr].name,
        high: data[curr].high,
        low: data[curr].low,
        varBid: data[curr].varBid,
        pctChange: data[curr].pctChange,
        bid: data[curr].bid,
        ask: data[curr].ask,
        timestamp: data[curr].timestamp,
        create_date: data[curr].create_date,
      };
      return acc;
    }, {});

    if (isEditing) {
      const editedExpense = expenses.find((exp) => exp.id === idToEdit);
      if (editedExpense) {
        editedExpense.value = expense;
        editedExpense.description = description;
        editedExpense.currency = currency;
        editedExpense.method = method;
        editedExpense.tag = tag;
        editedExpense.exchangeRates = exchangeRates;
        dispatch(editExpenseAction(editedExpense));
        dispatch(finishEditingAction());
      }
    } else {
      dispatch(addExpenseAction({
        id: expenses.length,
        value: expense,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      }));
    }

    setExpense('');
    setDescription('');
    setCurrency('');
    setMethod('');
    setTag('');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="expense">
          Valor:
          <input
            type="number"
            id="expense"
            data-testid="value-input"
            value={ expense }
            onChange={ despesa }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ descricao }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ moeda }
          >
            {currencies.map((curr) => (
              <option key={ curr }>{curr}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ metodo }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ etiqueta }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="submit"
        >
          {isEditing ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    </div>
  );
}

export default WalletForm;
