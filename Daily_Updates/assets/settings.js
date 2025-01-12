document.addEventListener("DOMContentLoaded", () => {
  const gearButton = document.getElementById("gearButton");
  const clearDataModal = document.getElementById("clearDataModal");

  let hasHovered = false;

  gearButton.addEventListener("mouseover", () => {
    if (!hasHovered) {
      gearButton.classList.add("spin-on-click");
      hasHovered = true;

      gearButton.addEventListener(
        "animationend",
        () => {
          gearButton.classList.remove("spin-on-click");
        },
        { once: true }
      );
    }
  });

  gearButton.addEventListener("click", () => {
    gearButton.classList.add("spin-on-click");

    gearButton.addEventListener(
      "animationend",
      () => {
        gearButton.classList.remove("spin-on-click");
        clearDataModal.classList.remove("hidden"); 
      },
      { once: true }
    );
  });
});
