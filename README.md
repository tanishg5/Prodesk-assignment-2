# Cash-Flow – Salary & Expense Tracker

A functional dashboard where you can enter your salary, add expenses, and see the remaining balance update in real time. Built with vanilla HTML, CSS, and JavaScript (Level 2: Data Persistence, Delete, Chart.js).

## Live Demo

https://prodesk-assignment-2.vercel.app/

## Screenshot

<img width="1913" height="908" alt="image" src="https://github.com/user-attachments/assets/ad6748d7-c6cc-40c3-b61e-f02f8f46b850" />
<img width="1918" height="918" alt="image" src="https://github.com/user-attachments/assets/fb2383ec-d93f-48c5-82eb-b6b060cb8912" />



---

## Features

### Level 1 (Base)

- **Inputs**: Total Salary (number), Expense Name (text), Expense Amount (number)
- **Display**: Salary and remaining balance shown on screen
- **Expense list**: Each expense appears in a list below the form
- **Math**: Remaining Balance = Total Salary − Total Expenses (updates in real time)
- **Validation**: Blocks adding an expense if name is empty or amount is negative

### Level 2 (Implemented)

- **Data persistence (LocalStorage)**  
  Salary and expense list are saved in the browser. After a refresh, data is restored and displayed.

- **Delete**  
  Trash icon next to each expense. Clicking it removes that expense and updates the balance and chart immediately.

- **Visualization**  
  Chart.js pie chart: **Remaining Balance** vs **Total Expenses**.

- **Dark mode**  
  Theme toggle in the navbar; preference saved in localStorage.

---

## Tech Stack

- **HTML5**: Semantic structure, form, canvas for chart
- **CSS3**: Flexbox, Grid, transitions, responsive layout, dark mode
- **JavaScript (ES6+)**: DOM manipulation, form handling, localStorage, numeric logic (`Number`/`parseFloat`), Chart.js integration
- **Chart.js** (CDN): Pie chart for balance vs expenses

---

## Project Structure

```
.
├── index.html      # Cash-Flow dashboard (form, summary, expense list, chart)
├── style.css       # Layout and styles (dashboard, form, list, chart, dark mode)
├── script.js       # Logic: salary/expenses, localStorage, add/delete, Chart.js
├── README.md       # This file
├── Prompts.md      # AI prompts used in development
└── image.png       # Optional screenshot
```

---


## How to Use

1. **Total Salary**: Enter your salary and move focus away (e.g. Tab or click elsewhere). It is saved and shown in the summary.
2. **Add expense**: Enter Expense Name and Expense Amount, then click **Add Expense**. The list, balance, and pie chart update.
3. **Delete**: Click the trash icon next to an expense to remove it; balance and chart update immediately.
4. **Refresh**: Data persists via localStorage; salary and expenses remain after reload.
5. **Dark mode**: Use the theme button in the navbar; preference is saved.

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Author

Tanish Gupta

## License

This project was created for educational purposes as part of the Prodesk IT internship program (Week 2 – Cash-Flow Assignment).
#

