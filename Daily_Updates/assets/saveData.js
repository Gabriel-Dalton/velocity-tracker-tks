function saveToLocalStorage() {
  const data = {};

  const fields = document.querySelectorAll("#checkinForm input, #checkinForm textarea, #checkinForm select");
  fields.forEach(field => {
    if (field.type === "checkbox") {
      data[field.id] = field.checked;
    } else {
      data[field.id] = field.value;
    }
  });

  const dynamicSections = ["winsContainer", "challengesContainer", "selfReflectionsContainer"];
  dynamicSections.forEach(sectionId => {
    const items = [];
    document.querySelectorAll(`#${sectionId} textarea`).forEach(textarea => {
      items.push(textarea.value);
    });
    data[sectionId] = items;
  });

  localStorage.setItem("dailyCheckInData", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("dailyCheckInData")) || {};

  for (let id in data) {
    const field = document.getElementById(id);
    if (field) {
      if (field.type === "checkbox") {
        field.checked = data[id];
      } else {
        field.value = data[id];
      }
    }
  }

  const dynamicSections = ["winsContainer", "challengesContainer", "selfReflectionsContainer"];
  dynamicSections.forEach(sectionId => {
    const container = document.getElementById(sectionId);
    const items = data[sectionId] || [];
    items.forEach(value => {
      addReflectionField(sectionId, sectionId.slice(0, -9), value);
    });
  });
}

function clearLocalStorage() {
  localStorage.removeItem("dailyCheckInData");
  location.reload(); 
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();

  const saveFields = document.querySelectorAll("#checkinForm input, #checkinForm textarea, #checkinForm select");
  saveFields.forEach(field => {
    field.addEventListener("input", saveToLocalStorage);
    field.addEventListener("change", saveToLocalStorage);
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("clearDataModal").classList.add("hidden");
  });

  document.getElementById("openModal").addEventListener("click", () => {
    document.getElementById("clearDataModal").classList.remove("hidden");
  });

  document.getElementById("confirmClear").addEventListener("click", () => {
    clearLocalStorage();
  });
});
