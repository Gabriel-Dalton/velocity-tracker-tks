document.addEventListener('DOMContentLoaded', function() {

  function saveSliderToLocalStorage() {
    const slider = document.getElementById("dayScore");
    const value = slider.value;
    localStorage.setItem("dayScore", value);
  }

  function loadSliderFromLocalStorage() {
    const slider = document.getElementById("dayScore");
    const savedValue = localStorage.getItem("dayScore");
    
    if (savedValue) {
      slider.value = savedValue;
      updateSliderText(savedValue);
    } else {
      slider.value = 5;
      updateSliderText(5);
    }
  }

  function updateSliderText(value) {
    const scoreDisplay = document.getElementById("dayScoreValue");
    scoreDisplay.textContent = value;
  }

  document.getElementById("dayScore").addEventListener('input', function() {
    const sliderValue = this.value;
    updateSliderText(sliderValue);
    saveSliderToLocalStorage();
  });

  window.addEventListener('load', function() {
    loadSliderFromLocalStorage();
  });

  function clearFormData() {
    localStorage.removeItem("dayScore");
    const slider = document.getElementById("dayScore");
    slider.value = 5; 
    updateSliderText(5); 
  }

  document.getElementById("confirmClear").addEventListener('click', function() {
    clearFormData();
    document.getElementById("clearDataModal").classList.add("hidden"); 
  });

  document.getElementById("closeModal").addEventListener('click', function() {
    document.getElementById("clearDataModal").classList.add("hidden"); 
  });

});
