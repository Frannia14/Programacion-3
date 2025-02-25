"use strict";
class Expenses {
    constructor(currency) {
        this.expenses = [];
        this.count = 0;
        this.finalCurrency = currency;
    }
    add(item) {
        if (this.expenses.some(exp => exp.id === item.id)) {
            return false; // Evita IDs duplicados
        }
        item.id = this.count++;
        this.expenses.push(item);
        return true;
    }
    get(index) {
        return this.expenses[index] || null;
    }
    getTotal() {
        const conversionRates = {
            USD: { DOP: 62, USD: 1 },
            DOP: { USD: 1 / 62, DOP: 1 }
        };
        const total = this.expenses.reduce((acc, item) => {
            return acc + item.cost.amount * conversionRates[item.cost.currency][this.finalCurrency];
        }, 0);
        return `${this.finalCurrency} $${total.toFixed(2)}`;
    }
    remove(id) {
        const initialLength = this.expenses.length;
        this.expenses = this.expenses.filter(item => item.id !== id);
        return this.expenses.length < initialLength;
    }
}
