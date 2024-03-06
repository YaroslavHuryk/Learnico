document.addEventListener("DOMContentLoaded", function () {
  const clicksElements = [...document.querySelectorAll(".feedback_card")];

  function clickFunction() {
    clicksElements.forEach((element) => {
      element.classList.toggle("turn-right");
      console.log(element.classList);
    });
    clicksElements.forEach((element) => {
      element.classList.toggle("turn-left");
      console.log(element.classList);
    });
  }

  // function directionClick() {
  //   for (let index = 0; index < clicksElements.length; index++) {
  //     const element = array[index];
  //     if (index == 1) {
  //       element.classList.toggle(".left");
  //     }
  //     if (index == 3) {
  //       element.classList.toggle(".right");
  //     }
  //   }
  // }

  clicksElements.forEach((element) => {
    element.addEventListener("click", clickFunction);
  });
});
