(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Match Game

// 8 cards, face down. User can flip up to two cards at a time to reveal image on front of card. If images match, the cards stay face up. If images don't match, cards are flipped face down and the user selects two new cards. Objective is to find all pairs of matching cards.


// Logic

// Array of "cards" is shuffled and then insterted into the DOM. Using CSS to create flippable cards, user clicks on two cards to reveal image.


$(function () {

	// CARD LIST
	var cardArray = ["bulbasaur", "bulbasaur", "charmander", "charmander", "squirtle", "squirtle", "pikachu", "pikachu"];

	// SHUFFLE FUNCTION
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

	// MATCHING LOGIC
	var flippedCards = [];

	var compareCards = function compareCards() {
		if (flippedCards.length === 2 && flippedCards[0] !== flippedCards[1]) {
			var newVal = parseInt($('.count').text()) + 1;
			$('.count').text(newVal);
			flippedCards.pop();
			flippedCards.pop();
			$('.front').css('pointer-events', 'none');
			setTimeout(function () {
				$('.front').removeClass('flip');
				$('.back').removeClass('flip');
				$('.front').css('pointer-events', 'auto');
			}, 750);
		} else if (flippedCards.length === 2 && flippedCards[0] === flippedCards[1]) {
			var _newVal = parseInt($('.count').text()) + 1;
			$('.count').text(_newVal);
			flippedCards.pop();
			flippedCards.pop();
			$('.back.flip').addClass('matched');
			$('.front.flip').addClass('matched');
		};
	};

	// SHUFFLING AND PRINTING ARRAY
	var shuffledCardArray = shuffle(cardArray);
	var shuffledCardList = '';
	for (var i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front\"></div><div class=\"back " + shuffledCardArray[i] + "\"><img src=\"../dev/assets/" + shuffledCardArray[i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[i] + ".\"></div></div></li>";
	};
	$('.cards').html(shuffledCardList);
	console.log(shuffledCardArray); // to cheat and see the cards

	// DIFFICULTY
	$('.hardMode').on('click', function () {
		$('.cards').toggleClass('hardGrid');
		cardArray.push('eevee', 'eevee', 'dratini', 'dratini');
		var shuffledCardArray = shuffle(cardArray);
		var shuffledCardList = '';
		for (var _i = 0; _i < shuffledCardArray.length; _i++) {
			shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front hard\"></div><div class=\"back " + shuffledCardArray[_i] + "\"><img src=\"../dev/assets/" + shuffledCardArray[_i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[_i] + ".\"></div></div></li>";
		};
		$('.cards').html(shuffledCardList);
		console.log(shuffledCardArray);

		$('.front.hard').on('click', function () {
			$(this).toggleClass('flip');
			$(this).next().toggleClass('flip');
			if ($(this).next().hasClass('bulbasaur')) {
				flippedCards.push('bulbasaur');
			} else if ($(this).next().hasClass('charmander')) {
				flippedCards.push('charmander');
			} else if ($(this).next().hasClass('squirtle')) {
				flippedCards.push('squirtle');
			} else if ($(this).next().hasClass('pikachu')) {
				flippedCards.push('pikachu');
			} else if ($(this).next().hasClass('jigglypuff')) {
				flippedCards.push('jigglypuff');
			} else if ($(this).next().hasClass('eevee')) {
				flippedCards.push('eevee');
			};
			compareCards();
		});
	});

	// FLIPPING CARDS
	$('.front').on('click', function () {
		$(this).toggleClass('flip');
		$(this).next().toggleClass('flip');
		if ($(this).next().hasClass('bulbasaur')) {
			flippedCards.push('bulbasaur');
		} else if ($(this).next().hasClass('charmander')) {
			flippedCards.push('charmander');
		} else if ($(this).next().hasClass('squirtle')) {
			flippedCards.push('squirtle');
		} else if ($(this).next().hasClass('pikachu')) {
			flippedCards.push('pikachu');
		} else if ($(this).next().hasClass('eevee')) {
			flippedCards.push('eevee');
		} else if ($(this).next().hasClass('dratini')) {
			flippedCards.push('dratini');
		};
		compareCards();
	});

	// PLAY AGAIN
	$('button').on('click', function () {
		location.reload();
	});
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUlBLEVBQUUsWUFBVzs7QUFFWjtBQUNBLEtBQUksWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWhCOztBQUdBO0FBQ0EsS0FBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixNQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLE1BQWlDLGNBQWpDO0FBQUEsTUFBaUQsV0FBakQ7QUFDQTtBQUNBLFNBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsaUJBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxtQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG9CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxTQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsU0FBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRCxFQWJEOztBQWVBO0FBQ0EsS0FBTSxlQUFlLEVBQXJCOztBQUVBLEtBQU0sZUFBZSxTQUFmLFlBQWUsR0FBTTtBQUMxQixNQUFJLGFBQWEsTUFBYixLQUF3QixDQUF4QixJQUE2QixhQUFhLENBQWIsTUFBb0IsYUFBYSxDQUFiLENBQXJELEVBQXNFO0FBQ3JFLE9BQU0sU0FBUyxTQUFTLEVBQUUsUUFBRixFQUFZLElBQVosRUFBVCxJQUErQixDQUE5QztBQUNBLEtBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsTUFBakI7QUFDQSxnQkFBYSxHQUFiO0FBQ0EsZ0JBQWEsR0FBYjtBQUNBLEtBQUUsUUFBRixFQUFZ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RUFBd0M7QUFDOUMsZ0JBQWEsSUFBYixDQUFrQixTQUFsQjtBQUNBO0FBQ0Q7QUFDQSxFQWpCRDs7QUFvQkE7QUFDQSxHQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQ2xDLFdBQVMsTUFBVDtBQUNBLEVBRkQ7QUFNQSxDQXRIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIE1hdGNoIEdhbWVcblxuLy8gOCBjYXJkcywgZmFjZSBkb3duLiBVc2VyIGNhbiBmbGlwIHVwIHRvIHR3byBjYXJkcyBhdCBhIHRpbWUgdG8gcmV2ZWFsIGltYWdlIG9uIGZyb250IG9mIGNhcmQuIElmIGltYWdlcyBtYXRjaCwgdGhlIGNhcmRzIHN0YXkgZmFjZSB1cC4gSWYgaW1hZ2VzIGRvbid0IG1hdGNoLCBjYXJkcyBhcmUgZmxpcHBlZCBmYWNlIGRvd24gYW5kIHRoZSB1c2VyIHNlbGVjdHMgdHdvIG5ldyBjYXJkcy4gT2JqZWN0aXZlIGlzIHRvIGZpbmQgYWxsIHBhaXJzIG9mIG1hdGNoaW5nIGNhcmRzLlxuXG5cbi8vIExvZ2ljXG5cbi8vIEFycmF5IG9mIFwiY2FyZHNcIiBpcyBzaHVmZmxlZCBhbmQgdGhlbiBpbnN0ZXJ0ZWQgaW50byB0aGUgRE9NLiBVc2luZyBDU1MgdG8gY3JlYXRlIGZsaXBwYWJsZSBjYXJkcywgdXNlciBjbGlja3Mgb24gdHdvIGNhcmRzIHRvIHJldmVhbCBpbWFnZS5cblxuXG5cbiQoZnVuY3Rpb24gKCl7XG5cblx0Ly8gQ0FSRCBMSVNUXG5cdGxldCBjYXJkQXJyYXkgPSBbXCJidWxiYXNhdXJcIiwgXCJidWxiYXNhdXJcIiwgXCJjaGFybWFuZGVyXCIsIFwiY2hhcm1hbmRlclwiLCBcInNxdWlydGxlXCIsIFwic3F1aXJ0bGVcIiwgXCJwaWthY2h1XCIsIFwicGlrYWNodVwiXTtcblx0XG5cblx0Ly8gU0hVRkZMRSBGVU5DVElPTlxuXHRjb25zdCBzaHVmZmxlID0gKGFycmF5KSA9PiB7XG5cdCAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuXHQgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG5cdCAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXHQgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG5cdCAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG5cdCAgICBjdXJyZW50SW5kZXggLT0gMTtcblx0ICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cblx0ICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcblx0ICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG5cdCAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcblx0ICB9XG5cdCAgcmV0dXJuIGFycmF5O1xuXHR9O1xuXHRcblx0Ly8gTUFUQ0hJTkcgTE9HSUNcblx0Y29uc3QgZmxpcHBlZENhcmRzID0gW107XG5cblx0Y29uc3QgY29tcGFyZUNhcmRzID0gKCkgPT4ge1xuXHRcdGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyICYmIGZsaXBwZWRDYXJkc1swXSAhPT0gZmxpcHBlZENhcmRzWzFdKSB7XG5cdFx0XHRjb25zdCBuZXdWYWwgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpICsgMTtcblx0XHRcdCQoJy5jb3VudCcpLnRleHQobmV3VmFsKTtcblx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdCQoJy5mcm9udCcpLmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHQkKCcuZnJvbnQnKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0XHQkKCcuYmFjaycpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRcdCQoJy5mcm9udCcpLmNzcygncG9pbnRlci1ldmVudHMnLCAnYXV0bycpO1xuXHRcdFx0fSw3NTApO1xuXHRcdH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gPT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdFx0Y29uc3QgbmV3VmFsID0gcGFyc2VJbnQoJCgnLmNvdW50JykudGV4dCgpKSArIDE7XG5cdFx0XHQkKCcuY291bnQnKS50ZXh0KG5ld1ZhbCk7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHQkKCcuYmFjay5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHRcdCQoJy5mcm9udC5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIFNIVUZGTElORyBBTkQgUFJJTlRJTkcgQVJSQVlcblx0bGV0IHNodWZmbGVkQ2FyZEFycmF5ID0gc2h1ZmZsZShjYXJkQXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cIi4uL2Rldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9O1xuXHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRjb25zb2xlLmxvZyhzaHVmZmxlZENhcmRBcnJheSk7IC8vIHRvIGNoZWF0IGFuZCBzZWUgdGhlIGNhcmRzXG5cblx0Ly8gRElGRklDVUxUWVxuXHQkKCcuaGFyZE1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoJy5jYXJkcycpLnRvZ2dsZUNsYXNzKCdoYXJkR3JpZCcpO1xuXHRcdGNhcmRBcnJheS5wdXNoKCdlZXZlZScsICdlZXZlZScsICdkcmF0aW5pJywgJ2RyYXRpbmknKTtcblx0XHRsZXQgc2h1ZmZsZWRDYXJkQXJyYXkgPSBzaHVmZmxlKGNhcmRBcnJheSk7XG5cdFx0bGV0IHNodWZmbGVkQ2FyZExpc3QgPSAnJztcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzaHVmZmxlZENhcmRMaXN0ICs9IGA8bGkgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiZnJvbnQgaGFyZFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJiYWNrICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19XCI+PGltZyBzcmM9XCIuLi9kZXYvYXNzZXRzLyR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LnBuZ1wiIGFsdD1cIkEgY3V0ZSBwaWN0dXJlIG9mICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LlwiPjwvZGl2PjwvZGl2PjwvbGk+YDtcblx0XHR9O1xuXHRcdCQoJy5jYXJkcycpLmh0bWwoc2h1ZmZsZWRDYXJkTGlzdCk7XG5cdFx0Y29uc29sZS5sb2coc2h1ZmZsZWRDYXJkQXJyYXkpO1xuXG5cdFx0JCgnLmZyb250LmhhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2ZsaXAnKTtcblx0XHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2J1bGJhc2F1cicpKSB7XG5cdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdidWxiYXNhdXInKTtcblx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnY2hhcm1hbmRlcicpO1xuXHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnc3F1aXJ0bGUnKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3Bpa2FjaHUnKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgncGlrYWNodScpO1xuXHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnamlnZ2x5cHVmZicpKSB7XG5cdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdqaWdnbHlwdWZmJyk7XG5cdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdlZXZlZScpKSB7XG5cdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdlZXZlZScpO1xuXHRcdFx0fTtcblx0XHRcdGNvbXBhcmVDYXJkcygpO1xuXHRcdH0pO1xuXHR9KTtcblxuXG5cblx0Ly8gRkxJUFBJTkcgQ0FSRFNcblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2J1bGJhc2F1cicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdzcXVpcnRsZScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdwaWthY2h1JykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdwaWthY2h1Jyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZWV2ZWUnKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2VldmVlJyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZHJhdGluaScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZHJhdGluaScpO1xuXHRcdH07XG5cdFx0Y29tcGFyZUNhcmRzKCk7XG5cdH0pO1xuXG5cblx0Ly8gUExBWSBBR0FJTlxuXHQkKCdidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0fSk7XG5cblxuXG59KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=
