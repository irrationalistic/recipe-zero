//Helper functions
var arrayOfDays = function(number, startingDay){
	var plannerArray = [];
	var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var startingIndex = week.indexOf(startingDay);
	for (var i = 0 ; i < number ; i++) {
		plannerArray.push(week[(i + startingIndex)%7]);
	}
	return plannerArray;
};

//helper function to extract elements from an array of objects
var extractElements = function(objArr){
	var tempArray = [];
	for (var i = 0;i<objArr.length;i++){	
		tempArray.push(objArr[i].el);
	}
	return tempArray;
};

var Planner = function(name, daysArr){
	this.daysArr = daysArr;
	this.name = name;
	this.render();
};
Planner.prototype.render = function(){
	this.el = $('#meal-planner')
		.clone()
		.attr('id',null);
	this.el.find('.meal-plan-name').text(this.name);
	$('body').append(this.el);
};

var Day = function(name, mealsArr){
	this.mealsArr = mealsArr;
	this.name = name;
	this.render();
};
Day.prototype.render = function(){
	this.el = $('#calendar-day-temp')
		.clone()
		.attr('id', null);
	this.el.find('.calendar-day-name').text(this.name);
	$('.planner-content').append(this.el);
};

var Meal = function(name){
	this.recipes = [];
	this.name = name;
	this.render();
};
Meal.prototype.render = function(){
	this.el = $('#meal-item-temp')
		.clone()
		.attr('id', null);
	this.el.find('.meal-title').text(this.name);
	$('.meal-item-list').append(this.el);
};

var Recipe = function(){
	this.ingredients = [];
	this.name = '';
	this.servings = 0;
	this.render();
};
Recipe.prototype.render = function(){
	this.el = $('#recipe-item-temp')
		.clone()
		.attr('id', null);
	console.log(this.name);
	this.el.find('.recipe-title').text(this.name);
	this.ingredientEls = extractElements(this.ingredients);
};

// Recipe.prototype.renderListEls = function(){
// 	this.listEls = extractElements(this.ingredients);
// };

var RecipeLibrary = function(name){
	this.name = name;
	this.recipes = [];
	this.render();
};
RecipeLibrary.prototype.render = function(){
	this.el = $('#recipe-library')
		.clone()
		.attr('id',null);
	console.log(this.el);
	console.log(this.el.find('.recipe-library-ul'));
	$('.ingredient-list-ul').append(extractElements(this.recipes));
	console.log(extractElements(this.recipes));
	
};

var Ingredient = function(name, quantity, unit){
	this.name = name;
	this.quantity = quantity;
	this.unit = unit;
	this.render();
};
Ingredient.prototype.render = function(){
	this.el = $('#ingredient-temp')
		.clone()
		.attr('id', null);
	this.el.find('.ingredient-name').text(this.name);
	this.el.find('.ingredient-quantity').text(this.quantity);
	this.el.find('.ingredient-unit').text(this.unit);
};

var IngredientLibrary = function(name){
	this.name = name;
	this.ingredients = [];
};

//Library Instances

var myIngredientLibrary = new IngredientLibrary('my Ingredients');
var myRecipeLibrary = new RecipeLibrary('my Recipes');

// // Ingredients & Recipes
var bacon = new Ingredient('bacon', 8, 'oz');
var onion = new Ingredient('onion',1,'whole');
var liver = new Ingredient('liver',1,'lb');
var salt = new Ingredient('salt',1/4,'tsp');
var lard = new Ingredient('lard',1/2,'cup');
var baconLiverPate = new Recipe('Bacon & Liver Pate');

// var almonds = new Ingredient('almonds',8, 'oz');
// var coconutFlour = new Ingredient('coconut flour', 1, 'cup');
// var driedCranberries = new Ingredient('dried cranberries', 1, 'cup');
// var sugar = new Ingredient('sugar', 1, 'cup');
// var eggs = new Ingredient('eggs', 1, 'whole');
// var almondButterBars = new Recipe('Almond Butter Bars', [almonds, coconutFlour,driedCranberries,sugar,eggs], 8);

// var bacon2 = new Ingredient('bacon', 2, 'oz');
// var avocado = new Ingredient('avocado', 1, 'whole');
// var eggs2 = new Ingredient('eggs', 2, 'whole');
// var salt2 = new Ingredient('salt',1/4,'tsp');
// var baconEggsAvo = new Recipe('Bacon & Eggs & Avocado', [bacon2, avocado, eggs2, salt2], 1);

// var chickenBreast = new Ingredient('chicken breast', 1/5, 'lb');
// var onion2 = new Ingredient('onion', 2 , 'whole');
// var bacon3 = new Ingredient('bacon', 4, 'oz');
// var tortillaChips = new Ingredient('tortilla chips', 8, 'oz');
// var chickenTortillaSoup = new Recipe('Chicken Tortilla Soup', [chickenBreast,onion2,bacon3,tortillaChips], 6);

// //Meals
// var breakfast = new Meal('Breakfast', [baconEggsAvo, almondButterBars]);
// var lunch = new Meal('Lunch', [chickenTortillaSoup, baconLiverPate]);
// //Days
// var monday = new Day('Monday',[breakfast, lunch]);
// var tuesday = new Day('Tuesday', [breakfast, lunch]);
// //Planner
// var planner = new Planner('my Meal Planner',[monday, tuesday]);
// //Recipe Library
// var library = new RecipeLibrary('my Recipe Library', [baconLiverPate, almondButterBars,baconEggsAvo, chickenTortillaSoup]);


$(document).on('ready', function() {
	$('.new-plan').on('submit', function(e){
		e.preventDefault();
		//Gets Meal Plan Name
		var mealPlanName = $('#mean-plan-name').val();
		//Gets Meal Values
		var selectedMeals = [];
		$('input:checkbox[name="check[]"]').each(function() {
		    if (this.checked) {
		        selectedMeals.push(this.value);
		    }
		});
		//Gets Number of Days
		var numberDays = $('#new-plan-number-days').val();
		//Gets Starting Day
		var startingDay = $('#new-plan-weekday').val();
		//Creates "array of days" from Number of Days & Starting Day
		var daysArray = arrayOfDays(numberDays,startingDay);
		//Create new Meal for each value in selectedMeals & push to an array of Meal Objects
		var mealObjects = _.map(selectedMeals, function(i){
			return new Meal(i);
		});
		//Create new Day for each day in daysArray
		var dayObjects = _.map(daysArray, function(i){
			return new Day(i, mealObjects);
		});
		//Create new Meal Plan
		var thisMealPlan = new Planner(mealPlanName, dayObjects);
	});

	//Enter New Recipe Button//
	$('.enter-new-recipe').on('click', function(){
		var thisRecipe = new Recipe();
	
		//Enter Recipe Name//
		//REFACTOR//
		$('.recipe-name-form').on('submit', function(e){
			e.preventDefault();
			$this = $(this);
			var recipeName = $this.find('#recipe-name-input').val();
			if (recipeName.length !== 0){
				$this.closest('.modal-header').find('.recipe-title').text(recipeName);
			}
			$this.find('#recipe-name-input').val('');
			$this.find('#recipe-name-input').attr('placeholder','Edit Recipe Name');
			//Sets name value on thisRecipe obj equal to the input
			thisRecipe.name = recipeName;
		});

		//Enter Recipe Servings//
		//REFACTOR//
		$('.recipe-servings-form').on('submit', function(e){
			e.preventDefault();
			$this = $(this);
			var recipeServings = $this.find('#recipe-servings-input').val();
			if (recipeServings !== 0){
				$this.closest('.modal-header').find('.recipe-servings').text(recipeServings);
			}
			$this.find('#recipe-servings-input').val('');
			$this.find('#recipe-servings-input').attr('placeholder','Edit Servings');
			thisRecipe.servings = recipeServings;
		});

		//Enter Recipe Ingredients//
		//REFACTOR//
		$('.enter-ingredient-form').on('submit', function(e){
			e.preventDefault();
			$this = $(this);
			var name = $this.find('#ingredient-name').val();
			var quantity = $this.find('#ingredient-quantity').val();
			var unit = $this.find('#ingredient-unit').val();
			var thisIngredient = new Ingredient(name, quantity, unit);
			thisRecipe.ingredients.push(thisIngredient);
			myIngredientLibrary.ingredients.push(thisIngredient);
			$('.ingredient-list-ul').append(thisRecipe.listEls);
			//Render recipe to update ingredient ELS
			thisRecipe.render();
			$('.ingredient-list-ul').append(thisRecipe.ingredientEls);
			console.log(thisRecipe);
		});

		$('.enter-recipe-button').on('click', function(){
			myRecipeLibrary.recipes.push(thisRecipe);
			thisRecipe.render();
			myRecipeLibrary.render();
			
			alert(thisRecipe.name + 'has been added to ' + myRecipeLibrary.name);
			console.log(thisRecipe.el);
			console.log(thisRecipe.name);
		});

	});

	

});










