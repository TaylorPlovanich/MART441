$(document).ready(function () {
    $.getJSON("product-data.json", function(product) {
      const html = `
        <h2>${product.product_name}</h2>
        <img src="${product.image_url}" alt="${product.product_name} Image">
        <p><strong>Quantity:</strong> ${product.quantity}</p>
        <p><strong>Packaging:</strong> ${product.packaging}</p>
        <p class="nutrition-score"><strong>Nutri-Score Grade:</strong> ${product.nutrition_grade_fr.toUpperCase()} (Score: ${product.nutriscore_score})</p>
        <h4>Ingredients Label:</h4>
        <img src="${product.ingredients_image}" alt="Ingredients Image">
        <h4>Nutrition Facts:</h4>
        <img src="${product.nutrition_image}" alt="Nutrition Image">
      `;
      $("#productDisplay").html(html);
  
      // Call your jQuery plugin on the nutrition score
      $(".nutrition-score").highlightNutriScore(product.nutriscore_score);
    });
  });
  