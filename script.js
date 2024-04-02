document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector(".turnabout");
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
  //////////////////// малий скрол

  cursorPointer(rightElement);
  rightElement.addEventListener("click", rightHandleClick);

  function rightDirectionClick() {
    elements = document.querySelectorAll(".feedback_card");
    removeListener();
    elements[r].classList.remove("hovered");
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
    elements[l].classList.remove("hovered");
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
  ////великий скрол

  const allLinks = document.querySelectorAll("li[data-goto]");

  if (allLinks.length > 0) {
    allLinks.forEach((allLinks) => {
      allLinks.addEventListener("click", scrollToLink);
    });
  }

  function scrollToLink(event) {
    const link = event.target;

    const targetClass = link.dataset.goto;
    const gotoBlock = document.querySelector(targetClass);

    if (gotoBlock && targetClass) {
      const goLength =
        gotoBlock.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: goLength,
        behavior: "smooth",
      });
      event.preventDefault();
    }
  }

  // пошук

  const searchButton = document.querySelector(".search-link");
  const searchContainer = document.querySelector(".search-container");

  searchButton.addEventListener("click", hideSearchButton);

  function hideSearchButton() {
    searchButton.style.display = "none";
    const searchField = document.createElement("input");
    searchField.classList.add("search-input");
    searchField.setAttribute("type", "search");
    searchContainer.appendChild(searchField);
    searchField.addEventListener("keydown", pressEnter);
    function pressEnter(event) {
      if (event.key === "Enter") {
        const searchText = searchField.value;
        scrollToLinkTwo(searchText);
        searchField.style.display = "none";
        searchButton.style.display = "block";
      }
    }
  }

  const searchResult = {
    about: ".platform-container",
    courses: ".about-courses",
    home: ".start-container",
    blog: ".blog",
    contacts: ".start-learn",
  };

  function scrollToLinkTwo(value) {
    let gotoSearch;

    for (const key in searchResult) {
      if (value == key) {
        console.log(key);
        gotoSearch = document.querySelector(searchResult[key]);
        console.log(gotoSearch);
        break;
      }
    }
    if (gotoSearch) {
      const goLength =
        gotoSearch.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: goLength,
        behavior: "smooth",
      });
    }
  }
});
