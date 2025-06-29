// titlecustom.js
export default function decorate(block) {
  // 1. Grab the three field placeholders
  const titleDiv = block.querySelector('div:nth-child(1)');
  const typeDiv  = block.querySelector('div:nth-child(2)');
  const colorDiv = block.querySelector('div:nth-child(3)');

  // 2. Extract their values
  const titleText = titleDiv.textContent.trim();
  const tag       = (typeDiv.textContent.trim() || 'h2').toLowerCase();
//   const color     = colorDiv.textContent.trim() || '#000000';
  const color     = '#FFFFFF';

  // 3. Create the heading element and apply color
  const heading = document.createElement(tag);
  heading.classList.add('titlecustom-heading');
  heading.textContent = titleText;
  heading.style.color   = color;

  // 4. Replace the entire block content with our heading
  block.innerHTML = '';
  block.appendChild(heading);
}
