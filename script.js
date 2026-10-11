const menuButton = document.getElementById("menuButton");
const dropdownMenu = document.getElementById("dropdownMenu");
menuButton.addEventListener("click", function () {
if (dropdownMenu.style.display === "block") {
dropdownMenu.style.display = "none";
} else {
dropdownMenu.style.display = "block";
}
});
document.addEventListener("click", function (event) {
if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
dropdownMenu.style.display = "none";
}
});
