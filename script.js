document.addEventListener("DOMContentLoaded", function () {
  let list = document.querySelector(".turnabout");
  let elements = document.querySelectorAll(".feedback_card");
  let l = 0;
  let r = 2;
  let counter = 0;
  let rightElement = elements[r];
  let leftElement = elements[l];

  elements.forEach((el) => {
    counter++;
    if (counter % 2 != 0 && counter < elements.length - 1 && counter > 1) {
      el.addEventListener("mouseenter", () => {
        el.classList.add("hovered");
      });
      el.addEventListener("mouseleave", () => {
        el.classList.remove("hovered");
      });
    }
  });

  list.addEventListener("mousedown", function (event) {
    // Перевіряємо, чи натиснута ліва кнопка миші (код 1)
    if (event.button === 0) {
      // Відміняємо подію прокручування за допомогою зажиму лівої клавіші миші
      window.addEventListener("mousemove", preventScrolling);
      window.addEventListener("mouseup", removePreventScrolling);
    }
  });
  function preventScrolling(event) {
    event.preventDefault();
  }
  function removePreventScrolling() {
    window.removeEventListener("mousemove", preventScrolling);
    window.removeEventListener("mouseup", removePreventScrolling);
  }

  cursorPointer(rightElement);
  rightElement.addEventListener("click", rightHandleClick);

  function rightDirectionClick() {
    elements = document.querySelectorAll(".feedback_card");
    removeListener();
    l = l + 2;
    r = r + 2;
    leftElement = elements[l];
    cursorPointer(leftElement);
    leftElement.addEventListener("click", leftHandleClick);

    if (r < elements.length - 1) {
      rightElement = elements[r];
      cursorPointer(rightElement);
      rightElement.addEventListener("click", rightHandleClick);
    }
  }

  function leftDirectionClick() {
    elements = document.querySelectorAll(".feedback_card");
    removeListener();
    l = l - 2;
    r = r - 2;
    if (l > 0) {
      leftElement = elements[l];
      cursorPointer(leftElement);
      leftElement.addEventListener("click", leftHandleClick);
    }
    rightElement = elements[r];
    cursorPointer(rightElement);
    rightElement.addEventListener("click", rightHandleClick);
  }

  function rightHandleClick() {
    list.scrollBy({
      left: 1200,
      behavior: "smooth",
    });
    rightDirectionClick();
  }
  function leftHandleClick() {
    list.scrollBy({
      left: -1200,
      behavior: "smooth",
    });
    leftDirectionClick();
  }

  function removeListener() {
    leftElement.removeEventListener("click", leftHandleClick);
    rightElement.removeEventListener("click", rightHandleClick);
  }

  function cursorPointer(someElement) {
    if (someElement !== undefined && someElement !== null) {
      someElement.style.cursor = "pointer";
    } else {
      console.log("Error! element is not defined");
    }
  }
});
