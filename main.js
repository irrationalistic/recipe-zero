//helper function to extract elements from an array of objects
var extractElements = function(objArr){
	var tempArray = [];
	for (var i = 0;i<objArr.length;i++){	
		tempArray.push(objArr[i].el);
	}
	return tempArray;
};


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
	$('.ingredient-list').append(this.el);
};

var bacon = new Ingredient('bacon', 8, 'oz');
var onion = new Ingredient('onion',1,'whole');
var sage = new Ingredient('sage',12,'leaves');
var rosemary = new Ingredient('rosemary',1,'sprigs');
var thyme = new Ingredient('thyme',5,'sprigs');
var liver = new Ingredient('liver',1,'lb');
var cognac = new Ingredient('cognac',1/2,'cups');
var salt = new Ingredient('salt',1/4,'tsp');
var lard = new Ingredient('lard',1/2,'cup');


//New Recipe Ingredients Library to house ingredients for new recipe
var newRecipeIngredients = [];


//Recipe Class
var Recipe = function(title, ingredientsArr){ 
	this.title = title;
	this.ingredientsArr=ingredientsArr;
	this.render();
};
Recipe.prototype.render = function() {
	this.el = $('#recipe-item-temp')
		.clone()
		.attr('id', null);
	this.el.find('.recipe-title').text(this.title);
	return this.el;
};
var baconLiverPate= new Recipe('Bacon & Liver Pate', [bacon, onion,sage,rosemary,thyme,liver,cognac,salt,lard]);

//Recipe Library
var RecipeLibrary = function(name) {
	this.name = name;
	this.recipes = [baconLiverPate];
	this.render();
};
RecipeLibrary.prototype.render = function() {
	this.el = $('#recipe-library')
		.clone()
		.attr('id', null);
	this.el.append(extractElements(this.recipes));
	$('body').append(this.el);
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
		console.log(thisMealObj);
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
  		console.log(this);
  		$this = $(this);
  		var recipeTitle = $this.closest('.modal-content').find('.recipe-title').text();
  		if(newRecipeIngredients.length > 0 && recipeTitle.length > 0){
  			mainLibrary.recipes.push(new Recipe(recipeTitle, newRecipeIngredients));
  		}
  		
  		///reset everything
		$this.closest('.modal-content').find('.recipe-title').text('');
		$this.closest('.modal-content').find('.ingredient-list').empty();
		newRecipeIngredients = [];
  	});
  

});