function run(){

	//get the JSON in variable data
	$.getJSON( "tweetsFromTwitter.json", function( data ) {

		//variables
		//text holds all text, tags holds all hashtags
		//count_t stores original count for text, count_h stores original count for hashtags
		//iter_t iterates through text, iter_h iterates through hashtags
		var text = [];
		var tags = [];
		var count_t = 0, count_h = 0;
		var iter_t = 0, iter_h = 0;

		//goes through each part of the json file
		$.each( data, function( key, val ) {

			//creates a bit of html code and adds it to the array of text
			text.push("<li id='" + count_t
				+ "'><img src=\"" + val["user"]["profile_image_url"]
				+ "\" onerror=\"this.src='./default.png'\" alt=\"" + val["user"]["screen_name"]
				+ "\"><p>" + val["text"] + "</p></li>");
			$.each( val["entities"]["hashtags"], function( k, hash ){
				//add hashtags
				tags.push("<li id='tag" + count_h
					+ "'><p>#" + hash["text"] +"</p></li>");
				++count_h;
			});
			++count_t;
		});

		var hidden = "#5";
		var shown;
		//runs every 3 seconds
		window.setInterval(function(){

			//make sure we keep looping
			if(iter_t == count_t){ iter_t = 0; }
			shown = "#".concat(iter_t.toString());

			//inserts the item from the list
			document.getElementById("tweet_text").innerHTML += text[iter_t];
			$( shown ).hide();

			//deletes fifth item back
			$(hidden).remove();
			if (iter_t >= 5){ var z = iter_t - 5; }
			else{ var z = iter_t + 995; }
		  hidden = "#".concat(z.toString());
		  $( hidden ).animate( { height: "hide" }, 3000, name );
		  $( shown ).animate( { height: "show" }, 3000, name );

		  //iterates
			++iter_t;
		}, 3000);





		//hashtag function
		var hidden_h = "#tag5";
		var shown_h;
		//runs every 3 seconds
		window.setInterval(function(){

			//make sure we keep looping
			if(iter_h == count_h){ iter_h = 0; }
			shown_h = "#tag".concat(iter_h.toString());

			//inserts the item from the list
			document.getElementById("tweet_hashtags").innerHTML += tags[iter_h];
			$( shown_h ).hide();

			//deletes fifth item back
			$(hidden_h).remove();
			if (iter_h >= 5){ var q = iter_h - 5; }
			else{ var q = iter_h + (count_h - 5); }
		  hidden_h = "#tag".concat(q.toString());
		  $( hidden_h ).animate( { height: "hide" }, 4000, name );
		  $( shown_h ).animate( { height: "show" }, 4000, name );

		  //iterates
			++iter_h;
		}, 4000);
 
	});
}