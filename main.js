document.addEventListener('DOMContentLoaded', () => {
  const brandSelect = document.getElementById('brand-select');
  const modelSelect = document.getElementById('model-select');
  const recommendationsContainer = document.getElementById('recommendations-container');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Mock Vehicle & Tire Data
  const vehicleData = {
    'Hyundai': {
      models: ['Grandeur', 'Santa Fe', 'Avante', 'Ioniq 5'],
      recommendations: {
        'Grandeur': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy 4' },
          summer: { brand: 'Continental', pattern: 'MaxContact MC6' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' }
        },
        'Santa Fe': {
          allSeason: { brand: 'Continental', pattern: 'CrossContact RX' },
          summer: { brand: 'Michelin', pattern: 'Latitude Sport 3' },
          allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2 X' },
          winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' }
        },
        'Avante': {
          allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' },
          summer: { brand: 'Kumho', pattern: 'Ecsta PS71' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' }
        },
        'Ioniq 5': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' },
          summer: { brand: 'Continental', pattern: 'EcoContact 6' },
          allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' },
          winter: { brand: 'Hankook', pattern: 'iON i*cept' }
        }
      }
    },
    'Tesla': {
      models: ['Model 3', 'Model Y'],
      recommendations: {
        'Model 3': {
          allSeason: { brand: 'Michelin', pattern: 'Pilot Sport All Season 4' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport 4S' },
          allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' },
          winter: { brand: 'Pirelli', pattern: 'Winter Sottozero 3' }
        },
        'Model Y': {
          allSeason: { brand: 'Continental', pattern: 'ProContact RX' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3 X' }
        }
      }
    },
    'BMW': {
      models: ['3 Series', '5 Series', 'X5'],
      recommendations: {
        '3 Series': {
          allSeason: { brand: 'Bridgestone', pattern: 'Turanza QuietTrack' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' },
          allWeather: { brand: 'Continental', pattern: 'AllSeasonContact' },
          winter: { brand: 'Continental', pattern: 'WinterContact TS 870' }
        },
        '5 Series': {
          allSeason: { brand: 'Pirelli', pattern: 'Cinturato P7 All Season' },
          summer: { brand: 'Goodyear', pattern: 'Eagle F1 Asymmetric 6' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Michelin', pattern: 'Alpin 6' }
        },
        'X5': {
          allSeason: { brand: 'Continental', pattern: 'PremiumContact 6' },
          summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate SUV' },
          winter: { brand: 'Bridgestone', pattern: 'Blizzak LM005' }
        }
      }
    },
    'Mercedes-Benz': {
      models: ['E-Class', 'S-Class', 'GLE'],
      recommendations: {
        'E-Class': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy Tour A/S' },
          summer: { brand: 'Continental', pattern: 'SportContact 7' },
          allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' },
          winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' }
        },
        'S-Class': {
          allSeason: { brand: 'Pirelli', pattern: 'P7 Blue' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport 4' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' }
        }
      }
    }
  };

  // Initialize Brand Dropdown
  const initBrands = () => {
    Object.keys(vehicleData).forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
  };

  initBrands();

  // Brand Change Event
  brandSelect.addEventListener('change', (e) => {
    const selectedBrand = e.target.value;
    modelSelect.innerHTML = '<option value="" disabled selected>차종을 고르세요</option>';
    modelSelect.disabled = false;

    vehicleData[selectedBrand].models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });

    // Clear recommendations
    recommendationsContainer.innerHTML = '<div class="empty-state"><p>차종을 선택하면 추천 타이어가 나타납니다.</p></div>';
  });

  // Model Change Event
  modelSelect.addEventListener('change', (e) => {
    const selectedBrand = brandSelect.value;
    const selectedModel = e.target.value;
    const recs = vehicleData[selectedBrand].recommendations[selectedModel];

    if (recs) {
      renderTireCards(recs);
    }
  });

  const renderTireCards = (recs) => {
    recommendationsContainer.innerHTML = '';
    
    const categories = [
      { id: 'allSeason', label: 'All Season', color: '#10b981' },
      { id: 'summer', label: 'Summer', color: '#f59e0b' },
      { id: 'allWeather', label: 'All-Weather', color: '#3b82f6' },
      { id: 'winter', label: 'Winter', color: '#6366f1' }
    ];

    categories.forEach((cat, index) => {
      const tire = recs[cat.id];
      if (!tire) return;

      const card = document.createElement('div');
      card.className = 'tire-card';
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <span class="category-badge" style="background: ${cat.color}">${cat.label}</span>
        <div class="tire-brand">${tire.brand}</div>
        <div class="tire-pattern">${tire.pattern}</div>
      `;
      
      recommendationsContainer.appendChild(card);
    });
  };

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
});
