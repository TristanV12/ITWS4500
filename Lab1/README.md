Tristan Villamil

I got the tweets from the JSON file by using JQuery, specifically the getJSON function, which can be found in the runner.js file.

The JavaScript file used 2 functions that ran on different times, the first running every three seconds, the second running every four seconds. The two did basically the same thing, they would take the element stored in a variable called hidden and remove it. Then it would slowly show a element called shown and hide the fifth element before it. After the element has been hidden, the variable used earlier (hidden) is set to that, to be deleted during the next iteration. Another element is appended, hidden from view, and set to the shown variable, to be slowly shown during the next iteration.

The animation uses JQuery, it gave a scrolling effect and seemed to make the page more dynamic when bigger and smaller elements would come into view.