// Toggle mobile menu
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Fetch food category button
const loadBtnCategory = async () => {
  try {
    const uri = `https://www.themealdb.com/api/json/v1/1/list.php?c=list`;
    const response = await fetch(uri);
    const data = await response.json();
    createCategoryBtn(data.meals);
  } catch (error) {
    console.log(error);
  }
};

// Create category buttons
const createCategoryBtn = (foods) => {
  const btnContainer = document.querySelector("#button-container");
  foods.forEach((item) => {
    // Only create button if the category is not "Pork"
    if (item.strCategory !== "Pork") {
      const createBtn = `
        <button onclick="loadBtnCategoryFood('${item.strCategory}')" class="btn border-b-4 rounded-xl text-white">${item.strCategory}</button>
      `;
      btnContainer.innerHTML += createBtn;
    }
  });
};

// load btn category foord 
const loadBtnCategoryFood = async (btnCategoryfood) => {
  try {
    const uri = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${btnCategoryfood}`;
    const response = await fetch(uri);
    const data = await response.json();
    console.log(data);
    
    createCategoryFoodCard(data.meals);
  } catch (error) {
    console.log(error);
  }
};



// create category foodCard 
const createCategoryFoodCard = (meals) => {
  const foodContainer = document.querySelector("#food-card-container");
  foodContainer.innerHTML = "";
  meals.forEach((meal) => {
    // console.log(item.strCategory);
    if (meal.strCategory !== "Pork") {
      const foodCard = `
      <div class="p-4 bg-[#191919] rounded-lg">
            <div class="flex justify-center items-center p-8">
              <img class="w-full" src="${meal.strMealThumb}" alt="" />
            </div>
            <div class="space-y-2">
              <h1 class="text-white font-bold text-xl">${meal.strMeal}</h1>
              <p class="text-white">
              lorem10
              </p>
              <div class="flex justify-between items-center">
                <h3 class="text-white font-bold text-xl">$2.50</h3>
                <button class="rounded-full border-2 p-1">
                  <i class="fa-solid fa-cart-shopping text-white p-1"></i>
                </button>
              </div>
              <div>
                <button class="btn bg-white p-2 rounded-lg text-xl font-bold">Details</button>
              </div>
            </div>
          </div>
        </div>
      `;
      foodContainer.innerHTML += foodCard;
    }
  });
};






// Load all foodd data 
const loadAllFoods = async (status) => {
  try {
    const uri = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    const response = await fetch(uri);
    const data = await response.json();
    if (status) {
      createFoodCard(data.categories);
    } else {
      createFoodCard(data.categories.slice(0, 6));
    }
  } catch (error) {
    console.log(error);
  }
};

// Create Load food Cards
const createFoodCard = (category) => {
  const foodContainer = document.querySelector("#food-card-container");
  foodContainer.innerHTML = "";
  category.forEach((item) => {
    // console.log(item.strCategory);
    if (item.strCategory !== "Pork") {
      const foodCard = `
      <div class="p-4 bg-[#191919] rounded-lg">
            <div class="flex justify-center items-center p-8">
              <img src="${item.strCategoryThumb}" alt="" />
            </div>
            <div class="space-y-2">
              <h1 class="text-white font-bold text-xl">${item.strCategory}</h1>
              <p class="text-white">
              lorem10
              </p>
              <div class="flex justify-between items-center">
                <h3 class="text-white font-bold text-xl">$2.50</h3>
                <button class="rounded-full border-2 p-1">
                  <i class="fa-solid fa-cart-shopping text-white p-1"></i>
                </button>
              </div>
              <div>
                <button class="btn bg-white p-2 rounded-lg text-xl font-bold">Details</button>
              </div>
            </div>
          </div>
        </div>
      `;
      foodContainer.innerHTML += foodCard;
    }
  });
};

// show all handeler
const showAllHandler = () => {
  loadAllFoods(true);
};

loadAllFoods();
loadBtnCategory();
