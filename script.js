

function sendOrder() {
    const breakfastItems = getCheckedItems("breakfast-form");
    const lunchItems = getCheckedItems("lunch-form");
    const dinnerItems = getCheckedItems("dinner-form");
    const sidesItems = getCheckedItems("sides-form");
    const otherItems = getCheckedItems("other-form");

    const subject = encodeURIComponent("Feed Me!");
    const bodyArray = [];

    if (breakfastItems) bodyArray.push(`Breakfast:\n${breakfastItems}`);
    if (lunchItems) bodyArray.push(`Lunch:\n${lunchItems}`);
    if (dinnerItems) bodyArray.push(`Dinner:\n${dinnerItems}`);
    if (sidesItems) bodyArray.push(`Sides:\n${sidesItems}`);
    if (otherItems) bodyArray.push(`Other:\n${otherItems}`);

    const allIngredients = getAllCheckedIngredients();
    bodyArray.push(`Ingredients:\n${allIngredients}`);

    const body = encodeURIComponent(bodyArray.join("\n\n"));

    const yourEmailAddress = "delphedwin@gmail.com";
    const mailtoLink = `mailto:${yourEmailAddress}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}

function getAllCheckedIngredients() {
    // Get all checked ingredient checkboxes on the page
    const ingredientCheckboxes = document.querySelectorAll('input[name="ingredient"]:checked');
    const ingredients = Array.from(ingredientCheckboxes).map(cb => cb.value);
    // Remove duplicates and join with newlines for email
    return Array.from(new Set(ingredients)).join("\n");
}

function getShoppingList() {
    // Just return all checked ingredients (same as getAllCheckedIngredients)
    return getAllCheckedIngredients();
}

function getCheckedItems(formId) {
    const form = document.getElementById(formId);
    const checkedItems = Array.from(form.elements)
        .filter(item => item.type === "checkbox" && item.checked && item.name !== "ingredient")
        .map(item => {
            if (item.value === "Something from Food.com") {
                return `Here's a link to a recipe on Food.com: `;
            } else if (item.value === "Something Else") {
                return "Could I please have ...";
            } else {
                return item.value;
            }
        });
    return checkedItems.join("\n");
}

function toggleIngredients(checkbox, ingredientsDivId) {
    const ingredientsDiv = document.getElementById(ingredientsDivId);

    if (checkbox.checked) {
        ingredientsDiv.style.display = "block";
    } else {
        ingredientsDiv.style.display = "none";
    }

        // Find the unique ingredients list by id
        const ingredientsList = ingredientsDiv.querySelector(`#${ingredientsDivId}-list`);
    if (!ingredientsList) return;
    Array.from(ingredientsList.querySelectorAll('input[name="ingredient"]')).forEach(ingredientCheckbox => {
        
            ingredientCheckbox.checked = checkbox.checked;
        
    });
}

function getIngredients(...ingredientsDivIds) {
    const ingredientsArray = [];
    ingredientsDivIds.forEach(ingredientsDivId => {
        const ingredientsDiv = document.getElementById(ingredientsDivId);
        Array.from(ingredientsDiv.querySelectorAll('[name="ingredient"]:checked')).forEach(ingredientCheckbox => {
            ingredientsArray.push(ingredientCheckbox.value);
        });
    });
    return Array.from(new Set(ingredientsArray)).concat(['']).join("\n");
}


// Get all checked ingredients for all forms
function getAllCheckedIngredients() {
    const ingredientCheckboxes = document.querySelectorAll('input[name="ingredient"]:checked');
    const ingredients = Array.from(ingredientCheckboxes).map(cb => cb.value);
    // Remove duplicates and join with newlines
    return Array.from(new Set(ingredients)).join("\n");
}

// Populate the ingredients list in the UI
function populateIngredientsList() {
    const ingredientsStr = getAllCheckedIngredients();
    const list = document.getElementById('ingredients-list');
    if (!list) return;
    list.innerHTML = '';
    if (!ingredientsStr) return;
    const ingredients = ingredientsStr.split('\n').filter(Boolean);
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        list.appendChild(li);
    });
}

// Update the ingredients list whenever a checkbox is changed
document.addEventListener('change', function (e) {
    if (e.target && e.target.name === 'ingredient' || e.target.name === 'item') {
        setTimeout(populateIngredientsList, 0);
    }
});

// Populate the ingredients list on page load
window.onload = function () {
    populateIngredientsList();
};
