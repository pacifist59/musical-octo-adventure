document.addEventListener('DOMContentLoaded', () => {
  const lottoDisplay = document.getElementById('lotto-display');
  const generateBtn = document.getElementById('generate-btn');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Theme Toggle Logic
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  const generateLottoNumbers = () => {
    const numbers = [];
    while (numbers.length < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    return numbers.sort((a, b) => a - b);
  };

  const displayNumbers = (numbers) => {
    lottoDisplay.innerHTML = '';
    
    numbers.forEach((num, index) => {
      const ball = document.createElement('div');
      ball.className = `ball color-${(index % 6) + 1}`;
      ball.textContent = num;
      ball.style.animationDelay = `${index * 0.1}s`;
      lottoDisplay.appendChild(ball);
    });
  };

  generateBtn.addEventListener('click', () => {
    // Add a small bounce effect to the button
    generateBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      generateBtn.style.transform = '';
      const luckyNumbers = generateLottoNumbers();
      displayNumbers(luckyNumbers);
    }, 100);
  });
});
