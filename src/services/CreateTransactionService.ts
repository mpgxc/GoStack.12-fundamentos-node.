import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
    value: number;
    type: 'income' | 'outcome';
    title: string;
}

class CreateTransactionService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public execute({ value, type, title }: RequestDTO): Transaction {
        const balance = this.transactionsRepository.getBalance();

        if (
            (type === 'outcome' && value > balance.total) ||
            (type !== 'income' && type !== 'outcome')
        ) {
            throw Error(
                'O Valor nao pode ser retirado pois e maior que o saldo disponivel!',
            );
        }
        const transation = this.transactionsRepository.create({
            value,
            type,
            title,
        });

        return transation;
    }
}

export default CreateTransactionService;
