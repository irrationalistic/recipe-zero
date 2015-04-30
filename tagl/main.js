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

/////////
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
	console.log(this.el);
	console.log(this.el.find('.meal-item-button'));
	this.el.find('.meal-item-button').on('click', function(){
		console.log("hello");
	});
	$('.meal-item-list').append(this.el);
};
////////



var Ingredient = function(name, quantity, unit){
	this.name = name;
	this.quantity = quantity;
	this.unit = unit;
	this.render();
	this.toMyLibrary();
};
Ingredient.prototype.render = function(){
	this.el = $('#ingredient-temp')
		.clone()
		.attr('id', null);
	this.el.find('.ingredient-name').text(this.name);
	this.el.find('.ingredient-quantity').text(this.quantity);
	this.el.find('.ingredient-unit').text(this.unit);
};
Ingredient.prototype.toMyLibrary = function(){
	myIngredientLibrary.ingredients.push(this);
};

var IngredientLibrary = function(name){
	this.name = name;
	this.ingredients = [];
};

var Recipe = function(){
	this.ingredients = [];
	this.ingredientEls = [];
	this.name = '';
	this.servings = 0;
};
Recipe.prototype.render = function(){
	this.el = $('#recipe-item-temp')
		.clone()
		.attr('id',null);
	this.el.find('.recipe-title').text(this.name);
};
Recipe.prototype.addIngredient = function(name, quantity, unit){
	var newIngredient = new Ingredient(name, quantity, unit);
	this.ingredients.push(newIngredient);
	this.ingredientEls.push(newIngredient.el);
};

var RecipeLibrary = function(name){
	this.name = name;
	this.recipes = [];
	this.recipeEls = [];
};
RecipeLibrary.prototype.addRecipe = function(recipeObj){
	recipeObj.render();
	this.recipes.push(recipeObj);
	this.recipeEls.push(recipeObj.el);
};



//Library Instances

var myIngredientLibrary = new IngredientLibrary('my Ingredients');
var myRecipeLibrary = new RecipeLibrary('my Recipes');





// // Ingredients & Recipes

var baconLiverPate = new Recipe();
var bacon = new Ingredient('bacon', 8, 'oz');
var onion = new Ingredient('onion',1,'whole');
var liver = new Ingredient('liver',1,'lb');
var salt = new Ingredient('salt',1/4,'tsp');
var lard = new Ingredient('lard',1/2,'cup');


var almondButterBars = new Recipe();
var almonds = new Ingredient('almonds',8, 'oz');
var coconutFlour = new Ingredient('coconut flour', 1, 'cup');
var driedCranberries = new Ingredient('dried cranberries', 1, 'cup');
var sugar = new Ingredient('sugar', 1, 'cup');
var eggs = new Ingredient('eggs', 1, 'whole');














