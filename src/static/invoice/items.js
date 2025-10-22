// test json
// let items = [
//   {
//     desc: "Website Design",
//     qty: "1",
//     rate: "1500.00",
//   },
//   {
//     desc: "Logo Design",
//     qty: "14hrs",
//     rate: "50.00",
//   },
// ];

let items = [];

function calcItemTotal(itemQty, itemCost) {
  return parseFloat(itemQty) * parseFloat(itemCost);
}

const stored = sessionStorage.getItem("invoiceItems");
if (stored) {
  items = JSON.parse(stored);
} else {
  sessionStorage.setItem("invoiceItems", JSON.stringify(items));
}

function itemRender() {
  const itemList = document.getElementById("item-list");

  while (itemList.children.length > 1) {
    itemList.removeChild(itemList.lastChild);
  }

  for (const item of items) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.classList.add("grid");

    const itemDesc = document.createElement("p");
    itemDesc.classList.add("item-desc");
    itemDesc.textContent = item.desc;

    const itemQty = document.createElement("p");
    itemQty.classList.add("item-qty");
    itemQty.textContent = item.qty;

    const itemCost = document.createElement("p");
    itemCost.classList.add("item-cost");
    itemCost.textContent = item.rate;

    const itemTotal = document.createElement("p");
    itemTotal.classList.add("item-total", "fs-1");
    itemTotal.textContent = calcItemTotal(item.qty, item.rate).toFixed(2);

    itemDiv.appendChild(itemDesc);
    itemDiv.appendChild(itemQty);
    itemDiv.appendChild(itemCost);
    itemDiv.appendChild(itemTotal);
    itemList.appendChild(itemDiv);
  }
  calculateTotal();
}

function itemUpdate() {
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

  // Clear input after adding
  document.getElementById("item-desc").value = "";
  document.getElementById("item-qty").value = "";
  document.getElementById("item-rate").value = "";

  document.getElementById("item-desc").focus();
}

document.getElementById("item-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page refresh
  itemUpdate();
  itemRender();
});

itemRender();
