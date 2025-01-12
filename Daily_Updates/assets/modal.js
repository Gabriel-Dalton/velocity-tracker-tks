function showClearModal() {
    document.getElementById("clearModal").classList.remove("hidden");
}

function hideClearModal() {
    document.getElementById("clearModal").classList.add("hidden");
}

document.getElementById("gearButton").addEventListener("click", showClearModal);
document.getElementById("cancelClear").addEventListener("click", hideClearModal);
document.getElementById("confirmClear").addEventListener("click", () => {
    clearFormData();
    hideClearModal();
});
