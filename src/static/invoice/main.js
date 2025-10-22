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

function calculateTotal() {
  const items = document.querySelectorAll(".item-total");
  const cost = document.getElementById("cost-value");
  const paid = document.getElementById("paid-value");
  const tax = document.getElementById("tax-value");
  const total = document.getElementById("total-value");
  const taxed = document.getElementById("taxed");

  let itemsCost = 0;

  items.forEach((item) => {
    const value = parseFloat(item.textContent);
    if (!isNaN(value)) {
      itemsCost += value;
    }
  });

  const taxAmount = taxed.checked ? itemsCost * 0.13 : 0;
  const paidAmount = parseFloat(paid.textContent) || 0;

  tax.textContent = taxAmount.toFixed(2);
  cost.textContent = itemsCost.toFixed(2);
  total.textContent = "$" + (itemsCost + taxAmount - paidAmount).toFixed(2);
}

calculateTotal();
currentDate();

function savePDF() {
  window.print();
}
