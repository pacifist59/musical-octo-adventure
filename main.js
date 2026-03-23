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

  // Fetch Latest Lotto Numbers
  const fetchLatestLotto = async () => {
    const winningNumbersContainer = document.getElementById('winning-numbers');
    const drawNoSpan = document.getElementById('draw-no');

    // Calculate current draw number (Lotto 6/45 started on 2002-12-07)
    const startDate = new Date('2002-12-07T21:00:00+09:00');
    const today = new Date();
    const diff = today - startDate;
    const weekDiff = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;

    try {
      // Use AllOrigins as a CORS proxy to fetch from dhlottery.co.kr
      const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${weekDiff}`;
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = JSON.parse((await response.json()).contents);

      if (data.returnValue === 'fail') {
        // If current week results aren't out yet, try the previous week
        const prevUrl = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${weekDiff - 1}`;
        const prevResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(prevUrl)}`);
        const prevData = JSON.parse((await prevResponse.json()).contents);
        displayWinningNumbers(prevData, drawNoSpan, winningNumbersContainer);
      } else {
        displayWinningNumbers(data, drawNoSpan, winningNumbersContainer);
      }
    } catch (error) {
      console.error('Failed to fetch lotto results:', error);
      winningNumbersContainer.innerHTML = '<div class="winning-placeholder">Failed to load data.</div>';
    }
  };

  const displayWinningNumbers = (data, span, container) => {
    span.textContent = `#${data.drwNo}`;
    container.innerHTML = '';
    
    const numbers = [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6];
    numbers.forEach((num, index) => {
      const ball = document.createElement('div');
      ball.className = `win-ball color-${(index % 6) + 1}`;
      ball.textContent = num;
      container.appendChild(ball);
    });

    // Bonus Number
    const plus = document.createElement('span');
    plus.className = 'bonus-label';
    plus.textContent = '+';
    container.appendChild(plus);

    const bonusBall = document.createElement('div');
    bonusBall.className = 'win-ball color-6';
    bonusBall.textContent = data.bnusNo;
    container.appendChild(bonusBall);
  };

  fetchLatestLotto();

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
