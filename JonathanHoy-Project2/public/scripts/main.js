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


	// FLIPPING CARDS (NORMAL MODE)
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

	// DIFFICULTY
	var playHardMode = function playHardMode() {
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
				} else if ($(this).next().hasClass('eevee')) {
					flippedCards.push('eevee');
				} else if ($(this).next().hasClass('dratini')) {
					flippedCards.push('dratini');
				};
				compareCards();
			});
		});
	};

	var playNormalMode = function playNormalMode() {
		location.reload();
	};

	playHardMode();

	// PLAY AGAIN
	$('.playAgain, .normalMode').on('click', function () {
		location.reload();
	});
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUlBLEVBQUUsWUFBVzs7QUFFWjtBQUNBLEtBQUksWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWhCOztBQUdBO0FBQ0EsS0FBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixNQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLE1BQWlDLGNBQWpDO0FBQUEsTUFBaUQsV0FBakQ7QUFDQTtBQUNBLFNBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsaUJBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxtQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG9CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxTQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsU0FBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRCxFQWJEOztBQWVBO0FBQ0EsS0FBTSxlQUFlLEVBQXJCOztBQUVBLEtBQU0sZUFBZSxTQUFmLFlBQWUsR0FBTTtBQUMxQixNQUFJLGFBQWEsTUFBYixLQUF3QixDQUF4QixJQUE2QixhQUFhLENBQWIsTUFBb0IsYUFBYSxDQUFiLENBQXJELEVBQXNFO0FBQ3JFLE9BQU0sU0FBUyxTQUFTLEVBQUUsUUFBRixFQUFZLElBQVosRUFBVCxJQUErQixDQUE5QztBQUNBLEtBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsTUFBakI7QUFDQSxnQkFBYSxHQUFiO0FBQ0EsZ0JBQWEsR0FBYjtBQUNBLEtBQUUsUUFBRixFQUFZ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QWYsQ0FBd0IsU0FBeEIsQ0FBSixFQUF3QztBQUM5QyxrQkFBYSxJQUFiLENBQWtCLFNBQWxCO0FBQ0E7QUFDRDtBQUNBLElBakJEO0FBa0JBLEdBN0JEO0FBOEJBLEVBL0JEOztBQWlDQSxLQUFJLGlCQUFpQixTQUFqQixjQUFpQixHQUFNO0FBQzFCLFdBQVMsTUFBVDtBQUNBLEVBRkQ7O0FBSUE7O0FBRUE7QUFDQSxHQUFFLHlCQUFGLEVBQTZCLEVBQTdCLENBQWdDLE9BQWhDLEVBQXlDLFlBQVc7QUFDbkQsV0FBUyxNQUFUO0FBQ0EsRUFGRDtBQU1BLENBN0hEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gTWF0Y2ggR2FtZVxuXG4vLyA4IGNhcmRzLCBmYWNlIGRvd24uIFVzZXIgY2FuIGZsaXAgdXAgdG8gdHdvIGNhcmRzIGF0IGEgdGltZSB0byByZXZlYWwgaW1hZ2Ugb24gZnJvbnQgb2YgY2FyZC4gSWYgaW1hZ2VzIG1hdGNoLCB0aGUgY2FyZHMgc3RheSBmYWNlIHVwLiBJZiBpbWFnZXMgZG9uJ3QgbWF0Y2gsIGNhcmRzIGFyZSBmbGlwcGVkIGZhY2UgZG93biBhbmQgdGhlIHVzZXIgc2VsZWN0cyB0d28gbmV3IGNhcmRzLiBPYmplY3RpdmUgaXMgdG8gZmluZCBhbGwgcGFpcnMgb2YgbWF0Y2hpbmcgY2FyZHMuXG5cblxuLy8gTG9naWNcblxuLy8gQXJyYXkgb2YgXCJjYXJkc1wiIGlzIHNodWZmbGVkIGFuZCB0aGVuIGluc3RlcnRlZCBpbnRvIHRoZSBET00uIFVzaW5nIENTUyB0byBjcmVhdGUgZmxpcHBhYmxlIGNhcmRzLCB1c2VyIGNsaWNrcyBvbiB0d28gY2FyZHMgdG8gcmV2ZWFsIGltYWdlLlxuXG5cblxuJChmdW5jdGlvbiAoKXtcblxuXHQvLyBDQVJEIExJU1Rcblx0bGV0IGNhcmRBcnJheSA9IFtcImJ1bGJhc2F1clwiLCBcImJ1bGJhc2F1clwiLCBcImNoYXJtYW5kZXJcIiwgXCJjaGFybWFuZGVyXCIsIFwic3F1aXJ0bGVcIiwgXCJzcXVpcnRsZVwiLCBcInBpa2FjaHVcIiwgXCJwaWthY2h1XCJdO1xuXHRcblxuXHQvLyBTSFVGRkxFIEZVTkNUSU9OXG5cdGNvbnN0IHNodWZmbGUgPSAoYXJyYXkpID0+IHtcblx0ICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XG5cdCAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cblx0ICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG5cdCAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cblx0ICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcblx0ICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuXHQgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuXHQgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuXHQgICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcblx0ICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuXHQgIH1cblx0ICByZXR1cm4gYXJyYXk7XG5cdH07XG5cblx0Ly8gTUFUQ0hJTkcgTE9HSUNcblx0Y29uc3QgZmxpcHBlZENhcmRzID0gW107XG5cblx0Y29uc3QgY29tcGFyZUNhcmRzID0gKCkgPT4ge1xuXHRcdGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyICYmIGZsaXBwZWRDYXJkc1swXSAhPT0gZmxpcHBlZENhcmRzWzFdKSB7XG5cdFx0XHRjb25zdCBuZXdWYWwgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpICsgMTtcblx0XHRcdCQoJy5jb3VudCcpLnRleHQobmV3VmFsKTtcblx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdCQoJy5mcm9udCcpLmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHQkKCcuZnJvbnQnKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0XHQkKCcuYmFjaycpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRcdCQoJy5mcm9udCcpLmNzcygncG9pbnRlci1ldmVudHMnLCAnYXV0bycpO1xuXHRcdFx0fSw3NTApO1xuXHRcdH0gZWxzZSBpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gPT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdFx0Y29uc3QgbmV3VmFsID0gcGFyc2VJbnQoJCgnLmNvdW50JykudGV4dCgpKSArIDE7XG5cdFx0XHQkKCcuY291bnQnKS50ZXh0KG5ld1ZhbCk7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHQkKCcuYmFjay5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHRcdCQoJy5mcm9udC5mbGlwJykuYWRkQ2xhc3MoJ21hdGNoZWQnKTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIFNIVUZGTElORyBBTkQgUFJJTlRJTkcgQVJSQVlcblx0bGV0IHNodWZmbGVkQ2FyZEFycmF5ID0gc2h1ZmZsZShjYXJkQXJyYXkpO1xuXHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNodWZmbGVkQ2FyZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0c2h1ZmZsZWRDYXJkTGlzdCArPSBgPGxpIGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImZyb250XCI+PC9kaXY+PGRpdiBjbGFzcz1cImJhY2sgJHtzaHVmZmxlZENhcmRBcnJheVtpXX1cIj48aW1nIHNyYz1cIi4uL2Rldi9hc3NldHMvJHtzaHVmZmxlZENhcmRBcnJheVtpXX0ucG5nXCIgYWx0PVwiQSBjdXRlIHBpY3R1cmUgb2YgJHtzaHVmZmxlZENhcmRBcnJheVtpXX0uXCI+PC9kaXY+PC9kaXY+PC9saT5gO1xuXHR9O1xuXHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRjb25zb2xlLmxvZyhzaHVmZmxlZENhcmRBcnJheSk7IC8vIHRvIGNoZWF0IGFuZCBzZWUgdGhlIGNhcmRzXG5cblxuXG5cdC8vIEZMSVBQSU5HIENBUkRTIChOT1JNQUwgTU9ERSlcblx0JCgnLmZyb250Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0aWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdidWxiYXNhdXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2J1bGJhc2F1cicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2NoYXJtYW5kZXInKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdzcXVpcnRsZScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdwaWthY2h1JykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdwaWthY2h1Jyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZWV2ZWUnKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2VldmVlJyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZHJhdGluaScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZHJhdGluaScpO1xuXHRcdH07XG5cdFx0Y29tcGFyZUNhcmRzKCk7XG5cdH0pO1xuXG5cdC8vIERJRkZJQ1VMVFlcblx0bGV0IHBsYXlIYXJkTW9kZSA9ICgpID0+IHtcblx0XHQkKCcuaGFyZE1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnLmNhcmRzJykudG9nZ2xlQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0XHRjYXJkQXJyYXkucHVzaCgnZWV2ZWUnLCAnZWV2ZWUnLCAnZHJhdGluaScsICdkcmF0aW5pJyk7XG5cdFx0XHRsZXQgc2h1ZmZsZWRDYXJkQXJyYXkgPSBzaHVmZmxlKGNhcmRBcnJheSk7XG5cdFx0XHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaHVmZmxlZENhcmRBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzaHVmZmxlZENhcmRMaXN0ICs9IGA8bGkgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiZnJvbnQgaGFyZFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJiYWNrICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19XCI+PGltZyBzcmM9XCIuLi9kZXYvYXNzZXRzLyR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LnBuZ1wiIGFsdD1cIkEgY3V0ZSBwaWN0dXJlIG9mICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LlwiPjwvZGl2PjwvZGl2PjwvbGk+YDtcblx0XHRcdH07XG5cdFx0XHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRcdFx0Y29uc29sZS5sb2coc2h1ZmZsZWRDYXJkQXJyYXkpO1xuXG5cdFx0XHQkKCcuZnJvbnQuaGFyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRcdGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnYnVsYmFzYXVyJykpIHtcblx0XHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnYnVsYmFzYXVyJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdjaGFybWFuZGVyJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3NxdWlydGxlJykpIHtcblx0XHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygncGlrYWNodScpKSB7XG5cdFx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3Bpa2FjaHUnKTtcblx0XHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZWV2ZWUnKSkge1xuXHRcdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdlZXZlZScpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdkcmF0aW5pJykpIHtcblx0XHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZHJhdGluaScpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjb21wYXJlQ2FyZHMoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGxldCBwbGF5Tm9ybWFsTW9kZSA9ICgpID0+IHtcblx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0fVxuXG5cdHBsYXlIYXJkTW9kZSgpO1xuXG5cdC8vIFBMQVkgQUdBSU5cblx0JCgnLnBsYXlBZ2FpbiwgLm5vcm1hbE1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0fSk7XG5cblxuXG59KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=
