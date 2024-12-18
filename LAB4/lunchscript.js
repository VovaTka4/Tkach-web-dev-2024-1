const order = {
    soup: null,
    main: null,
    drink: null,
    desert: null,
    salad: null
};

function updateDisplay() {
    const noSelection = document.getElementById('nothing');
    const totalP = document.getElementById('totalPrice');
    const selectedSoup = document.getElementById('soup');
    const selectedMain = document.getElementById('main');
    const selectedDrink = document.getElementById('drink');
    const selectedSalad = document.getElementById('salad');
    const selectedDesert = document.getElementById('desert');

    if (order.soup || order.drink || order.main || 
    order.desert || order.salad) {
        noSelection.style.display = 'none';
        selectedSoup.style.display = 'block';
        selectedSoup.querySelector('span').textContent = order.soup ? 
            order.soup.name + " " + order.soup.price + "₽" : 'Блюдо не выбрано';
        selectedMain.style.display = 'block';
        selectedMain.querySelector('span').textContent = order.main ? 
            order.main.name + " " + order.main.price + "₽" : 'Блюдо не выбрано';
        selectedDrink.style.display = 'block';
        selectedDrink.querySelector('span').textContent = 
            order.drink ? order.drink.name + " " + 
            order.drink.price + "₽" : 'Напиток не выбран';
        selectedSalad.querySelector('span').textContent = 
            order.salad ? order.salad.name + " " 
            + order.salad.price + "₽" : 'Блюдо не выбрано';
        selectedSalad.style.display = 'block';
        selectedDesert.querySelector('span').textContent = order.desert ?
            order.desert.name + " "
            + order.desert.price + "₽" : 'Блюдо не выбран';
        selectedDesert.style.display = 'block';
        totalP.style.display = 'block';
        let total = 0;
        total += order.soup ? order.soup.price : 0;
        total += order.main ? order.main.price : 0;
        total += order.drink ? order.drink.price : 0;
        total += order.salad ? order.salad.price : 0;
        total += order.desert ? order.desert.price : 0;
        totalP.querySelector('span').textContent = `${total}₽`;
    } else {
        noSelection.style.display = 'block';
        totalP.style.display = 'none';
        selectedSoup.style.display = 'none';
        selectedMain.style.display = 'none';
        selectedDrink.style.display = 'none';
        selectedDesert.style.display = 'none';
        selectedSalad.style.display = 'none';
    }
}

function addToOrder(keyword) {
    const selectedDish = dishes.find(dish => dish.keyword === keyword);
    
    if (selectedDish.category === 'soup') {
        order.soup = selectedDish;
        document.getElementById('soup-selection').textContent = 
        selectedDish.name;
    } else if (selectedDish.category === 'main') {
        order.main = selectedDish;
        document.getElementById('main-selection').textContent = 
        selectedDish.name;
    } else if (selectedDish.category === 'drink') {
        order.drink = selectedDish;
        document.getElementById('drink-selection').textContent = 
        selectedDish.name;
    } else if (selectedDish.category === 'salad') {
        order.salad = selectedDish;
        document.getElementById('salad-selection').textContent = 
        selectedDish.name;
    } else if (selectedDish.category === 'desert') {
        order.desert = selectedDish;
        document.getElementById('desert-selection').textContent = 
        selectedDish.name;
    }

    updateDisplay();
}

function displayDish() {
    const menuSections = {
        soup: document.querySelector('#soup-section .menu-container'),
        main: document.querySelector('#main-section .menu-container'),
        drink: document.querySelector('#drink-section .menu-container'),
        salad: document.querySelector('#salad-section .menu-container'),
        desert: document.querySelector('#desert-section .menu-container'),
    };

    dishes.sort((a, b) => a.name.localeCompare(b.name));

    dishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.classList.add('dish-card');
        dishCard.setAttribute('data-dish', dish.keyword);

        const img = document.createElement('img');
        img.src = dish.image;
        img.alt = dish.name;
        dishCard.appendChild(img);

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = `${dish.price}₽`;
        dishCard.appendChild(price);

        const name = document.createElement('p');
        name.classList.add('name');
        name.textContent = dish.name;
        dishCard.appendChild(name);

        const weight = document.createElement('p');
        weight.classList.add('weight');
        weight.textContent = dish.count;
        dishCard.appendChild(weight);

        const button = document.createElement('button');
        button.classList.add('add-button');
        button.textContent = 'Добавить';
        button.onclick = () => addToOrder(dish.keyword);
        dishCard.appendChild(button);

        menuSections[dish.category].appendChild(dishCard);
    });
}

document.addEventListener("DOMContentLoaded", displayDish);

document.getElementById('resetB').onclick = function() {
    order.soup = null;
    order.main = null;
    order.drink = null;

    document.querySelectorAll('.dish-card.selected').forEach(card => {
        card.classList.remove('selected'); 
    });

    updateDisplay();
};

document.getElementById('postB').onclick = function(event) {
    const soupForm = document.getElementById('hiddenSoup');
    const mainForm = document.getElementById('hiddenMain');
    const drinkForm = document.getElementById('hiddenDrink');
    const desertForm = document.getElementById('hiddenDesert');
    const saladForm = document.getElementById('hiddenSalad');
    soupForm.value = order.soup ? order.soup.keyword : '';
    mainForm.value = order.main ? order.main.keyword : '';
    drinkForm.value = order.drink ? order.drink.keyword : '';
    desertForm.value = order.desert ? order.desert.keyword : '';
    saladForm.value = order.salad ? order.salad.keyword : '';

    if (!soupForm.value || !mainForm.value || !drinkForm.value) {
        event.preventDefault();
        alert('Выберите все позиции!');
    }
};

document.querySelectorAll('.menu-section').forEach(section => {
    section.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-button')) {
            const selectedCard = event.target.closest('.dish-card'); 
            const menuContainer = selectedCard.parentNode;

            menuContainer.querySelectorAll('.dish-card').forEach(card => {
                card.classList.remove('selected');
            });

            selectedCard.classList.add('selected');
        }
    });
});