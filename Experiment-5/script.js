let dropdown = document.getElementById("filter");
let products = document.querySelectorAll(".product");

dropdown.addEventListener("change", function() {
    let value = dropdown.value;

    products.forEach(function(item) {
        let category = item.getAttribute("data-category");

        if (value === "all" || value === category) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});
