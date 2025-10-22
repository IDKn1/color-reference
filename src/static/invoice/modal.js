function modalToggle(modalId, toggleBtn) {
  const modal = document.getElementById(modalId);
  if (modal.style.display === "none" || modal.style.display === "") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

// Make the function available globally
window.modalToggle = modalToggle;

// Add event listeners
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtnItem = document.getElementById("modal-toggle-btn-item");
  const toggleBtnInfo = document.getElementById("modal-toggle-btn-info");

  if (toggleBtnItem) {
    toggleBtnItem.addEventListener("click", () =>
      modalToggle("add-item-modal", toggleBtnItem)
    );
  }
  if (toggleBtnInfo) {
    toggleBtnInfo.addEventListener("click", () =>
      modalToggle("info-modal", toggleBtnInfo)
    );
  }

  // Close button event listeners - close all modals
  const closeButtons = document.querySelectorAll(".modal-close");
  closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      // Close all modals and reset all toggle buttons
      const allModals = document.querySelectorAll(".modal");
      allModals.forEach((modal) => {
        modal.style.display = "none";
      });
    });
  });
});
