document.addEventListener("DOMContentLoaded", function () {
  let list = document.querySelector(".turnabout");
  let elements = document.querySelectorAll(".feedback_card");

  let l = 0;
  let r = 2;
  let rightElement = elements[r];
  let leftElement = elements[l];

  function rightDirectionClick() {
    elements = document.querySelectorAll(".feedback_card");
    if (l >= 0 && r >= 0) {
      removeListener();
      l = l + 2;
      r = r + 2;
      leftElement = elements[l];
      rightElement = elements[r];
      addListener();
    }
  }

  addListener();

  function leftDirectionClick() {
    elements = document.querySelectorAll(".feedback_card");
    if (l >= 1 && r >= 3) {
      removeListener();
      l = l - 2;
      r = r - 2;
      leftElement = elements[l];
      rightElement = elements[r];
      addListener();
    }
  }

  function rightHandleClick() {
    addFeedBackCard();
    rightDirectionClick();
    list.scrollBy({
      left: 926,
      behavior: "smooth",
    });
    // removeFeedBackCard();
  }
  function leftHandleClick() {
    leftDirectionClick();
    list.scrollBy({
      left: -926,
      behavior: "smooth",
    });
  }

  function addFeedBackCard() {
    elements.forEach((element) => {
      let newCard = element.cloneNode(true);
      list.appendChild(newCard);
    });
  }

  // function removeFeedBackCard() {
  //   for (i = 0; i <= 1; i++) {
  //     elements[i].style.display = "hidden";
  //   }
  // }

  function removeListener() {
    leftElement.removeEventListener("click", leftHandleClick);
    rightElement.removeEventListener("click", rightHandleClick);
  }

  function addListener() {
    rightElement.addEventListener("click", rightHandleClick);
    leftElement.addEventListener("click", leftHandleClick);
  }
});
