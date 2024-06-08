document.addEventListener('DOMContentLoaded', function() {
    var sliders = document.querySelectorAll('.ba-slider');
    var sealShown = false; // flag to track if the seal has been shown
    var lastShownSealIndex = null; // track the index of the last shown seal
    var lastShownTextIndex = null; // track the index of the last shown text
    var lastShownKingdomIndex = null; // track the index of the last shown text
    var bufferPercentage = 2.5; // Buffer percentage from the edge

    // loop through each slider and get all frames inside slider
    sliders.forEach(function(slider) {
        var frame_1 = slider.querySelector('#frame-1');
        var frame_2 = slider.querySelector('#frame-2');

        // find and set width and height
        frame_1.style.width = slider.offsetWidth + 'px';
        frame_2.style.width = slider.offsetWidth + 'px';
        var max_height = Math.max(frame_1.offsetHeight, frame_2.offsetHeight);
        slider.style.height = max_height + 'px';

        // call drag functionality
        drags(slider.querySelector('.handle'), slider.querySelector('.resize'), slider);
    });

    // handle dragging on mouse or touch
    function drags(dragElement, resizeElement, container) {
        dragElement.addEventListener('mousedown', startDrag);
        dragElement.addEventListener('touchstart', startDrag);

        function startDrag(e) {
            dragElement.classList.add('draggable');
            resizeElement.classList.add('resizable');

            // get initial positions and offsets
            var startX = e.pageX || e.touches[0].pageX;
            var containerRect = container.getBoundingClientRect();
            var containerLeft = containerRect.left;
            var posX = startX - dragElement.getBoundingClientRect().left;

            // handle drag movement
            function dragMove(e) {
                var moveX = e.pageX || e.touches[0].pageX;
                var leftValue = moveX - containerLeft - posX;

                var dragWidth = dragElement.offsetWidth;
                var containerWidth = container.offsetWidth;
                var buffer = (containerWidth * bufferPercentage) / 100; // Buffer from the edge

                // keep drag within container
                if (leftValue < buffer) {
                    leftValue = buffer;
                } else if (leftValue > containerWidth - dragWidth - buffer) {
                    leftValue = containerWidth - dragWidth - buffer;
                }

                var widthValue = (leftValue * 100) / containerWidth + '%';

                dragElement.style.left = widthValue;
                resizeElement.style.width = widthValue;

                // Check if the drag element is within the buffer zone on the left or right edge and if the seal hasn't been shown yet
                if ((leftValue <= buffer || leftValue >= containerWidth - dragWidth - buffer) && !sealShown) {
                    showRandomSealAndText();
                    sealShown = true; // set the flag to true once the seal is shown
                } else if (leftValue > buffer && leftValue < containerWidth - dragWidth - buffer) {
                    sealShown = false; // reset the flag when the slider is dragged away from the edges
                }
            }

            // stop drag
            function stopDrag() {
                dragElement.classList.remove('draggable');
                resizeElement.classList.remove('resizable');
                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('touchmove', dragMove);
            }

            document.addEventListener('mousemove', dragMove);
            document.addEventListener('touchmove', dragMove);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
            document.addEventListener('touchcancel', stopDrag);
            e.preventDefault();
        }
    }

    // function to show a random seal and corresponding text, ensuring they're not the same as the last shown ones
    function showRandomSealAndText() {
        var seals = document.querySelectorAll('.seal');
        var journalImages = document.querySelectorAll('.journal');
        var journalImagesLeft = document.querySelectorAll('.journal-left');
        var journalImagesRight = document.querySelectorAll('.journal-right');
        var texts = document.querySelectorAll('.side-section.left p');
        var kingdoms = document.querySelectorAll('.side-section.right h2');
        
        // Hide all seals
        seals.forEach(seal => seal.style.display = 'none');
        // Hide all journal images
        journalImages.forEach(journalImages => journalImages.style.display = 'none');
        // Hide all texts
        texts.forEach(text => text.style.display = 'none');
        // Hide all kingdoms
        kingdoms.forEach(kingdoms => kingdoms.style.display = 'none');
        
        var randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * seals.length);
        } while (randomIndex === lastShownSealIndex);

        // set random image, regardless if it's been shown before

        var randomJournalIndex;
        var randomJournalIndex = Math.floor(Math.random() * journalImagesLeft.length);
        journalImagesLeft[randomJournalIndex].style.display = 'block';
        journalImagesRight[randomJournalIndex].style.display = 'block';

        // Show the randomly selected seal and corresponding texts
        seals[randomIndex].style.display = 'block';
        texts.forEach(text => {
            if (text.classList.contains(seals[randomIndex].classList[1])) {
                text.style.display = 'block';
            }
        });
        kingdoms.forEach(kingdoms => {
            if (kingdoms.classList.contains(seals[randomIndex].classList[1])) {
                kingdoms.style.display = 'block';
            }
        });

        lastShownSealIndex = randomIndex; // update the last shown seal index
    }
});
