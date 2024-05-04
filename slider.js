// Initialises the comparison when DOM is fully loaded
function initComparison() {
    // Get the slider and containers
    var slider = document.getElementById("mySlider");
    var designerTexts = document.querySelectorAll(".text-designer");

    // Get widths of containers and slider
    var containerWidth = slider.parentElement.offsetWidth;
    var sliderWidth = slider.offsetWidth;

    // Check if slider is clicked
    var clicked = false;

    // Get and set initial position of the slider
    var initialOffset = (containerWidth - sliderWidth) / 2;
    slider.style.left = initialOffset + "px";

    // Event listeners for interactions
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    // Function triggered when interaction begins
    function slideReady(e) {
        e.preventDefault();
        clicked = true;

        // Calculate initial offset
        initialOffset =
            e.clientX || e.touches[0].clientX - slider.getBoundingClientRect().left;

        // Event listeners for slider movement
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }

    // Function triggered when interaction ends
    function slideFinish() {
        clicked = false;
    }

    // Function to handle slider movement
    function slideMove(e) {
        if (!clicked) return;

        // Calculate current offset
        var currentOffset =
            e.clientX || e.touches[0].clientX - slider.getBoundingClientRect().left;
        var diff = initialOffset - currentOffset;

        // Calculate new position
        var newPos = Math.min(
            Math.max(slider.offsetLeft - diff, 0),
            containerWidth - sliderWidth
        );
        slider.style.left = newPos + "px";

        // Calulate ration based on container width and slider size and update containers based on the sliders position
        var sliderCenter = slider.offsetLeft + sliderWidth / 2;
        var ratio = sliderCenter / containerWidth;
        designerTexts.forEach(function (container) {
            container.style.width = containerWidth * ratio + "px";
        });

        initialOffset = currentOffset;
    }
}

// Listener for DOM completion
document.addEventListener("DOMContentLoaded", function () {
    initComparison();
});
