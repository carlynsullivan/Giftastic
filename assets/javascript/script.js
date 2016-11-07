//wait until HTML doc had loaded to carry out javascript
$(document).ready(function() {

//desserts array
var desserts = ["key lime pie", "ice cream", "cookies", "flan", "tres leches", "candy"];
//function to create buttons dynamically using desserts array
function renderButtons(){ 

	// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
	$("#buttonHolder").empty();

	// Loops through the array of movies
	for (var i = 0; i < desserts.length; i++) {

		// Then dynamicaly generates buttons for each movie in the array
		var newButton = $("<button>");
		//give each button class of dessertButton
		newButton.attr("class", "dessertButton");
		//each button is labeled with its desserts array index
		newButton.html(desserts[i]);
		//give buttons data-name of their desserts array index
		newButton.data("name", desserts[i]);
		//add new buttons to div with id=buttonHolder
		$("#buttonHolder").append(newButton);
		//on click event for buttons with class .dessertButton
		$(".dessertButton").on("click", function() {
			//grabbing name data from the clicked dessert button
		 	var name = $(this).data("name");
		 	//console.log the name var data
		 	console.log(name);

			
			//Giphy API url plus specific queries requested, including dessert name from array
			var urlQuery = "http://api.giphy.com/v1/gifs/search?q=" + name + "&limit=10&rating=g&api_key=dc6zaTOxFJmzC";

			//created variable for API data request to be made
			var request = {
				//url for reqest will === above var of urlQuery
				url: urlQuery,
				//request method === GET
				method: "GET"
			};

			//request data from the Giphy API
			$.ajax(request).done(function(response) {
				//console.log data response, objects from API
				console.log(response);
				//for loop to go through array of desserts
				for (i=0; i < response.data.length; i++) {
					//data from API for still images of desserts
					var stillImage = response.data[i].images.fixed_height_still.url;
					//data from API for picture rating
					var rating = response.data[i].rating;
					//dynamically created button including rating and still image of gif
					var gif = $("<button><p> Rating: " + rating.toUpperCase() + "</p><img src='" + stillImage +"'></button>");
					//storing API still image as a data attribute within created gif button
					gif.data('stillImage', response.data[i].images.fixed_height_still.url);
					//storing API animated GIF as a data attribute within created gif button
					gif.data('animated', response.data[i].images.fixed_height.url);
					//give each created button class of gifButton to target later
					gif.addClass("gifButton");
					// add each gif button to the gifHolder div
					$("#gifHolder").prepend(gif);		
				//closing for loop inside ajax call
				};
				
					//onclick event for gifs, to switch between still image and animated
					$(".gifButton").on("click", function() {
						//variable to hold data of animated gif
						var animatedImage = $(this).data('animated');
						//variable to hold data of still image
						var stillImage = $(this).data('stillImage');
						//if image currently has src of stillImage data...
						if ($(this).find("img").attr("src") == stillImage) {
							//...then switch to animation
							$(this).find("img").attr("src", animatedImage);
						//else (if image source is currently animated)...	
						} else {
							//...then switch to still image
							$(this).find("img").attr("src", stillImage);
						};
					//closing .gifButton .on("click")
					});
			//closing ajax call
			});
		//closing .dessertButton .on("click")
		});
	//closing for loop for desserts array
	};
//closing renderButtons()
};



	//on click for submit button linked to user input button creation
	$("#submitButton").on("click", function() {
		//variable to hold value of user input field
		var userDessert = $(".userDessert").val();
		//console.log dessert that user typed
		console.log(userDessert);
		//add user input value to desserts array
		desserts.push(userDessert);
		//call renderButtons function after addition of user input
		renderButtons();
		
		//userDessert.html(""); .reset() .hide() .clear() <-- none of these allow clearing input after clicking submit, while still keeping the input value stored in array to then create a button. !!!

		//ensures that user can either click #submitButton OR press enter
		return false;
	});

	//call renderButtons()
	renderButtons();
//closes document.ready function
});
