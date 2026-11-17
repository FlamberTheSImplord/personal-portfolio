// Fintrack sample data. Board cards drive every number on the page: the KPI cards start at the reference's
// values and then move by however much the board changes (see kpis below), so edits show up everywhere.

export type ColumnId = 'bills' | 'daily' | 'savings' | 'income'
export type Tone = 'green' | 'red' | 'amber' | 'purple'
export type Entry = {
  id: string, column: ColumnId, category: string, title: string, amount: number, status: string,
  date: string, note: string, target?: number, deadline?: string,
}

export const columns: {id: ColumnId, name: string, add: string, statuses: string[]}[] = [
  {id: 'bills', name: 'Bills & Fixed', add: 'Add bill', statuses: ['Paid', 'Due', 'Overdue']},
  {id: 'daily', name: 'Daily Spending', add: 'Add expense', statuses: ['Cleared', 'Pending', 'Overdue']},
  {id: 'savings', name: 'Savings Goals', add: 'Add goal', statuses: ['On Track', 'In Progress', 'Almost There']},
  {id: 'income', name: 'Income', add: 'Log income', statuses: ['Deposited', 'In Progress', 'Awaiting']},
]

export const tone: Record<string, Tone> = {
  Paid: 'green', Cleared: 'green', Deposited: 'green', 'Almost There': 'green',
  Overdue: 'red', Due: 'amber', Pending: 'amber', 'In Progress': 'amber', Awaiting: 'amber', 'On Track': 'purple',
}
/** Statuses that count as money that has actually moved. */
export const settled = new Set(['Paid', 'Cleared', 'Deposited'])

export const categories: Record<ColumnId, string[]> = {
  bills: ['Housing', 'Utilities', 'Insurance', 'Subscriptions'],
  daily: ['Groceries', 'Transport', 'Utilities', 'Dining'],
  savings: ['Safety', 'Travel', 'Purchase'],
  income: ['Salary', 'Freelance', 'Invoice'],
}

// As shown in the reference (Daily Spending's "Electric Bill / Fuel" kept as printed).
export const seed: Entry[] = [
  {id: 'rent', column: 'bills', category: 'Housing', title: 'Rent of October', amount: 1250, status: 'Paid', date: 'Due Oct 1, 2026', note: 'Paid Oct 1'},
  {id: 'electric', column: 'bills', category: 'Utilities', title: 'Electric Bill', amount: 128, status: 'Overdue', date: 'Due Oct 20, 2026', note: '6 days late'},
  {id: 'internet', column: 'bills', category: 'Utilities', title: 'Internet Comcast', amount: 69.99, status: 'Overdue', date: 'Due Oct 30, 2026', note: 'In 4 days'},
  {id: 'groceries', column: 'daily', category: 'Groceries', title: 'Whole Foods Market', amount: 94.3, status: 'Cleared', date: 'Oct 23, 2026', note: 'Weekly groceries'},
  {id: 'fuel', column: 'daily', category: 'Transport', title: 'Electric Bill', amount: 52, status: 'Pending', date: 'Oct 20, 2026', note: 'Fuel'},
  {id: 'coffee', column: 'daily', category: 'Utilities', title: 'Blue Bottle Coffee', amount: 8.5, status: 'Overdue', date: 'Oct 23, 2026', note: 'Coffee'},
  {id: 'emergency', column: 'savings', category: 'Safety', title: 'Emergency Fund', amount: 8400, target: 10000, status: 'On Track', date: '', deadline: "Jun '27", note: ''},
  {id: 'japan', column: 'savings', category: 'Travel', title: 'Vacation · Japan', amount: 2100, target: 5000, status: 'In Progress', date: '', deadline: "Dec '26", note: ''},
  {id: 'laptop', column: 'savings', category: 'Purchase', title: 'New Laptop', amount: 1820, target: 2000, status: 'Almost There', date: '', deadline: "Nov '26", note: ''},
  {id: 'payroll', column: 'income', category: 'Salary', title: 'Payroll (2 deposits)', amount: 6450, status: 'Deposited', date: 'Oct 10 & Oct 24', note: 'Bi Weekly'},
  {id: 'freelance', column: 'income', category: 'Freelance', title: 'Freelance Payment', amount: 750, status: 'Deposited', date: 'Oct 18', note: 'Wire transfer'},
  {id: 'invoice', column: 'income', category: 'Invoice', title: 'Design Invoice #12', amount: 1200, status: 'In Progress', date: 'Due Oct 28', note: 'Awaiting'},
]

const sum = (list: Entry[], keep: (e: Entry) => boolean) => list.filter(keep).reduce((t, e) => t + e.amount, 0)
const raw = (list: Entry[]) => {
  const income = sum(list, e => e.column === 'income' && settled.has(e.status))
  const spent = sum(list, e => (e.column === 'bills' || e.column === 'daily') && settled.has(e.status))
  return {
    balance: income - spent, income, spent,
    incomeCount: list.filter(e => e.column === 'income').length,
    expenseCount: list.filter(e => e.column === 'bills' || e.column === 'daily').length,
    pendingCount: list.filter(e => !settled.has(e.status) && e.column !== 'savings').length,
  }
}
const base = raw(seed)

/** Page numbers: the reference's values, shifted by the board's change since the seed. */
export function kpis(list: Entry[]) {
  const now = raw(list)
  const income = 6450 + now.income - base.income, spent = 3920 + now.spent - base.spent
  return {
    balance: 24580 + now.balance - base.balance, income, spent, share: income > 0 ? Math.round(spent / income * 100) : 0,
    counts: {income: 12 + now.incomeCount - base.incomeCount, expenses: 8 + now.expenseCount - base.expenseCount, pending: 5 + now.pendingCount - base.pendingCount},
  }
}

export const money = (n: number, sign = false) => `${sign && n > 0 ? '+' : ''}${n < 0 ? '−' : ''}$${Math.abs(n).toLocaleString('en-US', {minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2})}`
export const money2 = (n: number, sign = false) => `${sign ? '+' : ''}$${n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
