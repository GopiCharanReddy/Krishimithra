// Array of predefined linear gradient patterns
const gradients = [
  'linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)', // Gradient 1
  'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient 2
  'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient 3
  'linear-gradient(to right, #ff9a8b, #ff6a00, #d77dff)', // Gradient 4
  'linear-gradient(to right, #00c6ff, #0072ff)', // Gradient 5
];

// Function to randomly select a gradient pattern
function applyRandomGradient() {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  document.body.style.background = gradients[randomIndex];
}

// Call the function to apply a random gradient when the page loads
applyRandomGradient();
