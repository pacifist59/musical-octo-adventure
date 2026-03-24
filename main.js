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
      'recent-draws-title': '최근 5주 당첨 번호',
      'draw-suffix': '회',
      'loading': '최신 번호를 불러오는 중...',
      'error': '데이터를 불러오지 못했습니다.',
      'generate-btn': '행운의 번호 생성',
      'footer': '© 2026 뮤지컬 옥토 어드벤처'
    },
    en: {
      'title-highlight': 'Generator',
      'subtitle': 'Click the button to generate your 6 lucky numbers.',
      'recent-draws-title': 'Recent Winning Numbers',
      'draw-suffix': '',
      'loading': 'Loading latest numbers...',
      'error': 'Failed to load data.',
      'generate-btn': 'Generate Lucky Numbers',
      'footer': '© 2026 Musical Octo Adventure'
    },
    ja: {
      'title-highlight': '生成機',
      'subtitle': 'ボタンをクリックして6つのラッキーナンバーを生成하세요.',
      'recent-draws-title': '最近 5週間の当選번호',
      'draw-suffix': '回',
      'loading': '最新の番号を読み込み中...',
      'error': 'データの読み込み에 실패했습니다.',
      'generate-btn': 'ラッキーナンバー를 생성',
      'footer': '© 2026 ミュージカル・옥토・어드벤처'
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
    document.querySelector('footer p').textContent = translations[lang]['footer'];
    currentLang = lang;
    localStorage.setItem('lang', lang);
  };

  updateLanguage(currentLang);

  langSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
    fetchRecentLotto(); 
  });

  // Theme Toggle
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

  // Calculate Latest Draw Number
  const getLatestDrawNo = () => {
    const startDate = new Date('2002-12-07T21:00:00+09:00');
    const today = new Date();
    const diff = today - startDate;
    const weekDiff = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
    
    const currentDay = today.getDay(); 
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    
    // Saturday 20:45 is roughly the draw result time
    if (currentDay === 6 && (currentHour < 20 || (currentHour === 20 && currentMinute < 45))) {
      return weekDiff - 1;
    }
    return weekDiff;
  };

  // Improved Fetch with Multiple Proxy Fallbacks
  const fetchLottoWithFallback = async (drawNo) => {
    const targetUrl = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNo}`;
    
    // List of proxies to try
    const proxies = [
      (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
      (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
    ];

    for (const proxyFn of proxies) {
      try {
        const proxyUrl = proxyFn(targetUrl);
        const response = await fetch(proxyUrl);
        if (!response.ok) continue;

        const resData = await response.json();
        
        // Handle AllOrigins format (it wraps content in a 'contents' field)
        let data;
        if (resData.contents) {
          data = JSON.parse(resData.contents);
        } else {
          data = resData;
        }

        if (data && data.returnValue === 'success') {
          return {
            draw: data.drwNo,
            numbers: [
              data.drwtNo1, data.drwtNo2, data.drwtNo3, 
              data.drwtNo4, data.drwtNo5, data.drwtNo6,
              data.bnusNo
            ]
          };
        }
      } catch (e) {
        console.warn(`Proxy failed for draw ${drawNo}, trying next...`, e);
      }
    }
    return null;
  };

  const fetchRecentLotto = async () => {
    const listContainer = document.getElementById('winning-numbers-list');
    const latestDraw = getLatestDrawNo();
    
    try {
      listContainer.innerHTML = `<div class="winning-placeholder">${translations[currentLang]['loading']}</div>`;
      
      const drawPromises = [];
      for (let i = 0; i < 5; i++) {
        drawPromises.push(fetchLottoWithFallback(latestDraw - i));
      }

      const results = await Promise.all(drawPromises);
      const filteredResults = results.filter(res => res !== null);
      
      listContainer.innerHTML = '';
      if (filteredResults.length === 0) throw new Error('All proxies failed');

      filteredResults.forEach(data => {
        renderWinningRow(data, listContainer);
      });
    } catch (error) {
      console.error('Final fetch error:', error);
      listContainer.innerHTML = `<div class="winning-placeholder">${translations[currentLang]['error']}</div>`;
    }
  };

  const renderWinningRow = (data, container) => {
    const row = document.createElement('div');
    row.className = 'winning-row';

    const label = document.createElement('div');
    label.className = 'draw-label';
    label.textContent = `${data.draw}${translations[currentLang]['draw-suffix']}`;
    row.appendChild(label);

    const ballsContainer = document.createElement('div');
    ballsContainer.className = 'winning-numbers';

    const nums = data.numbers;
    for (let i = 0; i < 6; i++) {
      const ball = document.createElement('div');
      ball.className = `win-ball color-${(i % 6) + 1}`;
      ball.textContent = nums[i];
      ballsContainer.appendChild(ball);
    }

    const plus = document.createElement('span');
    plus.className = 'bonus-label';
    plus.textContent = '+';
    ballsContainer.appendChild(plus);

    const bonusBall = document.createElement('div');
    bonusBall.className = 'win-ball color-6';
    bonusBall.textContent = nums[6];
    ballsContainer.appendChild(bonusBall);

    row.appendChild(ballsContainer);
    container.appendChild(row);
  };

  fetchRecentLotto();

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
