var Planner = function(name, daysArr){
	this.daysArr = daysArr;
	this.name = name;
};

var Day = function(name, mealsArr){
	this.mealsArr = mealsArr;
	this.name = name;
};

var Meal = function(name){
	this.recipes = [];
	this.name = name;
};

var Recipe = function(name, ingredients, servings){
	this.ingredients = ingredients;
	this.name = name;
	this.servings = servings;
};

var RecipeLibrary = function(name){
	this.name = name;
	this.recipes = [];
};

var Ingredient = function(name, quantity, unit){
	this.name = name;
	this.quantity = quantity;
	this.unit = unit;
};

var IngredientLibrary = function(name){
	this.name = name;
	this.ingredients = [];
};


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


// Ingredients & Recipes
var bacon = new Ingredient('bacon', 8, 'oz');
var onion = new Ingredient('onion',1,'whole');
var liver = new Ingredient('liver',1,'lb');
var salt = new Ingredient('salt',1/4,'tsp');
var lard = new Ingredient('lard',1/2,'cup');
var baconLiverPate = new Recipe('Bacon & Liver Pate', [bacon, onion, liver, salt, lard] , 8);

var almonds = new Ingredient('almonds',8, 'oz');
var coconutFlour = new Ingredient('coconut flour', 1, 'cup');
var driedCranberries = new Ingredient('dried cranberries', 1, 'cup');
var sugar = new Ingredient('sugar', 1, 'cup');
var eggs = new Ingredient('eggs', 1, 'whole');
var almondButterBars = new Recipe('Almond Butter Bars', [almonds, coconutFlour,driedCranberries,sugar,eggs], 8);

var bacon2 = new Ingredient('bacon', 2, 'oz');
var avocado = new Ingredient('avocado', 1, 'whole');
var eggs2 = new Ingredient('eggs', 2, 'whole');
var salt2 = new Ingredient('salt',1/4,'tsp');
var baconEggsAvo = new Recipe('Bacon & Eggs & Avocado', [bacon2, avocado, eggs2, salt2], 1);

var chickenBreast = new Ingredient('chicken breast', 1/5, 'lb');
var onion2 = new Ingredient('onion', 2 , 'whole');
var bacon3 = new Ingredient('bacon', 4, 'oz');
var tortillaChips = new Ingredient('tortilla chips', 8, 'oz');
var chickenTortillaSoup = new Recipe('Chicken Tortilla Soup', [chickenBreast,onion2,bacon3,tortillaChips], 6);

//Meals
var breakfast = new Meal('Breakfast', [baconEggsAvo, almondButterBars]);
var lunch = new Meal('Lunch', [chickenTortillaSoup, baconLiverPate]);
//Days
var monday = new Day('Monday',[breakfast, lunch]);
var tuesday = new Day('Tuesday', [breakfast, lunch]);
//Planner
var planner = new Planner('my Meal Planner',[monday, tuesday]);
//Recipe Library
var library = new RecipeLibrary('my Recipe Library', [baconLiverPate, almondButterBars,baconEggsAvo, chickenTortillaSoup]);


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
		console.log(thisMealPlan);
	});
});










