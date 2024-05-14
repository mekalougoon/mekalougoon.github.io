document.addEventListener('DOMContentLoaded', function() {
  
  //  typing text animation

  var typed = new Typed(".typing", {
    strings: [
      "Software Developer",
      "Designer",
      "Games Developer",
      "Front-end Developer",
      "Fullstack Developer"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Software Developer",
      "Designer",
      "Games Developer",
      "Front-end Developer",
      "Fullstack Developer"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });
});

  // mobile alert
  function hide() {
    document.getElementById('alert').style.visibility = 'hidden';
}


// scrolling cards
document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.querySelector(".cards");
  const leftButton = document.querySelector(".left");
  const rightButton = document.querySelector(".right");
  const cards = document.querySelectorAll(".card");
  const currentCardElement = document.getElementById("current-card");
  const totalCardsElement = document.getElementById("total-cards");
  let currentIndex = 0;

  // function to update active card
  function updateActiveCard() {
    cards.forEach(card => card.classList.remove("active"));
    cards[currentIndex].classList.add("active");
  }

  // calculate scroll position to keep active card centered and fully visible
  function calculateScrollPosition() {
    const containerWidth = cardContainer.offsetWidth;
    const activeCardWidth = cards[currentIndex].offsetWidth;
    const scrollLeft = cards[currentIndex].offsetLeft;
    const thirdContainerWidth = containerWidth / 3;
    const halfActiveCardWidth = activeCardWidth / 2;
    
    if (scrollLeft < cardContainer.scrollLeft + halfActiveCardWidth) {
      cardContainer.scrollTo({
        left: scrollLeft - thirdContainerWidth + halfActiveCardWidth,
        behavior: "smooth"
      });
    } else if (scrollLeft + activeCardWidth > cardContainer.scrollLeft + containerWidth - halfActiveCardWidth) {
      cardContainer.scrollTo({
        left: scrollLeft + activeCardWidth - containerWidth + thirdContainerWidth,
        behavior: "smooth"
      });
    }
  }

  // update cards count

  function updateCount() {
    currentCardElement.textContent = currentIndex + 1;
    totalCardsElement.textContent = cards.length;
  }

  // event listener for left arrow
  function leftScroll() {
    if (currentIndex > 0) {
      currentIndex--;
      updateActiveCard();
      calculateScrollPosition();
      updateCount();
    }
  }

  // cvent listener for right arrow
  function rightScroll() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateActiveCard();
      calculateScrollPosition();
      updateCount();
    }
  }

  leftButton.addEventListener("click", leftScroll);
  rightButton.addEventListener("click", rightScroll);

  // initialize active card and scroll position
  updateActiveCard();
  calculateScrollPosition();
});

