(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// Match Game

// 8 cards, face down. User can flip up to two cards at a time to reveal image on front of card. If images match, the cards stay face up. If images don't match, cards are flipped face down and the user selects two new cards. Objective is to find all pairs of matching cards.


// Logic

// Array of "cards" is shuffled and then insterted into the DOM. Using CSS to create flippable cards, user clicks on two cards to reveal image.

var shuffle = function shuffle(array) {
	var currentIndex = array.length,
	    temporaryValue,
	    randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

var checkForFlip = function checkForFlip() {
	if ($('.front').hasClass('flip')) {
		console.log('Two flips');
	};
};

$(function () {

	var cardArray = ["bulbasaur", "bulbasaur", "charmander", "charmander", "squirtle", "squirtle", "pikachu", "pikachu"];

	var shuffledCardArray = shuffle(cardArray);
	var shuffledCardList = '';
	for (var i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += '<li class="card"><div class="card"><div class="front"></div><div class="back ' + shuffledCardArray[i] + '"><img src="../dev/assets/' + shuffledCardArray[i] + '.png" alt="A cute picture of ' + shuffledCardArray[i] + '."></div></div></li>';
	}

	$('.cards').html(shuffledCardList);

	$('.front').on('click', function () {
		$(this).toggleClass('flip');
		$(this).next().toggleClass('flip');
		checkForFlip();
	});

	$('.back').on('click', function () {
		$(this).toggleClass('flip');
		$(this).prev().toggleClass('flip');
	});

	// if statement to determine when two cards are flipped, can't flip any more cards?


	// if two flipped cards match, add class 'completed' with some CSS and won't be flipped anymore?

});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUEsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7O0FBRUE7QUFDQSxRQUFPLE1BQU0sWUFBYixFQUEyQjs7QUFFekI7QUFDQSxnQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsWUFBM0IsQ0FBZDtBQUNBLGtCQUFnQixDQUFoQjs7QUFFQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7O0FBRUQsUUFBTyxLQUFQO0FBQ0QsQ0FqQkQ7O0FBbUJBLElBQU0sZUFBZSxTQUFmLFlBQWUsR0FBTTtBQUMxQixLQUFJLEVBQUUsUUFBRixFQUFZLFFBQVosQ0FBcUIsTUFBckIsQ0FBSixFQUFrQztBQUNqQyxVQUFRLEdBQVIsQ0FBWSxXQUFaO0FBQ0E7QUFDRCxDQUpEOztBQU1BLEVBQUUsWUFBVzs7QUFFWixLQUFNLFlBQVksQ0FBQyxXQUFELEVBQWMsV0FBZCxFQUEyQixZQUEzQixFQUF5QyxZQUF6QyxFQUF1RCxVQUF2RCxFQUFtRSxVQUFuRSxFQUErRSxTQUEvRSxFQUEwRixTQUExRixDQUFsQjs7QUFFQSxLQUFJLG9CQUFvQixRQUFRLFNBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsd0dBQW9HLGtCQUFrQixDQUFsQixDQUFwRyxrQ0FBcUosa0JBQWtCLENBQWxCLENBQXJKLHFDQUF5TSxrQkFBa0IsQ0FBbEIsQ0FBek07QUFDQTs7QUFFRCxHQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLGdCQUFqQjs7QUFHQSxHQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQ2xDLElBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsTUFBcEI7QUFDQSxJQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsV0FBZixDQUEyQixNQUEzQjtBQUNBO0FBQ0EsRUFKRDs7QUFNQSxHQUFFLE9BQUYsRUFBVyxFQUFYLENBQWMsT0FBZCxFQUF1QixZQUFXO0FBQ2pDLElBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsTUFBcEI7QUFDQSxJQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsV0FBZixDQUEyQixNQUEzQjtBQUNBLEVBSEQ7O0FBS0E7OztBQUdBOztBQUlBLENBL0JEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gTWF0Y2ggR2FtZVxuXG4vLyA4IGNhcmRzLCBmYWNlIGRvd24uIFVzZXIgY2FuIGZsaXAgdXAgdG8gdHdvIGNhcmRzIGF0IGEgdGltZSB0byByZXZlYWwgaW1hZ2Ugb24gZnJvbnQgb2YgY2FyZC4gSWYgaW1hZ2VzIG1hdGNoLCB0aGUgY2FyZHMgc3RheSBmYWNlIHVwLiBJZiBpbWFnZXMgZG9uJ3QgbWF0Y2gsIGNhcmRzIGFyZSBmbGlwcGVkIGZhY2UgZG93biBhbmQgdGhlIHVzZXIgc2VsZWN0cyB0d28gbmV3IGNhcmRzLiBPYmplY3RpdmUgaXMgdG8gZmluZCBhbGwgcGFpcnMgb2YgbWF0Y2hpbmcgY2FyZHMuXG5cblxuLy8gTG9naWNcblxuLy8gQXJyYXkgb2YgXCJjYXJkc1wiIGlzIHNodWZmbGVkIGFuZCB0aGVuIGluc3RlcnRlZCBpbnRvIHRoZSBET00uIFVzaW5nIENTUyB0byBjcmVhdGUgZmxpcHBhYmxlIGNhcmRzLCB1c2VyIGNsaWNrcyBvbiB0d28gY2FyZHMgdG8gcmV2ZWFsIGltYWdlLlxuXG5jb25zdCBzaHVmZmxlID0gKGFycmF5KSA9PiB7XG4gIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleDtcblxuICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG5cbiAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgY3VycmVudEluZGV4IC09IDE7XG5cbiAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gIH1cblxuICByZXR1cm4gYXJyYXk7XG59O1xuXG5jb25zdCBjaGVja0ZvckZsaXAgPSAoKSA9PiB7XG5cdGlmICgkKCcuZnJvbnQnKS5oYXNDbGFzcygnZmxpcCcpKSB7XG5cdFx0Y29uc29sZS5sb2coJ1R3byBmbGlwcycpO1xuXHR9O1xufTtcblxuJChmdW5jdGlvbiAoKXtcblx0XG5cdGNvbnN0IGNhcmRBcnJheSA9IFtcImJ1bGJhc2F1clwiLCBcImJ1bGJhc2F1clwiLCBcImNoYXJtYW5kZXJcIiwgXCJjaGFybWFuZGVyXCIsIFwic3F1aXJ0bGVcIiwgXCJzcXVpcnRsZVwiLCBcInBpa2FjaHVcIiwgXCJwaWthY2h1XCJdO1xuXHRcblx0bGV0IHNodWZmbGVkQ2FyZEFycmF5ID0gc2h1ZmZsZShjYXJkQXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cIi4uL2Rldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9XG5cblx0JCgnLmNhcmRzJykuaHRtbChzaHVmZmxlZENhcmRMaXN0KTtcblxuXG5cdCQoJy5mcm9udCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2ZsaXAnKTtcblx0XHQkKHRoaXMpLm5leHQoKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdGNoZWNrRm9yRmxpcCgpO1xuXHR9KTtcblxuXHQkKCcuYmFjaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2ZsaXAnKTtcblx0XHQkKHRoaXMpLnByZXYoKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHR9KTtcblxuXHQvLyBpZiBzdGF0ZW1lbnQgdG8gZGV0ZXJtaW5lIHdoZW4gdHdvIGNhcmRzIGFyZSBmbGlwcGVkLCBjYW4ndCBmbGlwIGFueSBtb3JlIGNhcmRzP1xuXG5cblx0Ly8gaWYgdHdvIGZsaXBwZWQgY2FyZHMgbWF0Y2gsIGFkZCBjbGFzcyAnY29tcGxldGVkJyB3aXRoIHNvbWUgQ1NTIGFuZCB3b24ndCBiZSBmbGlwcGVkIGFueW1vcmU/XG5cblxuXG59KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=
