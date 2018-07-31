(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Match Game

// 8 cards, face down. User can flip up to two cards at a time to reveal image on front of card. If images match, the cards stay face up. If images don't match, cards are flipped face down and the user selects two new cards. Objective is to find all pairs of matching cards.

// Logic

// Array of "cards" is shuffled and then insterted into the DOM.
"use strict";

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUE7O0FBRUE7O0FBRUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBNYXRjaCBHYW1lXG5cbi8vIDggY2FyZHMsIGZhY2UgZG93bi4gVXNlciBjYW4gZmxpcCB1cCB0byB0d28gY2FyZHMgYXQgYSB0aW1lIHRvIHJldmVhbCBpbWFnZSBvbiBmcm9udCBvZiBjYXJkLiBJZiBpbWFnZXMgbWF0Y2gsIHRoZSBjYXJkcyBzdGF5IGZhY2UgdXAuIElmIGltYWdlcyBkb24ndCBtYXRjaCwgY2FyZHMgYXJlIGZsaXBwZWQgZmFjZSBkb3duIGFuZCB0aGUgdXNlciBzZWxlY3RzIHR3byBuZXcgY2FyZHMuIE9iamVjdGl2ZSBpcyB0byBmaW5kIGFsbCBwYWlycyBvZiBtYXRjaGluZyBjYXJkcy5cblxuLy8gTG9naWNcblxuLy8gQXJyYXkgb2YgXCJjYXJkc1wiIGlzIHNodWZmbGVkIGFuZCB0aGVuIGluc3RlcnRlZCBpbnRvIHRoZSBET00uIl19
