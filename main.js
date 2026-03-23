document.addEventListener('DOMContentLoaded', () => {
  const lottoDisplay = document.getElementById('lotto-display');
  const generateBtn = document.getElementById('generate-btn');
  const themeToggle = document.getElementById('theme-toggle');
  const langSelect = document.getElementById('lang-select');
  const body = document.body;

  const translations = {
    ko: {
      'title-highlight': '생성기',
      'subtitle': '버튼을 눌러 6개의 행운 번호를 생성하세요.',
      'last-draw-title': '지난주 <span id="draw-no">---</span>회 당첨 번호',
      'loading': '최신 번호를 불러오는 중...',
      'error': '데이터를 불러오지 못했습니다.',
      'generate-btn': '행운의 번호 생성',
      'footer': '© 2026 뮤지컬 옥토 어드벤처'
    },
    en: {
      'title-highlight': 'Generator',
      'subtitle': 'Click the button to generate your 6 lucky numbers.',
      'last-draw-title': "Last Week's <span id=\"draw-no\">---</span> Draw",
      'loading': 'Loading latest numbers...',
      'error': 'Failed to load data.',
      'generate-btn': 'Generate Lucky Numbers',
      'footer': '© 2026 Musical Octo Adventure'
    },
    ja: {
      'title-highlight': '生成機',
      'subtitle': 'ボタンをクリックして6つのラッキーナンバー를 생성하세요.',
      'last-draw-title': '最新の当選番号 (<span id="draw-no">---</span>回)',
      'loading': '最新の番号を読み込み中...',
      'error': 'データの読み込みに 실패했습니다.',
      'generate-btn': 'ラッキーナンバーを生成',
      'footer': '© 2026 ミュージカル・オクト・アドベンチャー'
    }
  };

  // Theme & Language Init
  let currentLang = localStorage.getItem('lang') || 'ko';
  langSelect.value = currentLang;

  const updateLanguage = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    // Footer is a special case
    document.querySelector('footer p').textContent = translations[lang]['footer'];
    currentLang = lang;
    localStorage.setItem('lang', lang);
  };

  updateLanguage(currentLang);

  langSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
    fetchLatestLotto(); // Refresh draw number text in correct language
  });

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

  // Improved Fetch with Retry and Better Error Handling
  const fetchLatestLotto = async () => {
    const winningNumbersContainer = document.getElementById('winning-numbers');
    
    // Calculate current draw number
    const startDate = new Date('2002-12-07T21:00:00+09:00');
    const today = new Date();
    const diff = today - startDate;
    const weekDiff = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;

    try {
      // Try current week, if not released, try previous week
      let drawNo = weekDiff;
      let data = await fetchFromProxy(drawNo);
      
      if (!data || data.returnValue === 'fail') {
        drawNo -= 1;
        data = await fetchFromProxy(drawNo);
      }

      if (data && data.returnValue === 'success') {
        displayWinningNumbers(data, winningNumbersContainer);
      } else {
        throw new Error('API return fail');
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      winningNumbersContainer.innerHTML = `<div class="winning-placeholder">${translations[currentLang]['error']}</div>`;
    }
  };

  const fetchFromProxy = async (drawNo) => {
    const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNo}`;
    // Use a more reliable proxy or multiple fallback proxies
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}&timestamp=${Date.now()}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) return null;
    const json = await response.json();
    return JSON.parse(json.contents);
  };

  const displayWinningNumbers = (data, container) => {
    const drawNoSpan = document.getElementById('draw-no');
    if (drawNoSpan) drawNoSpan.textContent = data.drwNo;
    
    container.innerHTML = '';
    const numbers = [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6];
    numbers.forEach((num, index) => {
      const ball = document.createElement('div');
      ball.className = `win-ball color-${(index % 6) + 1}`;
      ball.textContent = num;
      container.appendChild(ball);
    });

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

  // Lotto Generation Logic
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
    generateBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      generateBtn.style.transform = '';
      const luckyNumbers = generateLottoNumbers();
      displayNumbers(luckyNumbers);
    }, 100);
  });
});
