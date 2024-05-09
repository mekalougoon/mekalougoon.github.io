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

    // listener for drag/resize events
    window.addEventListener('resize', function() {
        sliders.forEach(function(slider) {
            var frame_1 = slider.querySelector('#frame-1');
            var frame_2 = slider.querySelector('#frame-2');
            frame_1.style.width = slider.offsetWidth + 'px';
            frame_2.style.width = slider.offsetWidth + 'px';
            var max_height = Math.max(frame_1.offsetHeight, frame_2.offsetHeight);
            slider.style.height = max_height + 'px';
            drags(slider.querySelector('.handle'), slider.querySelector('.resize'), slider);
        });
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
            var containerOffset = container.offsetLeft;
            var containerWidth = container.offsetWidth;
            var minLeft = containerOffset + 10;
            var maxLeft = containerOffset + containerWidth - dragWidth - 10;

            // handle drag movement
            function dragMove(e) {
                var moveX = e.pageX || e.touches[0].pageX;
                var leftValue = moveX + posX - dragWidth;

                // keep drag within container
                if (leftValue < minLeft) {
                    leftValue = minLeft;
                } else if (leftValue > maxLeft) {
                    leftValue = maxLeft;
                }

                // calculate and set new positions
                var widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';
                dragElement.style.left = widthValue;
                resizeElement.style.width = widthValue;
            }

            // stop drag
            function stopDrag() {
                dragElement.classList.remove('draggable');
                resizeElement.classList.remove('resizable');
                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('touchmove', dragMove);
                document.removeEventListener('mouseup', stopDrag);
                document.removeEventListener('touchend', stopDrag);
                document.removeEventListener('touchcancel', stopDrag);
            }

            // listeners for end drag/stop movement
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('touchmove', dragMove);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
            document.addEventListener('touchcancel', stopDrag);
            e.preventDefault();
        }

        // stop drag/stop event
        dragElement.addEventListener('mouseup', stopDrag);
        dragElement.addEventListener('touchend', stopDrag);
        dragElement.addEventListener('touchcancel', stopDrag);


        function stopDrag() {
            dragElement.classList.remove('draggable');
            resizeElement.classList.remove('resizable');
        }
    }
});
