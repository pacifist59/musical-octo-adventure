document.addEventListener('DOMContentLoaded', () => {
  const brandSelect = document.getElementById('brand-select');
  const modelSelect = document.getElementById('model-select');
  const sizeSelect = document.getElementById('size-select');
  const recommendationsContainer = document.getElementById('recommendations-container');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Category Meta (Colors/Labels)
  const categoryMeta = {
    allSeason: { label: 'All Season', color: '#10b981' },
    summer: { label: 'Summer', color: '#f59e0b' },
    allWeather: { label: 'All-Weather', color: '#3b82f6' },
    winter: { label: 'Winter', color: '#6366f1' }
  };

  // Official Tire Model Images (Representative High-Quality URLs)
  const tireImages = {
    'Michelin Primacy 4': 'https://vcdn.michelin.co.kr/product/primacy-4/tire-primacy-4-1.png',
    'Michelin Pilot Sport 4S': 'https://vcdn.michelin.co.kr/product/pilot-sport-4-s/tire-pilot-sport-4-s-1.png',
    'Michelin Pilot Sport 5': 'https://vcdn.michelin.co.kr/product/pilot-sport-5/tire-pilot-sport-5-1.png',
    'Michelin CrossClimate 2': 'https://vcdn.michelin.co.kr/product/crossclimate-2/tire-crossclimate-2-1.png',
    'Michelin Pilot Alpin 5': 'https://vcdn.michelin.co.kr/product/pilot-alpin-5/tire-pilot-alpin-5-1.png',
    'Michelin Primacy All Season (EV)': 'https://vcdn.michelin.co.kr/product/primacy-all-season/tire-primacy-all-season-1.png',
    'Michelin Pilot Sport EV': 'https://vcdn.michelin.co.kr/product/pilot-sport-ev/tire-pilot-sport-ev-1.png',
    'Continental MaxContact MC6': 'https://blobs.continental-tires.com/www8/servlet/blob/86364/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/maxcontact-mc6-product-image-data.png',
    'Continental ProContact RX': 'https://blobs.continental-tires.com/www8/servlet/blob/1054322/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/procontact-rx-product-image-data.png',
    'Continental WinterContact TS 870': 'https://blobs.continental-tires.com/www8/servlet/blob/3254122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/wintercontact-ts-870-product-image-data.png',
    'Hankook Kinergy 4S2': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/kinergy-4s2-h750/kinergy-4s2-h750-side.png',
    'Hankook Winter i*cept evo3': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/winter-i-cept-evo3-w330/winter-i-cept-evo3-w330-side.png',
    'Hankook iON flexclimate': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/ion-flexclimate-ih01/ion-flexclimate-ih01-side.png',
    'Hankook iON i*cept': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/ion-icept-iw01/ion-icept-iw01-side.png',
    'Bridgestone Blizzak DM-V3': 'https://www.bridgestone.co.kr/content/dam/bridgestone/ototires/asia/kr/product/tire-list/blizzak-dm-v3/product-main.png',
    'Kumho Ecsta PS71': 'https://www.kumhotire.com/upload/product/201905/PS71_list.png',
    'Pirelli P Zero (PZ4)': 'https://www.pirelli.com/tyres/en-ww/car/find-your-tyres/products-sheet/p-zero/_/v1/image',
    'Default': 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=400'
  };

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
          allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' },
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
          winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' }
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
          allSeason: { brand: 'Michelin', pattern: 'Primacy 4' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' },
          allWeather: { brand: 'Continental', pattern: 'AllSeasonContact' },
          winter: { brand: 'Continental', pattern: 'WinterContact TS 870' }
        },
        '5 Series': {
          allSeason: { brand: 'Pirelli', pattern: 'Cinturato P7 All Season' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' }
        },
        'X5': {
          allSeason: { brand: 'Continental', pattern: 'PremiumContact 6' },
          summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' }
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

      const fullName = `${tire.brand} ${tire.pattern}`;
      const imgUrl = tireImages[fullName] || tireImages['Default'];

      const card = document.createElement('div');
      card.className = 'tire-card';
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <span class="category-badge" style="background: ${meta.color}">${meta.label}</span>
        <div class="tire-image-wrapper">
          <img src="${imgUrl}" alt="${fullName}" class="tire-image" onerror="this.src='${tireImages['Default']}'">
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
