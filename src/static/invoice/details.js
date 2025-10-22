// test json
// let formDetails = {
//   email: "john.doe@freelancer.com",
//   phone: "+1 (555) 123-4567",

//   invoiceNumber: "42",

//   companyName: "TechCorp Solutions",
//   clientName: "Jane Smith",
//   clientEmail: "jane.smith@techcorp.com",
//   clientLocation: "123 Business Ave, New York, NY 10001",

//   tax: true,
//   amountPaid: "500",
// };

let formDetails = {};

window.addEventListener("DOMContentLoaded", renderDetails);

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
  document.getElementById("paid-value").textContent = parseFloat(
    formDetails.amountPaid || "0",
  ).toFixed(2);
  document.getElementById("taxed").checked = formDetails.tax ?? false;

  sessionStorage.setItem("invoiceDetails", JSON.stringify(formDetails));
}

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
    const key = fieldId === "taxed" ? "tax" : fieldId;
    formDetails[key] = value;

    sessionStorage.setItem("invoiceDetails", JSON.stringify(formDetails));
    renderDetails();
    calculateTotal();
  });
}
