var count = 0;
//*selects start quiz button as decrement button*//
var decrementEl = document.querySelector(".start-button");
var countEl = document.querySelector("#count");

function setCounterText() {
    countEl.textContent = count;
}

decrementEl.addEventListener("click", function() {
    // Action will fire if count is greater than  0
    if (count > 0) {
      count--;
      setCounterText();
    }
  })