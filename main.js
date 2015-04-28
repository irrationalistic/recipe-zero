//helper function to extract elements from an array of objects
var extractElements = function(objArr){
	var tempArray = [];
	for (var i = 0;i<objArr.length;i++){	
		tempArray.push(objArr[i].el);
	}
	return tempArray;
};

//compile helper function 

var compile = function(array){
	var flatArray =  _.flatten(array);
	flatArray.map(function(i){
		console.log(flatArray[i]);
	});

	return flatArray;
};

var recipeDetailsModal = $('#recipe-details-modal');
var recipeLibraryModal =  $('#recipeLibrary');
var ingredientList = $('.ingredient-list');

///Ingredient Class
var Ingredient = function(name, quantity, unit){
	this.name = name;
	this.quantity = quantity;
	this.unit = unit;
	this.render();

};
Ingredient.prototype.render = function(){
	this.el = $('#ingredient-temp')
		.clone()
		.attr('id',null);
	this.el.find('.ingredient-name').text(this.name);
	this.el.find('.ingredient-quantity').text(this.quantity);
	this.el.find('.ingredient-unit').text(this.unit);
	ingredientList.append(this.el);
};
//Helper array to change objects to "stringifyable" objects for L.S.
Ingredient.prototype.safeObj = function() {
	// this.ingredientsArr = this.ingredientsArr.safeObj();
	return {
		name: this.name,
		quantity: this.quantity,
		unit: this.unit
	};
};


//New Recipe Ingredients Library to house ingredients for new recipe
var newRecipeIngredients = [];

//Recipe Class
var Recipe = function(title, ingredientsArr, servings){ 
	this.title = title;
	this.ingredientsArr=ingredientsArr;
	this.servings = servings;
	this.render();
};
Recipe.prototype.render = function() {
	this.el = $('#recipe-item-temp')
		.clone()
		.attr('id', null);
	this.el.find('.recipe-title').text(this.title);
	var thisRecipe = this;
	// Event hander for adding a recipe to a meal from the Recipe Library
	this.el.on('click', function() {
		var mealClicked = thisRecipe.thisMeal.el;
		var recipeClicked = thisRecipe.el;
		recipeLibraryModal.modal('hide');
		mainCompile.ingredientsArr.push(thisRecipe.ingredientsArr);
		console.log(mainCompile.ingredientsArr);
		//Event handler for when a receipe has already been  added to a meal
		mealClicked.find('.recipe-list').append(
			recipeClicked.clone()
				.on('click', function() {
					recipeDetailsModal.modal('show');
					recipeDetailsModal.find('.recipe-details-servings').text(thisRecipe.servings);
					recipeDetailsModal.find('.recipe-details-title').text(thisRecipe.title);
					//this UL is cleared upon close in Doc Ready
					recipeDetailsModal.find('.recipe-details-ingredients').append(extractElements(thisRecipe.ingredientsArr));
				})
			);
	});
	return this.el;
};
//Helper array to change objects to "stringifyable" objects for L.S.
Recipe.prototype.safeObj = function() {
	
	var safeObjIngredients = [];

	for (var i = 0 ; i < this.ingredientsArr.length; i++) {
		safeObjIngredients.push(this.ingredientsArr[i].safeObj());
	}
	return {
		title: this.title,
		ingredientsArr: this.ingredientsArr,
		servings: this.servings
	};
};


// Test Variables 

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


//Recipe Library
var RecipeLibrary = function(name) {
	this.name = name;
	this.recipes = [baconLiverPate, almondButterBars, baconEggsAvo,chickenTortillaSoup];
	this.render();
};
RecipeLibrary.prototype.render = function() {
	this.el = $('#recipe-library')
		.clone()
		.attr('id', null);
	//Attach a reference to the meal clicked within each recipe
	for (var i = 0 ; i < this.recipes.length ; i++) {
		this.recipes[i].thisMeal = this.thisMeal;
	}

	this.el.append(extractElements(this.recipes));
	//Refactor
	$('.recipe-library-modal-body').append(this.el);
	
};
var mainLibrary = new RecipeLibrary('My Recipes');

// Meal Item Class
var Meal = function(thisMeal) {
	this.thisMeal = thisMeal;
	this.render();
};
Meal.prototype.render = function(){
	this.el = $('#meal-item-temp')
		.clone()
		.attr('id', null);
	this.el.find('.meal-title').text(this.thisMeal);
	var thisMealObj = this;
	this.el.find('.meal-item-button').on('click',function(){
		mainLibrary.thisMeal = thisMealObj;
		mainLibrary.render();
	});
	return this.el;
};
var testMeal = new Meal('Breakfast');

//helper function that takes in a mealSchedule Array and outputs 
//and array of new meal objects
var mealObjArrFunc = function(mealScheduleArr){
	var tempArray = [];
	for (var i = 0; i < mealScheduleArr.length; i++){
		tempArray.push(new Meal(mealScheduleArr[i]));
	}
	return tempArray;
};


//Calendar Day Class
var CalendarDay = function(dayOfWeek, mealObjArr){
	this.dayOfWeek = dayOfWeek;
	this.mealObjArr = mealObjArr;
	this.render();
};
CalendarDay.prototype.render = function(){
	this.el = $('#calendar-day-temp')
		.clone()
		.attr('id', null);
	this.el.find('.calendar-day-title').text(this.dayOfWeek);
	this.el.find('.meal-item-list').append(extractElements(this.mealObjArr));
	return this.el;
};
	
//Meal Planner Class
var Planner = function(daysArr,mealsArr){
	this.daysArr = daysArr;
	this.mealsArr = mealsArr;
	this.render();
};
Planner.prototype.render = function(){
	this.el = $('#meal-planner')
		.clone()
		.attr('id',null);
	tempArr = [];
	for (var i = 0; i < this.daysArr.length; i++){
		tempArr.push(new CalendarDay(this.daysArr[i],mealObjArrFunc(this.mealsArr)));
	}
	this.el.find('.planner-content').append(extractElements(tempArr));

	$('body').append(this.el);
};

var testPlanner = new Planner(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],['Breakfast','Lunch','Dinner']);

//Complile Library

var CompileLibrary = function(ingredientsArr) {
	this.ingredientsArr = ingredientsArr;
};


var mainCompile = new CompileLibrary([[bacon, onion, liver, salt, lard],[almonds, coconutFlour,driedCranberries,sugar,eggs],[bacon2, avocado, eggs2, salt2],[chickenBreast,onion2,bacon3,tortillaChips]]);



//Doc Ready
$(document).on('ready', function() {

	//Event Hander for Entering Recipe Name
	$('.recipe-name-form').on('submit',function(){
		$this = $(this);
		var recipeName = $this.find('#recipe-name-input').val();
		if (recipeName.length !== 0){
			$this.closest('.modal-header').find('.recipe-title').text(recipeName);
		}
		$this.find('#recipe-name-input').val('');
		$this.find('#recipe-name-input').attr('placeholder','Edit Recipe Name');
	});

	//Event Handler for new Ingredients on Recipe Form
	$('.enter-ingredient-form').on('submit', function() {
		$this = $(this);
		var name = $this.find('#ingredient-name').val();
		var quantity = $this.find('#ingredient-quantity').val();
		var unit = $this.find('#ingredient-unit').val();
		$this.find('#ingredient-name').val('');
		$this.find('#ingredient-quantity').val('');
		$this.find('#ingredient-unit').val('');
		var newIngredient = new Ingredient(name, quantity, unit);
		newRecipeIngredients.push(newIngredient);
	});
  
  	//Event Handler for Submitting New Recipe
  	$('.enter-recipe-button').on('click', function(){
  		$this = $(this);
  		var recipeTitle = $this.closest('.modal-content').find('.recipe-title').text();
  		if(newRecipeIngredients.length > 0 && recipeTitle.length > 0){
  			var newRecipe = new Recipe(recipeTitle, newRecipeIngredients);	
  			mainLibrary.recipes.push(newRecipe);

  			
  			//save new recipe to local storage
  			// localStorage.recipes = JSON.stringify(mainLibrary, function(key,value){
  			// 	if(key === "el") {
  			// 		return undefined;
  			// 	}
  			// 	return value;
  			// });
  		}
  		
  		///reset everything
		$this.closest('.modal-content').find('.recipe-title').text('');
		$this.closest('.modal-content').find('.ingredient-list').empty();
		newRecipeIngredients = [];
  	});

  	//Event Handler for clearing Recipe Details
  	var recipeDetailsIngredients = $('.recipe-details-ingredients');
  	$('.close-recipe-details').on('click', function(){
  		recipeDetailsIngredients.empty();
  	});

  	//Event hander for clearing ingreients on Add Recipe form
  	$('.add-recipe-button').on('click', function(){
  	  	$('.ingredient-list').empty();
  	});

});