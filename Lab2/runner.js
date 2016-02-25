function run(){
	if (navigator.geolocation) {

		//gets current position
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;

			//calls api function with coordinates
			api(lat, lon); 
		});
	} else {

		//if we couldn't get the position
		$( "#temp" ).innerHTML = "Geolocation is not supported by this browser.";
	}
}

function api(lat, lon){

	//urls of the api requests
	var url1 = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=44db6a862fba0b067b1930da0d769e98";
	var url2 = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=44db6a862fba0b067b1930da0d769e98";

	//first request, get today
	$.ajax({
		type: 'GET',
		url: url1,
		dataType: 'jsonp',
		success: function(json) {

			//variables
			var temperature = Math.round(((json["main"]["temp"] * 9) / 5) - 459.67);
			var icon = "http://openweathermap.org/img/w/" + json["weather"][0]["icon"] + ".png";
			var wind = Math.round(json["wind"]["speed"] * 2.24);

			//insert information
			$("#temp").html("<strong>" + temperature + "&#8457</strong>");
			$("#desc").html(json["weather"][0]["main"]);
			$("#place").html(json["name"]);
			$("#image").html("<img src=\"" + icon + "\" alt=\"\">");
			$("#details").html("Wind speed: <strong>" + wind + " mph</strong> Humidity: <strong>" + json["main"]["humidity"] + "%</strong>");
		},
		error: function(e) {
			console.log(e.message);
		}
	});

	//get forecast data
	$.ajax({
		type: 'GET',
		url: url2,
		dataType: 'jsonp',
		success: function(json) {
			//first day text
			var day1 = json["list"][4];
			var b2 = "<h1><strong>" + Math.round((((day1["main"]["temp"]) * 9) / 5) - 459.67)
				+ "&#8457</strong></h1><div><img src='http://openweathermap.org/img/w/"
				+ day1["weather"][0]["icon"] + ".png'></div><h3>" + day1["dt_txt"] + "</h3><h2>"
				+ day1["weather"][0]["main"] + "</h2><h3>Wind speed: <strong>" + Math.round(day1["wind"]["speed"] * 2.24)
				+ " mph</strong> Humidity: <strong>" + day1["main"]["humidity"] + "%</strong></h3>";

			//second day text
			var day2 = json["list"][12];
			var b3 = "<h1><strong>" + Math.round((((day2["main"]["temp"]) * 9) / 5) - 459.67)
				+ "&#8457</strong></h1><div><img src='http://openweathermap.org/img/w/"
				+ day2["weather"][0]["icon"] + ".png'></div><h3>" + day2["dt_txt"] + "</h3><h2>"
				+ day2["weather"][0]["main"] + "</h2><h3>Wind speed: <strong>" + Math.round(day2["wind"]["speed"] * 2.24)
				+ " mph</strong> Humidity: <strong>" + day2["main"]["humidity"] + "%</strong></h3>";
			//Third day text
			var day3 = json["list"][20];
			var b4 = "<h1><strong>" + Math.round((((day1["main"]["temp"]) * 9) / 5) - 459.67)
				+ "&#8457</strong></h1><div><img src='http://openweathermap.org/img/w/"
				+ day3["weather"][0]["icon"] + ".png'></div><h3>" + day3["dt_txt"] + "</h3><h2>"
				+ day3["weather"][0]["main"] + "</h2><h3>Wind speed: <strong>" + Math.round(day3["wind"]["speed"] * 2.24)
				+ " mph</strong> Humidity: <strong>" + day3["main"]["humidity"] + "%</strong></h3>";
			//fourth day
			var day4 = json["list"][28];
			var b5 = "<h1><strong>" + Math.round((((day1["main"]["temp"]) * 9) / 5) - 459.67)
				+ "&#8457</strong></h1><div><img src='http://openweathermap.org/img/w/"
				+ day4["weather"][0]["icon"] + ".png'></div><h3>" + day4["dt_txt"] + "</h3><h2>"
				+ day4["weather"][0]["main"] + "</h2><h3>Wind speed: <strong>" + Math.round(day4["wind"]["speed"] * 2.24)
				+ " mph</strong> Humidity: <strong>" + day4["main"]["humidity"] + "%</strong></h3>";
			//fifth day
			var day5 = json["list"][36];
			var b6 = "<h1><strong>" + Math.round((((day1["main"]["temp"]) * 9) / 5) - 459.67)
				+ "&#8457</strong></h1><div><img src='http://openweathermap.org/img/w/"
				+ day5["weather"][0]["icon"] + ".png'></div><h3>" + day5["dt_txt"] + "</h3><h2>"
				+ day5["weather"][0]["main"] + "</h2><h3>Wind speed: <strong>" + Math.round(day5["wind"]["speed"] * 2.24)
				+ " mph</strong> Humidity: <strong>" + day5["main"]["humidity"] + "%</strong></h3>";
			//Create elements and hide them
			$("#b2").html(b2);
			$("#b2").hide();
			$("#b3").html(b3);
			$("#b3").hide();
			$("#b4").html(b4);
			$("#b4").hide();
			$("#b5").html(b5);
			$("#b5").hide();
			$("#b6").html(b6);
			$("#b6").hide();

			//iterator
			var itr = 2;

			//runs every 3 seconds
			window.setInterval(function(){

				//make sure we keep looping
				if(itr == 7){ itr = 2; }
				shown = "#b".concat(itr.toString());
				hidden = "#b".concat((itr + 1).toString());

				//shows and hides
				$( shown ).animate( { height: "show" }, 3000, name );
				$( shown ).animate( { height: "hide" }, 3000, name );

				//iterates
				++itr;
			}, 6000);
		},
		error: function(e) {
			console.log(e.message);
		}
	});
}