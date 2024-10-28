document.addEventListener('DOMContentLoaded', function() {
    const runButton = document.querySelector(".newRunButton");

    // Three font classes to choose from
    const fonts = ['telma', 'array', 'hi'];

    // Headings to apply the fonts to
    const headings = document.querySelectorAll('.titletext h2');

    // five arrays of classes to choose from for div visibility
    const firstSet = ['a', 'b', 'c'];
    const secondSet = ['d', 'e', 'f'];
    const thirdSet = ['g', 'h', 'i'];
    const fourthSet = ['j', 'k', 'l'];
    const fifthSet = ['m', 'n', 'o'];
    const sixthSet = ['p', 'q', 'r'];

    // Function to ensure one random div is visible from a given class set
    function ensureOneVisible(classSet) {
        const divs = Array.from(document.querySelectorAll('.random'));

        divs.forEach(div => {
            let hasClass = classSet.some(cls => div.classList.contains(cls));
            if (hasClass) {
                div.style.display = 'none';
            }
        });

        const randomClass = classSet[Math.floor(Math.random() * classSet.length)];
        const randomDivs = divs.filter(div => div.classList.contains(randomClass));
        const randomDiv = randomDivs[Math.floor(Math.random() * randomDivs.length)];

        if (randomDiv) {
            randomDiv.style.display = 'block';
        }
    }

    // Function to ensure one div is visible for each set
    function addRandomClasses() {
        ensureOneVisible(firstSet);  
        ensureOneVisible(secondSet); 
        ensureOneVisible(thirdSet);  
        ensureOneVisible(fourthSet);  
        ensureOneVisible(fifthSet); 
        ensureOneVisible(sixthSet); 
        randomizeFonts(); // Randomize fonts on button click as well
    }

    // Function to assign random fonts to each heading
    function randomizeFonts() {
        headings.forEach(heading => {
            // Remove existing font classes
            fonts.forEach(font => heading.classList.remove(font));

            // Add a random font class
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            heading.classList.add(randomFont);
        });
    }

    // Randomize fonts on page load
    randomizeFonts();

    // Scroll to the top of the document when the button is clicked
    function topFunction() {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0; 
    }

    // Attach the functions to the button's click event
    runButton.addEventListener("click", addRandomClasses);
    runButton.addEventListener("click", topFunction);
});
