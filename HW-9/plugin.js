(function ($) {
    $.fn.highlightNutriScore = function(score) {
      return this.each(function () {
        let color;
        if (score <= 2) {
          color = "#4CAF50"; // green
        } else if (score <= 10) {
          color = "#FFEB3B"; // yellow
        } else if (score <= 18) {
          color = "#FF9800"; // orange
        } else {
          color = "#F44336"; // red
        }
        $(this).css({
          backgroundColor: color,
          padding: "10px",
          borderRadius: "8px",
          color: "#fff"
        });
      });
    };
  })(jQuery);
  