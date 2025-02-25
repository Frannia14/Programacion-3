type Currency = 'DOP' | 'USD';

interface Price {
    amount: number;
    currency: Currency;
}

interface ExpenseItem {
    id?: number;
    title: string;
    cost: Price;
}

interface IExpenses {
    expenses: ExpenseItem[];
    finalCurrency: Currency;
    add(item: ExpenseItem): boolean;
    get(index: number): ExpenseItem | null;
    getTotal(): string;
    remove(id: number): boolean;
}

class Expenses implements IExpenses {
    expenses: ExpenseItem[] = [];
    finalCurrency: Currency;
    private count: number = 0;

    constructor(currency: Currency) {
        this.finalCurrency = currency;
    }

    add(item: ExpenseItem): boolean {
        if (this.expenses.some(exp => exp.id === item.id)) {
            return false; // Evita IDs duplicados
        }
        item.id = this.count++;
        this.expenses.push(item);
        return true;
    }

    get(index: number): ExpenseItem | null {
        return this.expenses[index] || null;
    }

    getTotal(): string {
        const conversionRates: Record<Currency, Record<Currency, number>> = {
            USD: { DOP: 62, USD: 1 },
            DOP: { USD: 1 / 62, DOP: 1 }
        };

        const total = this.expenses.reduce((acc, item) => {
            return acc + item.cost.amount * conversionRates[item.cost.currency][this.finalCurrency];
        }, 0);

        return `${this.finalCurrency} $${total.toFixed(2)}`;
    }

    remove(id: number): boolean {
        const initialLength = this.expenses.length;
        this.expenses = this.expenses.filter(item => item.id !== id);
        return this.expenses.length < initialLength;
    }
}
