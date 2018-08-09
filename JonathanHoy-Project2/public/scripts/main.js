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

	// SHUFFLING AND PRINTING ARRAY
	var shuffledCardArray = shuffle(cardArray);
	var shuffledCardList = '';
	for (var i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front\"></div><div class=\"back " + shuffledCardArray[i] + "\"><img src=\"dev/assets/" + shuffledCardArray[i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[i] + ".\"></div></div></li>";
	};
	$('.cards').html(shuffledCardList);
	console.log(shuffledCardArray); // to cheat and see the cards

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

	// FLIPPING CARDS (NORMAL MODE)
	var cardFlip = function cardFlip() {
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
	};

	cardFlip();

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
				shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front hard\"></div><div class=\"back " + shuffledCardArray[_i] + "\"><img src=\"dev/assets/" + shuffledCardArray[_i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[_i] + ".\"></div></div></li>";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUlBLEVBQUUsWUFBVzs7QUFFWjtBQUNBLEtBQUksWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWhCOztBQUdBO0FBQ0EsS0FBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixNQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLE1BQWlDLGNBQWpDO0FBQUEsTUFBaUQsV0FBakQ7QUFDQTtBQUNBLFNBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsaUJBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxtQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG9CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxTQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsU0FBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRCxFQWJEOztBQWVBO0FBQ0EsS0FBSSxvQkFBb0IsUUFBUSxTQUFSLENBQXhCO0FBQ0EsS0FBSSxtQkFBbUIsRUFBdkI7QUFDQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksa0JBQWtCLE1BQXRDLEVBQThDLEdBQTlDLEVBQW1EO0FBQ2xELCtHQUFvRyxrQkFBa0IsQ0FBbEIsQ0FBcEcsaUNBQWtKLGtCQUFrQixDQUFsQixDQUFsSix1Q0FBc00sa0JBQWtCLENBQWxCLENBQXRNO0FBQ0E7QUFDRCxHQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLGdCQUFqQjtBQUNBLFNBQVEsR0FBUixDQUFZLGlCQUFa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QUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixPQUF4QixDQUFKLEVBQXNDO0FBQzVDLGtCQUFhLElBQWIsQ0FBa0IsT0FBbEI7QUFDQSxLQUZNLE1BRUEsSUFBSSxFQUFFLElBQUYsRUFBUSxJQUFSLEdBQWUsUUFBZixDQUF3QixTQUF4QixDQUFKLEVBQXdDO0FBQzlDLGtCQUFhLElBQWIsQ0FBa0IsU0FBbEI7QUFDQTtBQUNEO0FBQ0EsSUFqQkQ7QUFrQkEsR0EvQkQ7QUFnQ0EsRUFqQ0Q7O0FBbUNBLEtBQUksaUJBQWlCLFNBQWpCLGNBQWlCLEdBQU07QUFDMUIsSUFBRSxPQUFGLEVBQVcsUUFBWCxDQUFvQixRQUFwQjtBQUNBO0FBQ0EsRUFIRDs7QUFLQTtBQUNBOztBQUVBO0FBQ0EsR0FBRSx5QkFBRixFQUE2QixFQUE3QixDQUFnQyxPQUFoQyxFQUF5QyxZQUFXO0FBQ25ELFdBQVMsTUFBVDtBQUNBLEVBRkQ7O0FBS0E7QUFDQSxHQUFFLEdBQUYsRUFBTyxFQUFQLENBQVUsT0FBVixFQUFtQixZQUFVO0FBQzVCLElBQUUsT0FBRixFQUFXLFdBQVgsQ0FBdUIsUUFBdkI7QUFDQSxFQUZEO0FBTUEsQ0F6SUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBNYXRjaCBHYW1lXG5cbi8vIDggY2FyZHMsIGZhY2UgZG93bi4gVXNlciBjYW4gZmxpcCB1cCB0byB0d28gY2FyZHMgYXQgYSB0aW1lIHRvIHJldmVhbCBpbWFnZSBvbiBmcm9udCBvZiBjYXJkLiBJZiBpbWFnZXMgbWF0Y2gsIHRoZSBjYXJkcyBzdGF5IGZhY2UgdXAuIElmIGltYWdlcyBkb24ndCBtYXRjaCwgY2FyZHMgYXJlIGZsaXBwZWQgZmFjZSBkb3duIGFuZCB0aGUgdXNlciBzZWxlY3RzIHR3byBuZXcgY2FyZHMuIE9iamVjdGl2ZSBpcyB0byBmaW5kIGFsbCBwYWlycyBvZiBtYXRjaGluZyBjYXJkcy5cblxuXG4vLyBMb2dpY1xuXG4vLyBBcnJheSBvZiBcImNhcmRzXCIgaXMgc2h1ZmZsZWQgYW5kIHRoZW4gaW5zdGVydGVkIGludG8gdGhlIERPTS4gVXNpbmcgQ1NTIHRvIGNyZWF0ZSBmbGlwcGFibGUgY2FyZHMsIHVzZXIgY2xpY2tzIG9uIHR3byBjYXJkcyB0byByZXZlYWwgaW1hZ2UuXG5cblxuXG4kKGZ1bmN0aW9uICgpe1xuXG5cdC8vIENBUkQgTElTVFxuXHRsZXQgY2FyZEFycmF5ID0gW1wiYnVsYmFzYXVyXCIsIFwiYnVsYmFzYXVyXCIsIFwiY2hhcm1hbmRlclwiLCBcImNoYXJtYW5kZXJcIiwgXCJzcXVpcnRsZVwiLCBcInNxdWlydGxlXCIsIFwicGlrYWNodVwiLCBcInBpa2FjaHVcIl07XG5cdFxuXG5cdC8vIFNIVUZGTEUgRlVOQ1RJT05cblx0Y29uc3Qgc2h1ZmZsZSA9IChhcnJheSkgPT4ge1xuXHQgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleDtcblx0ICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuXHQgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcblx0ICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuXHQgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuXHQgICAgY3VycmVudEluZGV4IC09IDE7XG5cdCAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG5cdCAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG5cdCAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuXHQgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG5cdCAgfVxuXHQgIHJldHVybiBhcnJheTtcblx0fTtcblxuXHQvLyBTSFVGRkxJTkcgQU5EIFBSSU5USU5HIEFSUkFZXG5cdGxldCBzaHVmZmxlZENhcmRBcnJheSA9IHNodWZmbGUoY2FyZEFycmF5KTtcblx0bGV0IHNodWZmbGVkQ2FyZExpc3QgPSAnJztcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaHVmZmxlZENhcmRBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdHNodWZmbGVkQ2FyZExpc3QgKz0gYDxsaSBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiY2FyZFwiPjxkaXYgY2xhc3M9XCJmcm9udFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJiYWNrICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19XCI+PGltZyBzcmM9XCJkZXYvYXNzZXRzLyR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LnBuZ1wiIGFsdD1cIkEgY3V0ZSBwaWN0dXJlIG9mICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LlwiPjwvZGl2PjwvZGl2PjwvbGk+YDtcblx0fTtcblx0JCgnLmNhcmRzJykuaHRtbChzaHVmZmxlZENhcmRMaXN0KTtcblx0Y29uc29sZS5sb2coc2h1ZmZsZWRDYXJkQXJyYXkpOyAvLyB0byBjaGVhdCBhbmQgc2VlIHRoZSBjYXJkc1xuXG5cdC8vIE1BVENISU5HIExPR0lDXG5cdGNvbnN0IGZsaXBwZWRDYXJkcyA9IFtdO1xuXG5cdGNvbnN0IGNvbXBhcmVDYXJkcyA9ICgpID0+IHtcblx0XHRpZiAoZmxpcHBlZENhcmRzLmxlbmd0aCA9PT0gMiAmJiBmbGlwcGVkQ2FyZHNbMF0gIT09IGZsaXBwZWRDYXJkc1sxXSkge1xuXHRcdFx0Y29uc3QgbmV3VmFsID0gcGFyc2VJbnQoJCgnLmNvdW50JykudGV4dCgpKSArIDE7XG5cdFx0XHQkKCcuY291bnQnKS50ZXh0KG5ld1ZhbCk7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0JCgnLmZyb250JykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcblx0XHRcdFx0JCgnLmJhY2snKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0XHQkKCcuZnJvbnQnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcblx0XHRcdH0sNzUwKTtcblx0XHR9IGVsc2UgaWYgKGZsaXBwZWRDYXJkcy5sZW5ndGggPT09IDIgJiYgZmxpcHBlZENhcmRzWzBdID09PSBmbGlwcGVkQ2FyZHNbMV0pIHtcblx0XHRcdGNvbnN0IG5ld1ZhbCA9IHBhcnNlSW50KCQoJy5jb3VudCcpLnRleHQoKSkgKyAxO1xuXHRcdFx0JCgnLmNvdW50JykudGV4dChuZXdWYWwpO1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0ZmxpcHBlZENhcmRzLnBvcCgpO1xuXHRcdFx0JCgnLmJhY2suZmxpcCcpLmFkZENsYXNzKCdtYXRjaGVkJyk7XG5cdFx0XHQkKCcuZnJvbnQuZmxpcCcpLmFkZENsYXNzKCdtYXRjaGVkJyk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBGTElQUElORyBDQVJEUyAoTk9STUFMIE1PREUpXG5cdGxldCBjYXJkRmxpcCA9ICgpID0+IHtcblx0XHQkKCcuZnJvbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2ZsaXAnKTtcblx0XHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2J1bGJhc2F1cicpKSB7XG5cdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdidWxiYXNhdXInKTtcblx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnY2hhcm1hbmRlcicpO1xuXHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnc3F1aXJ0bGUnKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3Bpa2FjaHUnKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgncGlrYWNodScpO1xuXHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZWV2ZWUnKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZWV2ZWUnKTtcblx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2RyYXRpbmknKSkge1xuXHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZHJhdGluaScpO1xuXHRcdFx0fTtcblx0XHRcdGNvbXBhcmVDYXJkcygpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNhcmRGbGlwKCk7XG5cblx0Ly8gRElGRklDVUxUWVxuXHRsZXQgcGxheUhhcmRNb2RlID0gKCkgPT4ge1xuXHRcdCQoJy5oYXJkTW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCdhc2lkZScpLmFkZENsYXNzKCdoaWRkZW4nKTtcblx0XHRcdCQoJy5jb3VudCcpLnRleHQoXCIwXCIpO1xuXHRcdFx0JCgnLmNhcmRzJykudG9nZ2xlQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0XHRjYXJkQXJyYXkucHVzaCgnZWV2ZWUnLCAnZWV2ZWUnLCAnZHJhdGluaScsICdkcmF0aW5pJyk7XG5cdFx0XHRsZXQgc2h1ZmZsZWRDYXJkQXJyYXkgPSBzaHVmZmxlKGNhcmRBcnJheSk7XG5cdFx0XHRsZXQgc2h1ZmZsZWRDYXJkTGlzdCA9ICcnO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaHVmZmxlZENhcmRBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzaHVmZmxlZENhcmRMaXN0ICs9IGA8bGkgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiZnJvbnQgaGFyZFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJiYWNrICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19XCI+PGltZyBzcmM9XCJkZXYvYXNzZXRzLyR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LnBuZ1wiIGFsdD1cIkEgY3V0ZSBwaWN0dXJlIG9mICR7c2h1ZmZsZWRDYXJkQXJyYXlbaV19LlwiPjwvZGl2PjwvZGl2PjwvbGk+YDtcblx0XHRcdH07XG5cdFx0XHQkKCcuY2FyZHMnKS5odG1sKHNodWZmbGVkQ2FyZExpc3QpO1xuXHRcdFx0Y29uc29sZS5sb2coc2h1ZmZsZWRDYXJkQXJyYXkpO1xuXG5cdFx0XHQkKCcuZnJvbnQuaGFyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRcdCQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG5cdFx0XHRcdGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnYnVsYmFzYXVyJykpIHtcblx0XHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnYnVsYmFzYXVyJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2NoYXJtYW5kZXInKSkge1xuXHRcdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdjaGFybWFuZGVyJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ3NxdWlydGxlJykpIHtcblx0XHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnc3F1aXJ0bGUnKTtcblx0XHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygncGlrYWNodScpKSB7XG5cdFx0XHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3Bpa2FjaHUnKTtcblx0XHRcdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnZWV2ZWUnKSkge1xuXHRcdFx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdlZXZlZScpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdkcmF0aW5pJykpIHtcblx0XHRcdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgnZHJhdGluaScpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjb21wYXJlQ2FyZHMoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGxldCBwbGF5Tm9ybWFsTW9kZSA9ICgpID0+IHtcblx0XHQkKCdhc2lkZScpLmFkZENsYXNzKCdoaWRkZW4nKTtcblx0XHQvLyBsb2NhdGlvbi5yZWxvYWQoKTtcblx0fVxuXG5cdHBsYXlIYXJkTW9kZSgpO1xuXHRwbGF5Tm9ybWFsTW9kZSgpO1xuXG5cdC8vIFBMQVkgQUdBSU5cblx0JCgnLnBsYXlBZ2FpbiwgLm5vcm1hbE1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcblx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0fSk7XG5cblxuXHQvLyBNRU5VXG5cdCQoJ2knKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoJ2FzaWRlJykudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG5cdH0pO1xuXG5cblxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuIl19
