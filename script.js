const currentEl = document.querySelector('#current');
const previousEl = document.querySelector('#previous');
const historyEl = document.querySelector('#history');
const historyList = document.querySelector('#historyList');
const modeLabel = document.querySelector('#modeLabel');

let expression = '';
let history = [];
let angleMode = 'DEG';
let openParentheses = 0;

const format = value => {
  if (!Number.isFinite(value)) return 'Error';
  return Number(value.toPrecision(12)).toLocaleString('en-US', { maximumFractionDigits: 10 });
};

function updateDisplay(pop = false) {
  currentEl.textContent = expression || '0';
  modeLabel.textContent = angleMode;
  currentEl.classList.toggle('pop', pop);
  if (pop) setTimeout(() => currentEl.classList.remove('pop'), 210);
  document.querySelectorAll('.operator').forEach(button => {
    button.classList.toggle('selected', expression.endsWith(button.dataset.value));
  });
}

function append(value) {
  if (expression === 'Error') expression = '';
  expression += value;
  updateDisplay(true);
}

function evaluate(source) {
  let safe = source.replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-')
    .replaceAll('π', 'Math.PI').replaceAll('sqrt(', 'Math.sqrt(')
    .replaceAll('log(', 'Math.log10(').replaceAll('ln(', 'Math.log(');
  if (angleMode === 'DEG') {
    safe = safe.replaceAll('sin(', 'Math.sin((Math.PI/180)*').replaceAll('cos(', 'Math.cos((Math.PI/180)*').replaceAll('tan(', 'Math.tan((Math.PI/180)*');
  } else {
    safe = safe.replaceAll('sin(', 'Math.sin(').replaceAll('cos(', 'Math.cos(').replaceAll('tan(', 'Math.tan(');
  }
  safe = safe.replace(/\^/g, '**').replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
  if (!/^[0-9+\-*/().\sA-Za-z_]+$/.test(safe) || /(?:constructor|window|document|globalThis|eval|Function)/i.test(safe)) throw new Error('Invalid formula');
  return Function(`"use strict"; return (${safe})`)();
}

function calculate() {
  if (!expression) return;
  try {
    while (openParentheses > 0) { expression += ')'; openParentheses -= 1; }
    const original = expression;
    const result = evaluate(expression);
    if (!Number.isFinite(result)) throw new Error('Invalid result');
    const formatted = format(result);
    history.unshift({ calculation: original, result: formatted });
    history = history.slice(0, 8);
    renderHistory();
    previousEl.textContent = `${original} =`;
    expression = String(result);
    updateDisplay(true);
  } catch {
    previousEl.textContent = 'Check formula and try again';
    expression = 'Error';
    updateDisplay(true);
  }
}

function clear() { expression = ''; previousEl.textContent = ''; openParentheses = 0; updateDisplay(); }
function renderHistory() {
  historyList.innerHTML = history.length ? history.map((item, index) => `<div class="history-item" data-index="${index}"><span>${item.calculation}</span><strong>${item.result}</strong></div>`).join('') : '<p>No calculations yet</p>';
}

document.querySelector('.keys').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const { action, number, value } = button.dataset;
  if (number !== undefined) append(number);
  else if (button.classList.contains('operator')) append(value);
  else if (action === 'function' || action === 'constant') append(value);
  else if (action === 'square') append('^2');
  else if (action === 'decimal') append(expression.endsWith('.') ? '' : '.');
  else if (action === 'equals') calculate();
  else if (action === 'clear') clear();
  else if (action === 'backspace') { expression = expression.slice(0, -1); updateDisplay(); }
  else if (action === 'percent') append('%');
  else if (action === 'angle') { angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG'; button.textContent = angleMode; updateDisplay(); }
  else if (action === 'parenthesis') { if (openParentheses > 0 && /[\dπ)]$/.test(expression)) { append(')'); openParentheses -= 1; } else { append(/[\dπ)]$/.test(expression) ? '*(' : '('); openParentheses += 1; } }
});

document.addEventListener('keydown', event => {
  const key = event.key;
  if (/^\d$/.test(key) || ['+', '-', '*', '/', '.', '(', ')', '^'].includes(key)) append(key === '*' ? '×' : key === '/' ? '÷' : key === '-' ? '−' : key);
  else if (key === 'Enter' || key === '=') { event.preventDefault(); calculate(); }
  else if (key === 'Escape') clear();
  else if (key === 'Backspace') { expression = expression.slice(0, -1); updateDisplay(); }
});
document.querySelector('#historyButton').addEventListener('click', () => historyEl.classList.toggle('open'));
document.querySelector('#clearHistory').addEventListener('click', () => { history = []; renderHistory(); });
historyList.addEventListener('click', event => {
  const item = event.target.closest('.history-item');
  if (item) { expression = history[item.dataset.index].result.replace(/,/g, ''); previousEl.textContent = ''; updateDisplay(true); }
});
updateDisplay();
