document.addEventListener("DOMContentLoaded", () => {

    function showClearModal() {
      document.getElementById("clearDataModal").classList.remove("hidden");
    }
  
    function hideClearModal() {
      document.getElementById("clearDataModal").classList.add("hidden");
    }

    document.getElementById("clearDataModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("clearDataModal")) {
    hideClearModal();
  }
});
  
    function clearLocalStorage() {
  localStorage.removeItem("dailyCheckInData");

  const saveFields = document.querySelectorAll("#checkinForm input, #checkinForm textarea, #checkinForm select");
  saveFields.forEach(field => {
    if (field.type === "checkbox") {
      field.checked = false; 
    } else {
      field.value = ""; 
    }
  });

  const dynamicSections = ["winsContainer", "challengesContainer", "selfReflectionsContainer"];
  dynamicSections.forEach(sectionId => {
    const container = document.getElementById(sectionId);
    container.innerHTML = ""; 
  });

  document.cookie.split(";").forEach(cookie => {
    const [name] = cookie.split("=");
    document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  hideClearModal();
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
  
    function addReflectionField(containerId, sectionType, value = "") {
      const container = document.getElementById(containerId);
      const div = document.createElement("div");
      div.className = "flex items-center mb-2";
  
      const textarea = document.createElement("textarea");
      textarea.className = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring";
      textarea.placeholder = `Add ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}...`;
      textarea.value = value; // Restore saved value if provided
      textarea.addEventListener("input", saveToLocalStorage);
  
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "ml-2 text-red-500";
      deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 2a2 2 0 00-2 2v1H3a1 1 0 100 2h14a1 1 0 100-2h-1V4a2 2 0 00-2-2H6zM5 9a1 1 0 011-1h8a1 1 0 011 1v7a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" />
        </svg>`;
      deleteButton.addEventListener("click", () => {
        div.remove();
        saveToLocalStorage();
      });
  
      div.appendChild(textarea);
      div.appendChild(deleteButton);
      container.appendChild(div);
    }
  
    document.getElementById("gearButton").addEventListener("click", showClearModal);
    document.getElementById("closeModal").addEventListener("click", hideClearModal);
    document.getElementById("confirmClear").addEventListener("click", clearLocalStorage);
  
    const saveFields = document.querySelectorAll("#checkinForm input, #checkinForm textarea, #checkinForm select");
    saveFields.forEach(field => {
      field.addEventListener("input", saveToLocalStorage);
      field.addEventListener("change", saveToLocalStorage);
    });
  
    loadFromLocalStorage();
  });