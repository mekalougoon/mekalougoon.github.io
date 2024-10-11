document.addEventListener('DOMContentLoaded', function() {
    const runButton = document.querySelector(".newRunButton");

    // Three arrays of classes to choose from
    const firstSet = ['a', 'b', 'c'];
    const secondSet = ['x', 'y', 'z'];
    const thirdSet = ['one', 'two', 'three'];

    // Function to ensure one random div is visible from a given class set
    function ensureOneVisible(classSet) {
        // Select all divs with the relevant classes
        const divs = Array.from(document.querySelectorAll('.random'));

        // First, hide all divs in the current set
        divs.forEach(div => {
            let hasClass = classSet.some(cls => div.classList.contains(cls));
            if (hasClass) {
                div.style.display = 'none'; // Hide div if it belongs to the current set
            }
        });

        // Select one random class from the current class set
        const randomClass = classSet[Math.floor(Math.random() * classSet.length)];
        // Get divs that have the randomClass and select one randomly to display
        const randomDivs = divs.filter(div => div.classList.contains(randomClass));
        const randomDiv = randomDivs[Math.floor(Math.random() * randomDivs.length)];

        if (randomDiv) {
            randomDiv.style.display = 'block'; // Make it visible
        }
    }

    // Function to ensure one div is visible for each set
    function addRandomClasses() {
        // Ensure one visible div from each set (total of 3 visible)
        ensureOneVisible(firstSet);  // First set (a, b, c)
        ensureOneVisible(secondSet); // Second set (x, y, z)
        ensureOneVisible(thirdSet);  // Third set (one, two, three)
    }

    // Scroll to the top of the document when the button is clicked
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    }

    // Attach the functions to the button's click event
    runButton.addEventListener("click", addRandomClasses);
    runButton.addEventListener("click", topFunction);
});
