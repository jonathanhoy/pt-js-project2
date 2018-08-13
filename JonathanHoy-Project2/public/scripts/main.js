(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

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
var shuffleCards = function shuffleCards(array) {
	var shuffledCardArray = shuffle(array);
	var shuffledCardList = '';
	for (var i = 0; i < shuffledCardArray.length; i++) {
		shuffledCardList += "<li class=\"card\"><div class=\"card\"><div class=\"front\"></div><div class=\"back " + shuffledCardArray[i] + "\"><img src=\"dev/assets/" + shuffledCardArray[i] + ".png\" alt=\"A cute picture of " + shuffledCardArray[i] + ".\"></div></div></li>";
	};
	$('.cards').html(shuffledCardList);
	console.log(shuffledCardArray); // to cheat and see the cards
};

// FLIPPING CARDS (NORMAL MODE)
var cardFlip = function cardFlip(array) {
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
		compareCards(array);
	});
};

// MATCHING LOGIC
var flippedCards = [];

var winCount = [];

var compareCards = function compareCards(array) {
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
		winCount.push('matched');
		console.log(winCount);
		winMessage(array);
	};
};

// DIFFICULTY
var switchToHardMode = function switchToHardMode() {
	$('.hardMode').on('click', function () {
		$('.cards').addClass('hardGrid');
		if (cardArray.length === 8) {
			cardArray.push('eevee', 'eevee', 'dratini', 'dratini');
		}
		shuffleCards(cardArray);
		cardFlip(cardArray);
		winCount = winCount.filter(function (match) {
			if (match !== 'matched') {
				return true;
			};
		});
		// winMessage(cardArray);
	});
};

var switchToNormalMode = function switchToNormalMode() {
	$('.normalMode').on('click', function () {
		$('.cards').removeClass('hardGrid');
		var normalModeArray = cardArray.filter(function (pokemon) {
			if (pokemon !== 'dratini' && pokemon !== 'eevee') {
				return true;
			};
		});
		shuffleCards(normalModeArray);
		cardFlip(normalModeArray);
		winCount = winCount.filter(function (match) {
			if (match !== 'matched') {
				return true;
			};
			winMessage(normalModeArray);
		});
	});
};

// RESET
$('a').on('click', function () {
	$('.count').text("0");
	$('aside').addClass('hidden');
});

// MENU
$('i').on('click', function () {
	$('aside').toggleClass("hidden");
});

// WINNING
var winMessage = function winMessage(array) {
	var tries = parseInt($('.count').text());
	var pairs = array.length / 2;
	console.log(tries);
	console.log(pairs);
	setTimeout(function () {
		if (winCount.length === array.length / 2) {
			winCount = winCount.filter(function (match) {
				if (match !== 'matched') {
					return true;
				};
			});
			if (tries === pairs) {
				alert("Congratulations! You won in " + $('.count').text() + " tries! A perfect round! You are the best!!");
			} else {
				alert("Congratulations! You won in " + $('.count').text() + " tries! Select a difficulty to play again!");
			};
		};
	}, 10);
};

// INIT
var init = function init() {
	shuffleCards(cardArray);
	cardFlip(cardArray);
	switchToHardMode();
	switchToNormalMode();
};

// DOCUMENT READY
$(function () {
	init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLElBQU0sWUFBWSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFlBQTNCLEVBQXlDLFlBQXpDLEVBQXVELFVBQXZELEVBQW1FLFVBQW5FLEVBQStFLFNBQS9FLEVBQTBGLFNBQTFGLENBQWxCOztBQUVBO0FBQ0EsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGVBQWUsTUFBTSxNQUF6QjtBQUFBLEtBQWlDLGNBQWpDO0FBQUEsS0FBaUQsV0FBakQ7QUFDQTtBQUNBLFFBQU8sTUFBTSxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0EsZ0JBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxrQkFBZ0IsQ0FBaEI7QUFDQTtBQUNBLG1CQUFpQixNQUFNLFlBQU4sQ0FBakI7QUFDQSxRQUFNLFlBQU4sSUFBc0IsTUFBTSxXQUFOLENBQXRCO0FBQ0EsUUFBTSxXQUFOLElBQXFCLGNBQXJCO0FBQ0Q7QUFDRCxRQUFPLEtBQVA7QUFDRCxDQWJEOztBQWVBO0FBQ0EsSUFBSSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUM3QixLQUFJLG9CQUFvQixRQUFRLEtBQVIsQ0FBeEI7QUFDQSxLQUFJLG1CQUFtQixFQUF2QjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxrQkFBa0IsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDbEQsK0dBQW9HLGtCQUFrQixDQUFsQixDQUFwRyxpQ0FBa0osa0JBQWtCLENBQWxCLENBQWxKLHVDQUFzTSxrQkFBa0IsQ0FBbEIsQ0FBdE07QUFDQTtBQUNELEdBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsZ0JBQWpCO0FBQ0EsU0FBUSxHQUFSLENBQVksaUJBQVos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LEVBQVAsQ0FBVSxPQUFWLEVBQW1CLFlBQVU7QUFDNUIsR0FBRSxPQUFGLEVBQVcsV0FBWCxDQUF1QixRQUF2QjtBQUNBLENBRkQ7O0FBSUE7QUFDQSxJQUFJLGFBQWEsU0FBYixVQUFhLENBQUMsS0FBRCxFQUFXO0FBQzNCLEtBQUksUUFBUSxTQUFTLEVBQUUsUUFBRixFQUFZLElBQVosRUFBVCxDQUFaO0FBQ0EsS0FBSSxRQUFRLE1BQU0sTUFBTixHQUFlLENBQTNCO0FBQ0EsU0FBUSxHQUFSLENBQVksS0FBWjtBQUNBLFNBQVEsR0FBUixDQUFZLEtBQVo7QUFDQSxZQUFXLFlBQVU7QUFDcEIsTUFBSSxTQUFTLE1BQVQsS0FBcUIsTUFBTSxNQUFOLEdBQWUsQ0FBeEMsRUFBNEM7QUFDM0MsY0FBVyxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxLQUFELEVBQVc7QUFDckMsUUFBSSxVQUFVLFNBQWQsRUFBeUI7QUFDeEIsWUFBTyxJQUFQO0FBQ0E7QUFDRCxJQUpVLENBQVg7QUFLQSxPQUFJLFVBQVUsS0FBZCxFQUFxQjtBQUNwQiwyQ0FBcUMsRUFBRSxRQUFGLEVBQVksSUFBWixFQUFyQztBQUNBLElBRkQsTUFFTztBQUNOLDJDQUFxQyxFQUFFLFFBQUYsRUFBWSxJQUFaLEVBQXJDO0FBQ0E7QUFDRDtBQUNELEVBYkQsRUFhRSxFQWJGO0FBY0EsQ0FuQkQ7O0FBcUJBO0FBQ0EsSUFBSSxPQUFPLFNBQVAsSUFBTyxHQUFNO0FBQ2hCLGNBQWEsU0FBYjtBQUNBLFVBQVMsU0FBVDtBQUNBO0FBQ0E7QUFDQSxDQUxEOztBQVFBO0FBQ0EsRUFBRSxZQUFXO0FBQ1o7QUFDQSxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gQ0FSRCBMSVNUXG5jb25zdCBjYXJkQXJyYXkgPSBbXCJidWxiYXNhdXJcIiwgXCJidWxiYXNhdXJcIiwgXCJjaGFybWFuZGVyXCIsIFwiY2hhcm1hbmRlclwiLCBcInNxdWlydGxlXCIsIFwic3F1aXJ0bGVcIiwgXCJwaWthY2h1XCIsIFwicGlrYWNodVwiXTtcblxuLy8gU0hVRkZMRSBGVU5DVElPTlxuY29uc3Qgc2h1ZmZsZSA9IChhcnJheSkgPT4ge1xuICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XG4gIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgY3VycmVudEluZGV4IC09IDE7XG4gICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn07XG5cbi8vIFNIVUZGTElORyBBTkQgUFJJTlRJTkcgQVJSQVlcbmxldCBzaHVmZmxlQ2FyZHMgPSAoYXJyYXkpID0+IHtcblx0bGV0IHNodWZmbGVkQ2FyZEFycmF5ID0gc2h1ZmZsZShhcnJheSk7XG5cdGxldCBzaHVmZmxlZENhcmRMaXN0ID0gJyc7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2h1ZmZsZWRDYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRzaHVmZmxlZENhcmRMaXN0ICs9IGA8bGkgY2xhc3M9XCJjYXJkXCI+PGRpdiBjbGFzcz1cImNhcmRcIj48ZGl2IGNsYXNzPVwiZnJvbnRcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFjayAke3NodWZmbGVkQ2FyZEFycmF5W2ldfVwiPjxpbWcgc3JjPVwiZGV2L2Fzc2V0cy8ke3NodWZmbGVkQ2FyZEFycmF5W2ldfS5wbmdcIiBhbHQ9XCJBIGN1dGUgcGljdHVyZSBvZiAke3NodWZmbGVkQ2FyZEFycmF5W2ldfS5cIj48L2Rpdj48L2Rpdj48L2xpPmA7XG5cdH07XG5cdCQoJy5jYXJkcycpLmh0bWwoc2h1ZmZsZWRDYXJkTGlzdCk7XG5cdGNvbnNvbGUubG9nKHNodWZmbGVkQ2FyZEFycmF5KTsgLy8gdG8gY2hlYXQgYW5kIHNlZSB0aGUgY2FyZHNcbn07XG5cbi8vIEZMSVBQSU5HIENBUkRTIChOT1JNQUwgTU9ERSlcbmNvbnN0IGNhcmRGbGlwID0gKGFycmF5KSA9PiB7XG5cdCQoJy5mcm9udCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2ZsaXAnKTtcblx0XHQkKHRoaXMpLm5leHQoKS50b2dnbGVDbGFzcygnZmxpcCcpO1xuXHRcdGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnYnVsYmFzYXVyJykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdidWxiYXNhdXInKTtcblx0XHR9IGVsc2UgaWYgKCQodGhpcykubmV4dCgpLmhhc0NsYXNzKCdjaGFybWFuZGVyJykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdjaGFybWFuZGVyJyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygnc3F1aXJ0bGUnKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ3NxdWlydGxlJyk7XG5cdFx0fSBlbHNlIGlmICgkKHRoaXMpLm5leHQoKS5oYXNDbGFzcygncGlrYWNodScpKSB7XG5cdFx0XHRmbGlwcGVkQ2FyZHMucHVzaCgncGlrYWNodScpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2VldmVlJykpIHtcblx0XHRcdGZsaXBwZWRDYXJkcy5wdXNoKCdlZXZlZScpO1xuXHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5uZXh0KCkuaGFzQ2xhc3MoJ2RyYXRpbmknKSkge1xuXHRcdFx0ZmxpcHBlZENhcmRzLnB1c2goJ2RyYXRpbmknKTtcblx0XHR9O1xuXHRcdGNvbXBhcmVDYXJkcyhhcnJheSk7XG5cdH0pO1xufTtcblxuLy8gTUFUQ0hJTkcgTE9HSUNcbmNvbnN0IGZsaXBwZWRDYXJkcyA9IFtdO1xuXG5sZXQgd2luQ291bnQgPSBbXTtcblxuY29uc3QgY29tcGFyZUNhcmRzID0gKGFycmF5KSA9PiB7XG5cdGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyICYmIGZsaXBwZWRDYXJkc1swXSAhPT0gZmxpcHBlZENhcmRzWzFdKSB7XG5cdFx0Y29uc3QgbmV3VmFsID0gcGFyc2VJbnQoJCgnLmNvdW50JykudGV4dCgpKSArIDE7XG5cdFx0JCgnLmNvdW50JykudGV4dChuZXdWYWwpO1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0JCgnLmZyb250JykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JCgnLmZyb250JykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcblx0XHRcdCQoJy5iYWNrJykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcblx0XHRcdCQoJy5mcm9udCcpLmNzcygncG9pbnRlci1ldmVudHMnLCAnYXV0bycpO1xuXHRcdH0sNzUwKTtcblx0fSBlbHNlIGlmIChmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyICYmIGZsaXBwZWRDYXJkc1swXSA9PT0gZmxpcHBlZENhcmRzWzFdKSB7XG5cdFx0Y29uc3QgbmV3VmFsID0gcGFyc2VJbnQoJCgnLmNvdW50JykudGV4dCgpKSArIDE7XG5cdFx0JCgnLmNvdW50JykudGV4dChuZXdWYWwpO1xuXHRcdGZsaXBwZWRDYXJkcy5wb3AoKTtcblx0XHRmbGlwcGVkQ2FyZHMucG9wKCk7XG5cdFx0JCgnLmJhY2suZmxpcCcpLmFkZENsYXNzKCdtYXRjaGVkJyk7XG5cdFx0JCgnLmZyb250LmZsaXAnKS5hZGRDbGFzcygnbWF0Y2hlZCcpO1xuXHRcdHdpbkNvdW50LnB1c2goJ21hdGNoZWQnKTtcblx0XHRjb25zb2xlLmxvZyh3aW5Db3VudCk7XG5cdFx0d2luTWVzc2FnZShhcnJheSk7XG5cdH07XG59O1xuXG4vLyBESUZGSUNVTFRZXG5sZXQgc3dpdGNoVG9IYXJkTW9kZSA9ICgpID0+IHtcblx0JCgnLmhhcmRNb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHQkKCcuY2FyZHMnKS5hZGRDbGFzcygnaGFyZEdyaWQnKTtcblx0XHRpZiAoY2FyZEFycmF5Lmxlbmd0aCA9PT0gOCkge1xuXHRcdFx0Y2FyZEFycmF5LnB1c2goJ2VldmVlJywgJ2VldmVlJywgJ2RyYXRpbmknLCAnZHJhdGluaScpO1xuXHRcdH1cblx0XHRzaHVmZmxlQ2FyZHMoY2FyZEFycmF5KTtcblx0XHRjYXJkRmxpcChjYXJkQXJyYXkpO1xuXHRcdHdpbkNvdW50ID0gd2luQ291bnQuZmlsdGVyKChtYXRjaCkgPT4ge1xuXHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHQvLyB3aW5NZXNzYWdlKGNhcmRBcnJheSk7XG5cdH0pO1xufTtcblxuXG5sZXQgc3dpdGNoVG9Ob3JtYWxNb2RlID0gKCkgPT4ge1xuXHQkKCcubm9ybWFsTW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0JCgnLmNhcmRzJykucmVtb3ZlQ2xhc3MoJ2hhcmRHcmlkJyk7XG5cdFx0Y29uc3Qgbm9ybWFsTW9kZUFycmF5ID0gY2FyZEFycmF5LmZpbHRlcigocG9rZW1vbikgPT4ge1xuXHRcdFx0aWYgKHBva2Vtb24gIT09ICdkcmF0aW5pJyAmJiBwb2tlbW9uICE9PSAnZWV2ZWUnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0XHRzaHVmZmxlQ2FyZHMobm9ybWFsTW9kZUFycmF5KTtcblx0XHRjYXJkRmxpcChub3JtYWxNb2RlQXJyYXkpO1xuXHRcdHdpbkNvdW50ID0gd2luQ291bnQuZmlsdGVyKChtYXRjaCkgPT4ge1xuXHRcdFx0aWYgKG1hdGNoICE9PSAnbWF0Y2hlZCcpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9O1xuXHRcdHdpbk1lc3NhZ2Uobm9ybWFsTW9kZUFycmF5KTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4vLyBSRVNFVFxuJCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xuXHQkKCcuY291bnQnKS50ZXh0KFwiMFwiKTtcblx0JCgnYXNpZGUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG59KTtcblxuLy8gTUVOVVxuJCgnaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdCQoJ2FzaWRlJykudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG59KTtcblxuLy8gV0lOTklOR1xubGV0IHdpbk1lc3NhZ2UgPSAoYXJyYXkpID0+IHtcblx0bGV0IHRyaWVzID0gcGFyc2VJbnQoJCgnLmNvdW50JykudGV4dCgpKTtcblx0bGV0IHBhaXJzID0gYXJyYXkubGVuZ3RoIC8gMjtcblx0Y29uc29sZS5sb2codHJpZXMpO1xuXHRjb25zb2xlLmxvZyhwYWlycyk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRpZiAod2luQ291bnQubGVuZ3RoID09PSAoYXJyYXkubGVuZ3RoIC8gMikpIHtcblx0XHRcdHdpbkNvdW50ID0gd2luQ291bnQuZmlsdGVyKChtYXRjaCkgPT4ge1xuXHRcdFx0XHRpZiAobWF0Y2ggIT09ICdtYXRjaGVkJykge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAodHJpZXMgPT09IHBhaXJzKSB7XG5cdFx0XHRcdGFsZXJ0KGBDb25ncmF0dWxhdGlvbnMhIFlvdSB3b24gaW4gJHskKCcuY291bnQnKS50ZXh0KCl9IHRyaWVzISBBIHBlcmZlY3Qgcm91bmQhIFlvdSBhcmUgdGhlIGJlc3QhIWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWxlcnQoYENvbmdyYXR1bGF0aW9ucyEgWW91IHdvbiBpbiAkeyQoJy5jb3VudCcpLnRleHQoKX0gdHJpZXMhIFNlbGVjdCBhIGRpZmZpY3VsdHkgdG8gcGxheSBhZ2FpbiFgKTtcblx0XHRcdH07XG5cdFx0fTtcblx0fSwxMCk7XG59O1xuXG4vLyBJTklUXG5sZXQgaW5pdCA9ICgpID0+IHtcblx0c2h1ZmZsZUNhcmRzKGNhcmRBcnJheSk7XG5cdGNhcmRGbGlwKGNhcmRBcnJheSk7XG5cdHN3aXRjaFRvSGFyZE1vZGUoKTtcblx0c3dpdGNoVG9Ob3JtYWxNb2RlKCk7XG59O1xuXG5cbi8vIERPQ1VNRU5UIFJFQURZXG4kKGZ1bmN0aW9uKCkge1xuXHRpbml0KCk7XG59KTtcblxuXG5cblxuXG4iXX0=
