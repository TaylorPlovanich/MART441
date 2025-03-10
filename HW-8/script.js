$(document).ready(function () {
    // === Arrays ===
    const images = [
      "https://via.placeholder.com/200x200/ff4444",
      "https://via.placeholder.com/200x200/44ff44",
      "https://via.placeholder.com/200x200/4444ff"
    ];
  
    const texts = [
      "Imagination is the gateway of reality",
      "Your senses tell you what is, not what can be",
      "Look inward"
    ];
  
    const shapes = ["circle", "square", "triangle"];
  
    let imageIndex = 0;
    let textIndex = 0;
    let shapeIndex = 0;
  
    // === Animate Image ===
    function switchImage() {
      $("#image").fadeOut(1000, function () {
        $("#image").attr("src", images[imageIndex]);
        moveRandom("#image");
        $("#image").fadeIn(1000);
        imageIndex = (imageIndex + 1) % images.length;
      });
    }
  
    // === Animate Text ===
    function switchText() {
      $("#text").fadeOut(1000, function () {
        $("#text").text(texts[textIndex]);
        moveRandom("#text");
        $("#text").fadeIn(1000);
        textIndex = (textIndex + 1) % texts.length;
      });
    }
  
    // === Animate Shape ===
    function switchShape() {
      const shape = shapes[shapeIndex];
      const shapeDiv = $("#shape");
  
      // Reset shape styles
      shapeDiv.removeClass().css({ display: "none" });
  
      // Assign new shape style
      if (shape === "circle") {
        shapeDiv.css({
          "border-radius": "50%",
          background: "cyan"
        });
      } else if (shape === "square") {
        shapeDiv.css({
          "border-radius": "0",
          background: "magenta"
        });
      } else if (shape === "triangle") {
        shapeDiv.css({
          width: "0",
          height: "0",
          background: "none",
          "border-left": "50px solid transparent",
          "border-right": "50px solid transparent",
          "border-bottom": "100px solid yellow"
        });
      }
  
      moveRandom("#shape");
      shapeDiv.fadeIn(1000);
  
      shapeIndex = (shapeIndex + 1) % shapes.length;
    }
  
    // === Move things randomly around the screen ===
    function moveRandom(selector) {
      const maxX = $(window).width() - 200;
      const maxY = $(window).height() - 200;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
  
      $(selector).animate({
        left: x + "px",
        top: y + "px"
      }, 1000);
    }
  
    // === Start all animations on intervals ===
    switchImage();
    switchText();
    switchShape();
  
    setInterval(switchImage, 4000);
    setInterval(switchText, 5000);
    setInterval(switchShape, 6000);
  });
  