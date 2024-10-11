document.addEventListener('DOMContentLoaded', function() {
    const runButton = document.querySelector(".newRunButton");

    // Three arrays of classes to choose from
    const firstSet = ['a', 'b', 'c'];
    const secondSet = ['x', 'y', 'z'];
    const thirdSet = ['one', 'two', 'three'];
    const allSets = firstSet.concat(secondSet, thirdSet); // Combine all sets for easier removal

    // Function to ensure only one class from firstSet is visible at a time
    function ensureOneVisible(divs) {
        // Hide all divs with class from firstSet
        divs.forEach(div => {
            firstSet.forEach(cls => div.classList.remove(cls)); // Remove all 'a', 'b', 'c'
            div.style.display = 'none'; // Hide all divs initially
        });

        // Select one random div to show with a random class from firstSet
        const randomDiv = divs[Math.floor(Math.random() * divs.length)];
        const randomClass1 = firstSet[Math.floor(Math.random() * firstSet.length)];

        randomDiv.classList.add(randomClass1); // Add one random class from firstSet
        randomDiv.style.display = 'block'; // Make it visible
    }

    // Function to add a combination of random classes to each div
    function addRandomClasses() {
        // Select all divs with class 'random'
        const divs = document.querySelectorAll('.random');

        // Ensure one visible div from firstSet
        ensureOneVisible(divs);

        // Apply random classes from secondSet and thirdSet to all divs
        divs.forEach(div => {
            // Remove only the classes from the secondSet and thirdSet
            secondSet.concat(thirdSet).forEach(cls => {
                if (div.classList.contains(cls)) {
                    div.classList.remove(cls);
                }
            });

            // Generate a random class from secondSet and thirdSet
            const randomClass2 = secondSet[Math.floor(Math.random() * secondSet.length)];
            const randomClass3 = thirdSet[Math.floor(Math.random() * thirdSet.length)];

            // Add the randomly selected classes from second and third sets
            div.classList.add(randomClass2, randomClass3);
        });
    }

    // When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

    // Set so this is called when the button is clicked
    runButton.addEventListener("click", addRandomClasses);
    runButton.addEventListener("click", topFunction);
});
