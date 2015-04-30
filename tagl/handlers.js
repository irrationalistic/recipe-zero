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

	var $recipeServingsForm = $('.recipe-servings-form');
	var $recipeNameForm = $('.recipe-name-form');
	var $enterIngredientForm = $('.enter-ingredient-form');
	var $enterRecipeButton = $('.enter-recipe-button');
	var $ingredientListUl = $('.ingredient-list-ul');
	var $enterNewRecipe = $('.enter-new-recipe');
	
	
	// //Enter New Recipe //

	var thisRecipe = {};
	$enterNewRecipe.on('click', function(){
		thisRecipe = new Recipe();
		console.log(thisRecipe);
	});
		//Recipe Name//
		$recipeNameForm.on('submit', function(e){
			$this = $(this);
			e.preventDefault();
			var thisRecipeName = $this.find('#recipe-name-input').val();
			if (thisRecipeName.length !== 0){
				$this.closest('.modal-header').find('.recipe-title').text(thisRecipeName);
			}
			thisRecipe.name = thisRecipeName;
			console.log(thisRecipe);
			$this.find('#recipe-name-input').val('');
		});
		//Recipe Servings//
		$recipeServingsForm.on('submit', function(e){
			$this = $(this);
			e.preventDefault();
			var thisRecipeServings = $this.find('#recipe-servings-input').val();
			if (thisRecipeServings !== 0){
				$this.closest('.modal-header').find('.recipe-servings').text(thisRecipeServings);
			}
			thisRecipe.servings = thisRecipeServings;
			console.log(thisRecipe);
			$this.find('#recipe-servings-input').val('');
		});
		//Recipe Ingredients//
		$enterIngredientForm.on('submit', function(e){
			$this = $(this);
			e.preventDefault();
			//Get form contents
			var thisIngredientName = $this.find('#ingredient-name').val();
			var thisIngredientQuantity = $this.find('#ingredient-quantity').val();
			var thisIngredientUnit = $this.find('#ingredient-unit').val();
			//Makes sure form fields are fille out
			if (thisIngredientName.length !== 0 && thisIngredientQuantity.length !== 0 && thisIngredientUnit.length !== 0) {
				//Create new ingredient and add it to thisRecipe
				thisRecipe.addIngredient(thisIngredientName,thisIngredientQuantity,thisIngredientUnit);
				console.log(thisRecipe);
				//Clear the form
				$this.find('#ingredient-name').val('');
				$this.find('#ingredient-quantity').val('');
				$this.find('#ingredient-unit').val('');
			}
			///RENDER THISRECIPE.INGREDIENTS in ingredient-list-ul
			$('.ingredient-list-ul').append(thisRecipe.ingredientEls);
		});
		///Submit Recipe
		$enterRecipeButton.on('click', function(){
			myRecipeLibrary.addRecipe(thisRecipe);
			$('.ingredient-list-ul').empty();
		});

	///////////

	$('.recipe-library-button').on('click', function(){
		$('.recipe-library-list').empty().append(myRecipeLibrary.recipeEls);
	});

});