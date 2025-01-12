document.addEventListener("DOMContentLoaded", () => {
    const gearButton = document.getElementById("gearButton");
  
    gearButton.addEventListener("click", () => {
      gearButton.classList.add("spin-on-click");
  
      gearButton.addEventListener(
        "animationend",
        () => {
          gearButton.classList.remove("spin-on-click");
        },
        { once: true }
      );
    });
  });
  