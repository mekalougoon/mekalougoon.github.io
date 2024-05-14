document.addEventListener('DOMContentLoaded', function() {
    var sliders = document.querySelectorAll('.ba-slider');

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
            var dragWidth = dragElement.offsetWidth;
            var posX = dragElement.offsetLeft + dragWidth - startX;

            // handle drag movement
            function dragMove(e) {
                var moveX = e.pageX || e.touches[0].pageX;
                var leftValue = moveX + posX - dragWidth;

                // calculate and set new positions
                var containerRect = container.getBoundingClientRect();
                var containerLeft = containerRect.left;
                var containerRight = containerRect.right;
                var offset = 0.5; 
                var widthValue = (leftValue - containerLeft - offset) * 100 / container.offsetWidth + '%';

                // keep drag within container
                if (leftValue < containerLeft) {
                    widthValue = '0%';
                } else if (leftValue > containerRight - dragWidth) {
                    widthValue = (containerRight - containerLeft - dragWidth - offset) * 100 / container.offsetWidth + '%';
                }

                dragElement.style.left = widthValue;
                resizeElement.style.width = widthValue;
            }

            // listeners for drag movement
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('touchmove', dragMove);

            // stop drag
            function stopDrag() {
                dragElement.classList.remove('draggable');
                resizeElement.classList.remove('resizable');
                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('touchmove', dragMove);
            }

            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
            document.addEventListener('touchcancel', stopDrag);
            e.preventDefault();
        }
    }
});
