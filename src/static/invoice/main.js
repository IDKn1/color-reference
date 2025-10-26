// --- Data Initialization ---
let items = [];
let formDetails = {};

// --- Helpers ---
function calcItemTotal(itemQty, itemCost) {
  return parseFloat(itemQty) * parseFloat(itemCost);
}

function itemConstructor(el, classes, content) {
  const item = document.createElement(el);
  for (const className of classes) {
    item.classList.add(className);
  }
  item.textContent = content;
  return item;
}

// --- Load stored items ---
const storedItems = sessionStorage.getItem("invoiceItems");
if (storedItems) {
  items = JSON.parse(storedItems);
} else {
  sessionStorage.setItem("invoiceItems", JSON.stringify(items));
}

// --- Load and render details ---
window.addEventListener("DOMContentLoaded", () => {
  renderDetails();
  itemRender();
});

// --- Set invoice date ---
function currentDate() {
  const date = document.getElementById("date");
  const currentDate = new Date();
  date.textContent =
    currentDate.getFullYear() +
    "/" +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + currentDate.getDate()).slice(-2);
}

currentDate();

// --- Render Details ---
function renderDetails() {
  const stored = sessionStorage.getItem("invoiceDetails");
  if (stored) {
    formDetails = JSON.parse(stored);
  }

  // contractor details
  document.getElementById("email-value").textContent =
    formDetails.email || "name@email.com";
  document.getElementById("payment-details").textContent =
    formDetails.email || "name@email.com";
  document.getElementById("phone-value").textContent =
    formDetails.phone || "+x (xxx) xxx-xxxx";

  document.getElementById("invoice-number").textContent = (
    "00000" + (formDetails.invoiceNumber || "0")
  ).slice(-5);

  // client details
  document.getElementById("company-name").textContent =
    formDetails.companyName || "Company Name";
  document.getElementById("client-name").textContent =
    formDetails.clientName || "Client Name";
  document.getElementById("client-email").textContent =
    formDetails.clientEmail || "client@client.com";
  document.getElementById("client-location").textContent =
    formDetails.clientLocation || "Client Address";

  // payment info
  document.getElementById("paid-value").textContent = parseFloat(
    formDetails.amountPaid || "0",
  ).toFixed(2);
  document.getElementById("taxed").checked = formDetails.taxed ?? false;

  sessionStorage.setItem("invoiceDetails", JSON.stringify(formDetails));

  calculateTotal();
}

// --- Field Listeners for Updates ---
const fieldMappings = [
  "email",
  "phone",
  "invoiceNumber",
  "companyName",
  "clientName",
  "clientEmail",
  "clientLocation",
  "amountPaid",
  "taxed",
];

for (const fieldId of fieldMappings) {
  const el = document.getElementById(fieldId);
  if (!el) continue;

  el.addEventListener("change", () => {
    const value = el.type === "checkbox" ? el.checked : el.value;
    formDetails[fieldId] = value;

    sessionStorage.setItem("invoiceDetails", JSON.stringify(formDetails));
    renderDetails();
    calculateTotal();
  });
}

// --- Calculate Totals ---
function calculateTotal() {
  const storedDetails = sessionStorage.getItem("invoiceDetails");
  if (storedDetails) {
    formDetails = JSON.parse(storedDetails);
  }

  const itemsTotal = document.querySelectorAll(".item-total");
  const cost = document.getElementById("cost-value");
  const tax = document.getElementById("tax-value");
  const total = document.getElementById("total-value");

  let itemsCost = 0;
  itemsTotal.forEach((item) => {
    const value = parseFloat(item.textContent);
    if (!isNaN(value)) itemsCost += value;
  });

  const taxed = formDetails.taxed === true;
  const taxAmount = taxed ? itemsCost * 0.13 : 0;
  const paidAmount = parseFloat(formDetails.amountPaid) || 0;

  tax.textContent = taxAmount.toFixed(2);
  cost.textContent = itemsCost.toFixed(2);
  total.textContent = "$" + (itemsCost + taxAmount - paidAmount).toFixed(2);
}

// --- Item Handling ---
function itemRender() {
  const itemList = document.getElementById("item-list");

  while (itemList.children.length > 1) {
    itemList.removeChild(itemList.lastChild);
  }

  for (const item of items) {
    const itemDiv = itemConstructor("div", ["item", "grid"]);
    const itemDesc = itemConstructor("p", ["item-desc"], item.desc);
    const itemQty = itemConstructor("p", ["item-qty"], item.qty);
    const itemCost = itemConstructor("p", ["item-cost"], item.rate);
    const itemTotal = itemConstructor(
      "p",
      ["item-total", "fs-1"],
      calcItemTotal(item.qty, item.rate).toFixed(2),
    );

    itemDiv.appendChild(itemDesc);
    itemDiv.appendChild(itemQty);
    itemDiv.appendChild(itemCost);
    itemDiv.appendChild(itemTotal);
    itemList.appendChild(itemDiv);
  }
  calculateTotal();
}

function itemAdd() {
  const itemDescInput = document.getElementById("item-desc").value;
  const itemQtyInput = document.getElementById("item-qty").value;
  const itemRateInput = document.getElementById("item-rate").value;

  if (!itemDescInput || !itemQtyInput || !itemRateInput) return;

  const item = {
    desc: itemDescInput,
    qty: itemQtyInput,
    rate: itemRateInput,
  };

  items.push(item);
  sessionStorage.setItem("invoiceItems", JSON.stringify(items));

  // Clear input fields
  document.getElementById("item-desc").value = "";
  document.getElementById("item-qty").value = "";
  document.getElementById("item-rate").value = "";

  document.getElementById("item-desc").focus();

  itemRender();
}

// --- Form Submit Handler ---
document.getElementById("item-form").addEventListener("submit", (e) => {
  e.preventDefault();
  itemAdd();
});

function savePDF() {
  window.print();
}
