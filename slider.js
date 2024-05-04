function initComparison() {
    var slider = document.getElementById("mySlider");
    var originalTexts = document.querySelectorAll('.text-original');
    var containerWidth = slider.parentElement.offsetWidth;
    var sliderWidth = slider.offsetWidth;
    var clicked = false;
    var initialOffset = (containerWidth - sliderWidth) / 2; // Initial position for the slider in the middle of the container

    slider.style.left = initialOffset + "px"; // Set the initial position of the slider

    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
        e.preventDefault();
        clicked = true;
        initialOffset = e.clientX || e.touches[0].clientX - slider.getBoundingClientRect().left;

        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
        clicked = false;
    }
    function slideMove(e) {
        if (!clicked) return;
        var currentOffset = e.clientX || e.touches[0].clientX - slider.getBoundingClientRect().left;
        var diff = initialOffset - currentOffset;
        var newPos = Math.min(Math.max(slider.offsetLeft - diff, 0), containerWidth - sliderWidth); // Limit slider movement to the container edges
    
        slider.style.left = newPos + "px";
    
        var sliderCenter = slider.offsetLeft + sliderWidth / 2; // Calculate the center of the slider
        var ratio = sliderCenter / containerWidth; // Calculate the ratio based on the slider center
    
        originalTexts.forEach(function (text) {
            text.style.width = containerWidth * ratio + "px";
        });
    
        initialOffset = currentOffset;
    }
    
}

document.addEventListener("DOMContentLoaded", function () {
    initComparison();
});
