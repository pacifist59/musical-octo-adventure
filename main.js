document.addEventListener('DOMContentLoaded', () => {
  const brandSelect = document.getElementById('brand-select');
  const modelSelect = document.getElementById('model-select');
  const sizeSelect = document.getElementById('size-select');
  const recommendationsContainer = document.getElementById('recommendations-container');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Category Icons/Colors and Sample Images
  const categoryMeta = {
    allSeason: { label: 'All Season', color: '#10b981', img: 'https://images.unsplash.com/photo-1578844541663-4711efaf361a?auto=format&fit=crop&q=80&w=400' },
    summer: { label: 'Summer', color: '#f59e0b', img: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=400' },
    allWeather: { label: 'All-Weather', color: '#3b82f6', img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=400' },
    winter: { label: 'Winter', color: '#6366f1', img: 'https://images.unsplash.com/photo-1486754735734-325b5831f3ad?auto=format&fit=crop&q=80&w=400' }
  };

  // Expanded Vehicle & Tire Data with Sizes
  const vehicleData = {
    'Hyundai': {
      models: ['Grandeur', 'Santa Fe', 'Avante', 'Ioniq 5'],
      sizes: {
        'Grandeur': ['225/55R17', '245/45R18', '245/40R19'],
        'Santa Fe': ['235/60R18', '235/55R19', '255/45R20'],
        'Avante': ['195/65R15', '205/55R16', '225/45R17'],
        'Ioniq 5': ['235/55R19', '255/45R20']
      },
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
      sizes: {
        'Model 3': ['235/45R18', '235/40R19', '235/35R20'],
        'Model Y': ['255/45R19', '255/40R20', '255/35R21']
      },
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
      sizes: {
        '3 Series': ['225/50R17', '225/45R18', '225/40R19'],
        '5 Series': ['225/55R17', '245/45R18', '245/40R19', '245/35R20'],
        'X5': ['255/55R18', '265/50R19', '275/45R20', '275/40R21']
      },
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
      sizes: {
        'E-Class': ['225/55R17', '245/45R18', '245/40R19'],
        'S-Class': ['255/45R18', '255/45R19', '255/40R20'],
        'GLE': ['255/50R19', '275/50R20', '275/45R21']
      },
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
    sizeSelect.innerHTML = '<option value="" disabled selected>규격을 고르세요</option>';
    modelSelect.disabled = false;
    sizeSelect.disabled = true;

    vehicleData[selectedBrand].models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });

    recommendationsContainer.innerHTML = '<div class="empty-state"><p>차종과 규격을 선택하면 추천 타이어가 나타납니다.</p></div>';
  });

  // Model Change Event
  modelSelect.addEventListener('change', (e) => {
    const selectedBrand = brandSelect.value;
    const selectedModel = e.target.value;
    
    sizeSelect.innerHTML = '<option value="" disabled selected>규격을 고르세요</option>';
    sizeSelect.disabled = false;

    const sizes = vehicleData[selectedBrand].sizes[selectedModel] || [];
    sizes.forEach(size => {
      const option = document.createElement('option');
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
    });

    recommendationsContainer.innerHTML = '<div class="empty-state"><p>타이어 규격을 선택해 주세요.</p></div>';
  });

  // Size Change Event
  sizeSelect.addEventListener('change', (e) => {
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;
    const recs = vehicleData[selectedBrand].recommendations[selectedModel];

    if (recs) {
      renderTireCards(recs, e.target.value);
    }
  });

  const renderTireCards = (recs, size) => {
    recommendationsContainer.innerHTML = '';
    
    const categories = ['allSeason', 'summer', 'allWeather', 'winter'];

    categories.forEach((catId, index) => {
      const tire = recs[catId];
      const meta = categoryMeta[catId];
      if (!tire) return;

      const card = document.createElement('div');
      card.className = 'tire-card';
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <span class="category-badge" style="background: ${meta.color}">${meta.label}</span>
        <div class="tire-image-wrapper">
          <img src="${meta.img}" alt="${tire.pattern}" class="tire-image">
        </div>
        <div class="tire-info">
          <div class="tire-brand">${tire.brand}</div>
          <div class="tire-pattern">${tire.pattern}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Size: ${size}</div>
        </div>
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
