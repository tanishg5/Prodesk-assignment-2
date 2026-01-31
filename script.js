// ========== State ==========
const STORAGE_SALARY = 'cashflow_salary';
const STORAGE_EXPENSES = 'cashflow_expenses';

let totalSalary = 0;
let expenses = []; // [{ id, name, amount }, ...]
let pieChartInstance = null;

// ========== DOM Elements ==========
const form = document.getElementById('cashFlowForm');
const salaryInput = document.getElementById('totalSalary');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const displaySalaryEl = document.getElementById('displaySalary');
const displayExpensesEl = document.getElementById('displayExpenses');
const displayBalanceEl = document.getElementById('displayBalance');
const expenseListEl = document.getElementById('expenseList');
const emptyMessageEl = document.getElementById('emptyMessage');
const pieChartCanvas = document.getElementById('pieChart');
const themeToggle = document.getElementById('themeToggle');

// ========== Load from LocalStorage ==========
function loadFromStorage() {
  const savedSalary = localStorage.getItem(STORAGE_SALARY);
  if (savedSalary !== null && savedSalary !== '') {
    totalSalary = parseFloat(savedSalary) || 0;
    salaryInput.value = totalSalary > 0 ? totalSalary : '';
  }

  const savedExpenses = localStorage.getItem(STORAGE_EXPENSES);
  if (savedExpenses) {
    try {
      expenses = JSON.parse(savedExpenses);
      if (!Array.isArray(expenses)) expenses = [];
    } catch (e) {
      expenses = [];
    }
  }
}

// ========== Save to LocalStorage ==========
function saveToStorage() {
  localStorage.setItem(STORAGE_SALARY, String(totalSalary));
  localStorage.setItem(STORAGE_EXPENSES, JSON.stringify(expenses));
}

// ========== Math & Display ==========
function getTotalExpenses() {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

function getRemainingBalance() {
  return totalSalary - getTotalExpenses();
}

function formatMoney(num) {
  return Number(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateSummary() {
  const totalExp = getTotalExpenses();
  const balance = getRemainingBalance();

  displaySalaryEl.textContent = formatMoney(totalSalary);
  displayExpensesEl.textContent = formatMoney(totalExp);
  displayBalanceEl.textContent = formatMoney(balance);
}

// ========== Render Expense List ==========
function renderExpenseList() {
  expenseListEl.innerHTML = '';

  if (expenses.length === 0) {
    emptyMessageEl.style.display = 'block';
    return;
  }
  emptyMessageEl.style.display = 'none';

  expenses.forEach((exp) => {
    const li = document.createElement('li');
    li.className = 'expense-item';
    li.dataset.id = exp.id;

    const text = document.createElement('span');
    text.className = 'expense-text';
    text.textContent = `${exp.name}: ₹${formatMoney(exp.amount)}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-trash';
    deleteBtn.setAttribute('aria-label', 'Delete expense');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.addEventListener('click', () => deleteExpense(exp.id));

    li.appendChild(text);
    li.appendChild(deleteBtn);
    expenseListEl.appendChild(li);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter((e) => e.id !== id);
  saveToStorage();
  renderExpenseList();
  updateSummary();
  updatePieChart();
}

// ========== Pie Chart (Chart.js) ==========
function updatePieChart() {
  const totalExp = getTotalExpenses();
  const balance = Math.max(0, getRemainingBalance());

  if (pieChartInstance) {
    pieChartInstance.destroy();
    pieChartInstance = null;
  }

  const hasData = totalSalary > 0 && (totalExp > 0 || balance > 0);
  if (!hasData) {
    return;
  }

  const ctx = pieChartCanvas.getContext('2d');
  pieChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Remaining Balance', 'Total Expenses'],
      datasets: [
        {
          data: [balance, totalExp],
          backgroundColor: ['#22c55e', '#ef4444'],
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const pct = total ? ((context.raw / total) * 100).toFixed(1) : 0;
              return `${context.label}: ₹${formatMoney(context.raw)} (${pct}%)`;
            },
          },
        },
      },
    },
  });
}

// ========== Form: Salary input ==========
salaryInput.addEventListener('change', function () {
  const val = parseFloat(this.value);
  if (Number.isNaN(val) || val < 0) {
    totalSalary = 0;
    this.value = '';
  } else {
    totalSalary = val;
  }
  saveToStorage();
  updateSummary();
  updatePieChart();
});

// ========== Form: Add Expense ==========
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  // Validation: empty or negative
  if (!name || name === '') {
    alert('Please enter an expense name.');
    return;
  }
  if (Number.isNaN(amount) || amount < 0) {
    alert('Please enter a valid expense amount (0 or positive number).');
    return;
  }

  const id = 'exp_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  expenses.push({ id, name, amount });
  saveToStorage();

  expenseNameInput.value = '';
  expenseAmountInput.value = '';
  expenseNameInput.focus();

  renderExpenseList();
  updateSummary();
  updatePieChart();
});

// ========== Theme Toggle ==========
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// ========== Init ==========
function init() {
  loadFromStorage();
  updateSummary();
  renderExpenseList();
  updatePieChart();

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
}

document.addEventListener('DOMContentLoaded', init);
