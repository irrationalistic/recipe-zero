//Recipe Class
var Recipe = function(name, ingredientsArr){ 
	this.name = name;
	this.ingredientsArr=ingredientsArr;
	this.render();
};
Recipe.prototype.render = function() {
	this.elCalendar = $('#recipe-item-temp')
		.clone()
		.attr('id', null);
	this.elCalendar.find('.recipe-title').text(this.name);
	return this.elCalendar;
};
var testRecipe = new Recipe('chicken', ['chicken','salt']);



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
// var testMeal = new Meal('Breakfast');

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
//helper function to extract elements from an array of objects
var extractElements = function(objArr){
	var tempArray = [];
	for (var i = 0;i<objArr.length;i++){	
		tempArray.push(objArr[i].el);
	}
	return tempArray;
};
// var calendarDayTest = new CalendarDay('Sunday',mealObjArrFunc(['Breakfast','Lunch','Dinner', 'Dessert']));
	
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
  
  
});