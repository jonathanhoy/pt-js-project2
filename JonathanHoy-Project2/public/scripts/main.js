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
			$('aside').addClass('hidden');
			$('.count').text("0");
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
		$('aside').addClass('hidden');
		// location.reload();
	};

	playHardMode();
	playNormalMode();

	// PLAY AGAIN
	$('.playAgain, .normalMode').on('click', function () {
		location.reload();
	});

	// MENU
	$('i').on('click', function () {
		$('aside').toggleClass("hidden");
	});
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUlBLEVBQUUsWUFBVzs7QUFFWjtBQUNBLEtBQUksWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWhCOztBQUdBO0FBQ0EsS0FBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixNQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLE1BQWlDLGNBQWpDO0FBQUEsTUFBaUQsV0FBakQ7QUFDQTtBQUNBLFNBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsaUJBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxtQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG9CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxTQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsU0FBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRCxFQWJEOztBQWVBO0FBQ0EsS0FBTSxlQUFlLEVBQXJCOztBQUVBLEtBQU0sZUFBZSxTQUFmLFlBQWUsR0FBTTtBQUMxQixNQUFJLGFBQWEsTUFBYixLQUF3QixDQUF4QixJQUE2QixhQUFhLENBQWIsTUFBb0IsYUFBYSxDQUFiLENBQXJELEVBQXNFO0FBQ3JFLE9BQU0sU0FBUyxTQUFTLEVBQUUsUUFBRixFQUFZLElBQVosRUFBVCxJQUErQixDQUE5QztBQUNBLEtBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsTUFBakI7QUFDQSxnQkFBYSxHQUFiO0FBQ0EsZ0JBQWEsR0FBYjtBQUNBLEtBQUUsUUFBRixFQUFZLEdBQVosQ0FBZ0IsZ0JBQWhCLEVBQWtDLE1BQWxDO0FBQ0EsY0FBVyxZQUFVO0FBQ3BCLE1BQUUsUUFBRixFQUFZLFdBQVosQ0FBd0IsTUFBeEI7QUFDQSxNQUFFLE9BQUYsRUFBVyxXQUFYLENBQXVCLE1BQXZCO0FBQ0EsTUFBRSxRQUFGLEVBQVksR0FBWixDQUFnQixnQkFBaEIsRUFBa0MsTUFBbEM7QUFDQSxJQUpELEVBSUUsR0FKRjtBQUtBLEdBWEQsTUFXTyxJQUFJLGFBQWEsTUFBYixLQUF3QixDQUF4QixJQUE2QixhQUFhLENBQWIsTUFBb0IsYUFBYSxDQUFiLENBQXJELEVBQXNFO0FBQzVFLE9BQU0sVUFBUyxTQUFTLEVBQUUsUUFBRixFQUFZLElBQVosRUFBVCxJQUErQixDQUE5QztBQUNBLEtBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsT0FBakI7QUFDQSxnQkFBYSxHQUFiO0FBQ0EsZ0JBQWEsR0FBYjtBQUNBLEtBQUUsWUFBRixFQUFnQixRQUFoQixDQUF5QixTQUF6QjtBQUNBLEtBQUUsYUFBRixFQUFpQixRQUFqQixDQUEwQixTQUExQjtBQUNBO0FBQ0QsRUFwQkQ7O0FBc0JBO0FBQ0EsS0FBSSxvQkFBb0IsUUFBUSxTQUFSLENBQXhCO0FBQ0EsS0FBSSxtQkFBbUIsRUFBdkI7QUFDQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksa0JBQWtCLE1BQXRDLEVBQThDLEdBQTlDLEVBQW1EO0FBQ2xELCtHQUFvRyxrQkFBa0IsQ0FBbEIsQ0FBcEcsb0NBQXFKLGtCQUFrQixDQUFsQixDQUFySix1Q0FBeU0sa0JBQWtCLENBQWxCLENBQXpNO0FBQ0E7QUFDRCxHQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLGdCQUFqQjtBQUNBLFNBQVEsR0FBUixDQUFZLGlCQUFaLEVBdERZLENBc0RvQjs7O0FBSWhDO0FBQ0EsR0FBRSxRQUFGLEVBQVksRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUNsQyxJQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLE1BQXBCO0FBQ0EsSUFBRSxJQUFGLEVBQVEsSUFBUixHQUFlLFdBQWYsQ0FBMkIsTUFBM0I7QUFDQSxNQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLFdBQXhCLENBQUosRUFBMEM7QUFDekMsZ0JBQWEsSUFBYixDQUFrQixXQUFsQjtBQUNBLEdBRkQsTUFFTyxJQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLFlBQXhCLENBQUosRUFBMkM7QUFDakQsZ0JBQWEsSUFBYixDQUFrQixZQUFsQjtBQUNBLEdBRk0sTUFFQSxJQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLFVBQXhCLENBQUosRUFBeUM7QUFDL0MsZ0JBQWEsSUFBYixDQUFrQixVQUFsQjtBQUNBLEdBRk0sTUFFQSxJQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLFNBQXhCLENBQUosRUFBd0M7QUFDOUMsZ0JBQWEsSUFBYixDQUFrQixTQUFsQjtBQUNBLEdBRk0sTUFFQSxJQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLE9BQXhCLENBQUosRUFBc0M7QUFDNUMsZ0JBQWEsSUFBYixDQUFrQixPQUFsQjtBQUNBLEdBRk0sTUFFQSxJQUFJLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxRQUFmLENBQXdCLFNBQXhCLENBQUosRUFBd0M7QUFDOUMsZ0JBQWEsSUFBYixDQUFrQixTQUFsQjtBQUNBO0FBQ0Q7QUFDQSxFQWpCRDs7QUFtQkE7QUFDQSxLQUFJLGVBQWUsU0FBZixZQUFlLEdBQU07QUFDeEIsSUFBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixZQUFVO0FBQ3BDLEtBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0IsUUFBcEI7QUFDQSxLQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLEdBQWpCO0FBQ0EsS0FBRSxRQUFGLEVBQVksV0FBWixDQUF3QixVQUF4QjtBQUNBLGFBQVUsSUFBVixDQUFlLE9BQWYsRUFBd0IsT0FBeEIsRUFBaUMsU0FBakMsRUFBNEMsU0FBNUM7QUFDQSxPQUFJLG9CQUFvQixRQUFRLFNBQVIsQ0FBeEI7QUFDQSxPQUFJLG1CQUFtQixFQUF2QjtBQUNBLFFBQUssSUFBSSxLQUFJLENBQWIsRUFBZ0IsS0FBSSxrQkFBa0IsTUFBdEMsRUFBOEMsSUFBOUMsRUFBbUQ7QUFDbEQsc0hBQXlHLGtCQUFrQixFQUFsQixDQUF6RyxvQ0FBMEosa0JBQWtCLEVBQWxCLENBQTFKLHVDQUE4TSxrQkFBa0IsRUFBbEIsQ0FBOU07QUFDQTtBQUNELEtBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsZ0JBQWpCO0FBQ0EsV0FBUSxHQUFSLENBQVksaUJBQVo7O0FBRUEsS0FBRSxhQUFGLEVBQWlCLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCLFlBQVc7QUFDdkMsTUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixNQUFwQjtBQUNBLE1BQUUsSUFBRixFQUFRLElBQVIsR0FBZSxXQUFmLENBQTJCLE1BQTNCO0FBQ0EsUUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixXQUF4QixDQUFKLEVBQTBDO0FBQ3pDLGtCQUFhLElBQWIsQ0FBa0IsV0FBbEI7QUFDQSxLQUZELE1BRU8sSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixZQUF4QixDQUFKLEVBQTJDO0FBQ2pELGtCQUFhLElBQWIsQ0FBa0IsWUFBbEI7QUFDQSxLQUZNLE1BRUEsSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixVQUF4QixDQUFKLEVBQXlDO0FBQy9DLGtCQUFhLElBQWIsQ0FBa0IsVUFBbEI7QUFDQSxLQUZNLE1BRUEsSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixTQUF4QixDQUFKLEVBQXdDO0FBQzlDLGtCQUFhLElBQWIsQ0FBa0IsU0FBbEI7QUFDQSxLQUZNLE1BRUEsSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixPQUF4QixDQUFKLEVBQXNDO0FBQzVDLGtCQUFhLElBQWIsQ0FBa0IsT0FBbEI7QUFDQSxLQUZNLE1BRUEsSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixTQUF4QixDQUFKLEVBQXdDO0FBQzlDLGtCQUFhLElBQWIsQ0FBa0IsU0FBbEI7QUFDQTtBQUNEO0FBQ0EsSUFqQkQ7QUFrQkEsR0EvQkQ7QUFnQ0EsRUFqQ0Q7O0FBbUNBLEtBQUksaUJBQWlCLFNBQWpCLGNBQWlCLEdBQU07QUFDMUIsSUFBRSxPQUFGLEVBQVcsUUFBWCxDQUFvQixRQUFwQjtBQUNBO0FBQ0EsRUFIRDs7QUFLQTtBQUNBOztBQUVBO0FBQ0EsR0FBRSx5QkFBRixFQUE2QixFQUE3QixDQUFnQyxPQUFoQyxFQUF5QyxZQUFXO0FBQ25ELFdBQVMsTUFBVDtBQUNBLEVBRkQ7O0FBS0E7QUFDQSxHQUFFLEdBQUYsRUFBTyxFQUFQLENBQVUsT0FBVixFQUFtQixZQUFVO0FBQzVCLElBQUUsT0FBRixFQUFXLFdBQVgsQ0FBdUIsUUFBdkI7QUFDQSxFQUZEO0FBTUEsQ0F2SUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBNYXRjaCBHYW1lXG5cbi8vIDggY2FyZHMsIGZhY2UgZG93bi4gVXNlciBjYW4gZmxpcCB1cCB0byB0d28gY2FyZHMgYXQgYSB0aW1lIHRvIHJldmVhbCBpbWFnZSBvbiBmcm9udCBvZiBjYXJkLiBJZiBpbWFnZXMgbWF0Y2gsIHRoZSBjYXJkcyBzdGF5IGZhY2UgdXAuIElmIGltYWdlcyBkb24ndCBtYXRjaCwgY2FyZHMgYXJlIGZsaXBwZWQgZmFjZSBkb3duIGFuZCB0aGUgdXNlciBzZWxlY3RzIHR3byBuZXcgY2FyZHMuIE9iamVjdGl2ZSBpcyB0byBmaW5kIGFsbCBwYWlycyBvZiBtYXRjaGluZyBjYXJkcy5cblxuXG4vLyBMb2dpY1xuXG4vLyBBcnJheSBvZiBcImNhcmRzXCIgaXMgc2h1ZmZsZWQgYW5kIHRoZW4gaW5zdGVydGVkIGludG8gdGhlIERPTS4gVXNpbmcgQ1NTIHRvIGNyZWF0ZSBmbGlwcGFibGUgY2FyZHMsIHVzZXIgY2xpY2tzIG9uIHR3byBjYXJkcyB0byByZXZlYWwgaW1hZ2UuXG5cblxuXG4kKGZ1bmN0aW9uICgpe1xuXG5cdC8vIENBUkQgTElTVFxuXHRsZXQgY2FyZEFycmF5ID0gW1wiYnVsYmFzYXVyXCIsIFwiYnVsYmFzYXVyXCIsIFwiY2hhcm1hbmRlclwiLCBcImNoYXJtYW5kZXJcIiwgXCJzcXVpcnRsZVwiLCBcInNxdWlydGxlXCIsIFwicGlrYWNodVwiLCBcInBpa2FjaHVcIl07XG5cdFxuXG5cdC8vIFNIVUZGTEUgRlVOQ1RJT05cblx0Y29uc3Qgc2h1ZmZsZSA9IChhcnJheSkgPT4ge1xuXHQgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleDtcblx0ICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuXHQgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcblx0ICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuXHQgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuXHQgICAgY3VycmVudEluZGV4IC09IDE7XG5cdCAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG5cdCAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG5cdCAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuXHQgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG5cdCAgfVxuXHQgIHJldHVybiBhcnJheTtcblx0fTtcblxuXHQvLyBNQVRDSElORyBMT0dJQ1xuXHRjb25zdCBmbGlwcGVkQ2FyZHMgPSBbXTtcblxuXHRjb25zdCBjb21wYXJlQ2FyZHMgPSAoKSA9PiB7XG5cdFx0aWYgKGZsaXBwZWRDYXJkcy5sZW5ndGggPT09IDIgJiYgZmxpcHBlZENhcmRzWzBdICE9PSBmbGlwcGVkQ2FyZHNbMV0pIHtcblx0XHRcdGNvbnN0IG5ld1ZhbCA9IHBhcnNlSW50KCQoJy5jb3VudCcpLnRleHQoKSkgKyAxO1xuXHRcdFx0JCgnLmNvdW50JykudGV4dChuZXdWYWwpO1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0JCgnLmZyb250JykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQoJy5mcm9udCcpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRcdCQoJy5iYWNrJykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcblx0XHRcdFx0JCgnLmZyb250JykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XG5cdFx0XHR9LDc1MCk7XG5cdFx0fSBlbHNlIGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyICYmIGZsaXBwZWRDYXJkc1swXSA9PT0gZmxpcHBlZENhcmRzWzFdKSB7XG5cdFx0XHRjb25zdCBuZXdWYWwgPSBwYXJzZUludCgkKCcuY291bnQnKS50ZXh0KCkpICsgMTtcblx0XHRcdCQoJy5jb3VudCcpLnRleHQobmV3VmFsKTtcblx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRcdCQoJy5iYWNrLmZsaXAnKS5hZGRDbGFzcygnbWF0Y2hlZCcpO1xuXHRcdFx0JCgnLmZyb250LmZsaXAnKS5hZGRDbGFzcygnbWF0Y2hlZCcpO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gU0hVRkZMSU5HIEFORCBQUklOVElORyBBUlJBWVxuXHRsZXQgc2h1ZmZsZWRDYXJkQXJyYXkgPSBzaHVmZmxlKGNhcmRBcnJheSk7XG5cdGxldCBzaHVmZmxlZENhcmRMaXN0ID0gJyc7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2h1ZmZsZWRDYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRzaHVmZmxlZENhcmRMaXN0ICs9IGA8bGkgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiZnJvbnRcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFjayAke3NodWZmbGVkQ2FyZEFycmF5W2ldfVwiPjxpbWcgc3JjPVwiLi4vZGV2L2Fzc2V0cy8ke3NodWZmbGVkQ2FyZEFycmF5W2ldfS5wbmdcIiBhbHQ9XCJBIGN1dGUgcGljdHVyZSBvZiAke3NodWZmbGVkQ2FyZEFycmF5W2ldfS5cIj48L2Rpdj48L2Rpdj48L2xpPmA7XG5cdH07XG5cdCQoJy5jYXJkcycpLmh0bWwoc2h1ZmZsZWRDYXJkTGlzdCk7XG5cdGNvbnNvbGUubG9nKHNodWZmbGVkQ2FyZEFycmF5KTsgLy8gdG8gY2hlYXQgYW5kIHNlZSB0aGUgY2FyZHNcblxuXG5cblx0Ly8gRkxJUFBJTkcgQ0FSRFMgKE5PUk1BTCBNT0RFKVxuXHQkKCcuZnJvbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0JCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2ZsaXAnKTtcblx0XHRpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2J1bGJhc2F1cicpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnYnVsYmFzYXVyJyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnY2hhcm1hbmRlcicpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnY2hhcm1hbmRlcicpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3NxdWlydGxlJykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdzcXVpcnRsZScpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3Bpa2FjaHUnKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3Bpa2FjaHUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdlZXZlZScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZWV2ZWUnKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdkcmF0aW5pJykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdkcmF0aW5pJyk7XG5cdFx0fTtcblx0XHRjb21wYXJlQ2FyZHMoKTtcblx0fSk7XG5cblx0Ly8gRElGRklDVUxUWVxuXHRsZXQgcGxheUhhcmRNb2RlID0gKCkgPT4ge1xuXHRcdCQoJy5oYXJkTW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCdhc2lkZScpLmFkZENsYXNzKCdoaWRkZW4nKTtcblx0XHRcdCQoJy5jb3VudCcpLnRleHQoXCIwXCIpO1xuXHRcdFx0JCgnLmNhcmRzJykudG9nZ2xlQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0XHRjYXJkQXJyYXkucHVzaCgnZWV2ZWUnLCAnZWV2ZWUnLCAnZHJhdGluaScsICdkcmF0aW5pJyk7XG5cdFx0XHRsZXQgc2h1ZmZsZWRDYXJkQXJyYXkgPSBzaHVmZmxlKGNhcmRBcnJheSk7XG5cdFx0XHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaHVmZmxlZENhcmRBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzaHVmZmxlZENhcmRMaXN0ICs9IGA8bGkgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiZnJvbnQgaGFyZFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJiYWNrICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19XCI+PGltZyBzcmM9XCIuLi9kZXYvYXNzZXRzLyR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LnBuZ1wiIGFsdD1cIkEgY3V0ZSBwaWN0dXJlIG9mICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LlwiPjwvZGl2PjwvZGl2PjwvbGk+YDtcblx0XHRcdH07XG5cdFx0XHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRcdFx0Y29uc29sZS5sb2coc2h1ZmZsZWRDYXJkQXJyYXkpO1xuXG5cdFx0XHQkKCcuZnJvbnQuaGFyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRcdGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnYnVsYmFzYXVyJykpIHtcblx0XHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnYnVsYmFzYXVyJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdjaGFybWFuZGVyJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3NxdWlydGxlJykpIHtcblx0XHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygncGlrYWNodScpKSB7XG5cdFx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3Bpa2FjaHUnKTtcblx0XHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZWV2ZWUnKSkge1xuXHRcdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdlZXZlZScpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdkcmF0aW5pJykpIHtcblx0XHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZHJhdGluaScpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjb21wYXJlQ2FyZHMoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGxldCBwbGF5Tm9ybWFsTW9kZSA9ICgpID0+IHtcblx0XHQkKCdhc2lkZScpLmFkZENsYXNzKCdoaWRkZW4nKTtcblx0XHQvLyBsb2NhdGlvbi5yZWxvYWQoKTtcblx0fVxuXG5cdHBsYXlIYXJkTW9kZSgpO1xuXHRwbGF5Tm9ybWFsTW9kZSgpO1xuXG5cdC8vIFBMQVkgQUdBSU5cblx0JCgnLnBsYXlBZ2FpbiwgLm5vcm1hbE1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0fSk7XG5cblxuXHQvLyBNRU5VXG5cdCQoJ2knKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoJ2FzaWRlJykudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG5cdH0pO1xuXG5cblxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuIl19
