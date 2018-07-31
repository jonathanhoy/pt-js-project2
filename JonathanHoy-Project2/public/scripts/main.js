(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

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

$(function () {

  var cardArray = ["bulbasaur", "bulbasaur", "charmander", "charmander", "squirtle", "squirtle", "pikachu", "pikachu"];

  var shuffledCardArray = shuffle(cardArray);
  var shuffledCardList = '';
  for (var i = 0; i < shuffledCardArray.length; i++) {
    shuffledCardList += "<li class=\"" + shuffledCardArray[i] + "\"></li>";
  }

  $('.cards').html(shuffledCardList);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUEsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFTLEtBQVQsRUFBZ0I7QUFDOUIsTUFBSSxlQUFlLE1BQU0sTUFBekI7QUFBQSxNQUFpQyxjQUFqQztBQUFBLE1BQWlELFdBQWpEOztBQUVBO0FBQ0EsU0FBTyxNQUFNLFlBQWIsRUFBMkI7O0FBRXpCO0FBQ0Esa0JBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQTNCLENBQWQ7QUFDQSxvQkFBZ0IsQ0FBaEI7O0FBRUE7QUFDQSxxQkFBaUIsTUFBTSxZQUFOLENBQWpCO0FBQ0EsVUFBTSxZQUFOLElBQXNCLE1BQU0sV0FBTixDQUF0QjtBQUNBLFVBQU0sV0FBTixJQUFxQixjQUFyQjtBQUNEOztBQUVELFNBQU8sS0FBUDtBQUNELENBakJEOztBQW1CQSxFQUFFLFlBQVc7O0FBRVosTUFBTSxZQUFZLENBQUMsV0FBRCxFQUFjLFdBQWQsRUFBMkIsWUFBM0IsRUFBeUMsWUFBekMsRUFBdUQsVUFBdkQsRUFBbUUsVUFBbkUsRUFBK0UsU0FBL0UsRUFBMEYsU0FBMUYsQ0FBbEI7O0FBRUEsTUFBSSxvQkFBb0IsUUFBUSxTQUFSLENBQXhCO0FBQ0EsTUFBSSxtQkFBbUIsRUFBdkI7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksa0JBQWtCLE1BQXRDLEVBQThDLEdBQTlDLEVBQW1EO0FBQ2xELHlDQUFrQyxrQkFBa0IsQ0FBbEIsQ0FBbEM7QUFDQTs7QUFFRCxJQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLGdCQUFqQjtBQUNBLENBWEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBNYXRjaCBHYW1lXG5cbi8vIDggY2FyZHMsIGZhY2UgZG93bi4gVXNlciBjYW4gZmxpcCB1cCB0byB0d28gY2FyZHMgYXQgYSB0aW1lIHRvIHJldmVhbCBpbWFnZSBvbiBmcm9udCBvZiBjYXJkLiBJZiBpbWFnZXMgbWF0Y2gsIHRoZSBjYXJkcyBzdGF5IGZhY2UgdXAuIElmIGltYWdlcyBkb24ndCBtYXRjaCwgY2FyZHMgYXJlIGZsaXBwZWQgZmFjZSBkb3duIGFuZCB0aGUgdXNlciBzZWxlY3RzIHR3byBuZXcgY2FyZHMuIE9iamVjdGl2ZSBpcyB0byBmaW5kIGFsbCBwYWlycyBvZiBtYXRjaGluZyBjYXJkcy5cblxuXG4vLyBMb2dpY1xuXG4vLyBBcnJheSBvZiBcImNhcmRzXCIgaXMgc2h1ZmZsZWQgYW5kIHRoZW4gaW5zdGVydGVkIGludG8gdGhlIERPTS4gVXNpbmcgQ1NTIHRvIGNyZWF0ZSBmbGlwcGFibGUgY2FyZHMsIHVzZXIgY2xpY2tzIG9uIHR3byBjYXJkcyB0byByZXZlYWwgaW1hZ2UuXG5cbmNvbnN0IHNodWZmbGUgPSBmdW5jdGlvbihhcnJheSkge1xuICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XG5cbiAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXG4gICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuXG4gICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4kKGZ1bmN0aW9uICgpe1xuXHRcblx0Y29uc3QgY2FyZEFycmF5ID0gW1wiYnVsYmFzYXVyXCIsIFwiYnVsYmFzYXVyXCIsIFwiY2hhcm1hbmRlclwiLCBcImNoYXJtYW5kZXJcIiwgXCJzcXVpcnRsZVwiLCBcInNxdWlydGxlXCIsIFwicGlrYWNodVwiLCBcInBpa2FjaHVcIl07XG5cdFxuXHRsZXQgc2h1ZmZsZWRDYXJkQXJyYXkgPSBzaHVmZmxlKGNhcmRBcnJheSk7XG5cdGxldCBzaHVmZmxlZENhcmRMaXN0ID0gJyc7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2h1ZmZsZWRDYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRzaHVmZmxlZENhcmRMaXN0ICs9IGA8bGkgY2xhc3M9XCIke3NodWZmbGVkQ2FyZEFycmF5W2ldfVwiPjwvbGk+YDtcblx0fVxuXG5cdCQoJy5jYXJkcycpLmh0bWwoc2h1ZmZsZWRDYXJkTGlzdCk7XG59KTsiXX0=
