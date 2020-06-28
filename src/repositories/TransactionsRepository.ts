/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

interface CreateTransactionDTO {
    value: number;
    type: 'income' | 'outcome';
    title: string;
}

class TransactionsRepository {
    private transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    public all(): Transaction[] {
        return this.transactions;
    }

    public getBalance(): Balance {
        const balance = this.transactions.reduce(
            (result: Balance, items: Transaction) => {
                if (items.type === 'income') {
                    result.income += items.value;
                    result.total += items.value;
                }
                if (items.type === 'outcome') {
                    result.outcome += items.value;
                    result.total -= items.value;
                }

                return result;
            },
            {
                income: 0,
                outcome: 0,
                total: 0,
            },
        );
        return balance;
    }

    public create({ value, title, type }: CreateTransactionDTO): Transaction {
        const transaction = new Transaction({ value, title, type });
        this.transactions.push(transaction);
        return transaction;
    }
}

export default TransactionsRepository;
