document.addEventListener('DOMContentLoaded', () => {
  const brandSelect = document.getElementById('brand-select');
  const modelSelect = document.getElementById('model-select');
  const yearSelect = document.getElementById('year-select');
  const sizeSelect = document.getElementById('size-select');
  const recommendationsContainer = document.getElementById('recommendations-container');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const categoryMeta = {
    allSeason: { label: 'All Season', color: '#10b981' },
    summer: { label: 'Summer', color: '#f59e0b' },
    allWeather: { label: 'All-Weather', color: '#3b82f6' },
    winter: { label: 'Winter', color: '#6366f1' }
  };

  const tireImages = {
    'Michelin Primacy 4': 'https://vcdn.michelin.co.kr/product/primacy-4/tire-primacy-4-1.png',
    'Michelin Pilot Sport 5': 'https://vcdn.michelin.co.kr/product/pilot-sport-5/tire-pilot-sport-5-1.png',
    'Michelin Pilot Sport 4S': 'https://vcdn.michelin.co.kr/product/pilot-sport-4-s/tire-pilot-sport-4-s-1.png',
    'Michelin CrossClimate 2': 'https://vcdn.michelin.co.kr/product/crossclimate-2/tire-crossclimate-2-1.png',
    'Michelin Pilot Alpin 5': 'https://vcdn.michelin.co.kr/product/pilot-alpin-5/tire-pilot-alpin-5-1.png',
    'Michelin Primacy SUV': 'https://vcdn.michelin.co.kr/product/primacy-suv/tire-primacy-suv-1.png',
    'Michelin Pilot Sport EV': 'https://vcdn.michelin.co.kr/product/pilot-sport-ev/tire-pilot-sport-ev-1.png',
    'Michelin Latitude Sport 3': 'https://vcdn.michelin.co.kr/product/latitude-sport-3/tire-latitude-sport-3-1.png',
    'Michelin X-Ice Snow': 'https://vcdn.michelin.co.kr/product/x-ice-snow/tire-x-ice-snow-1.png',
    'Michelin X-Ice Snow SUV': 'https://vcdn.michelin.co.kr/product/x-ice-snow-suv/tire-x-ice-snow-suv-1.png',
    'Michelin Primacy All Season (EV)': 'https://vcdn.michelin.co.kr/product/primacy-all-season/tire-primacy-all-season-1.png',
    'Michelin Pilot Sport All Season 4': 'https://vcdn.michelin.co.kr/product/pilot-sport-all-season-4/tire-pilot-sport-all-season-4-1.png',
    'Continental ProContact RX': 'https://blobs.continental-tires.com/www8/servlet/blob/1054322/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/procontact-rx-product-image-data.png',
    'Continental ExtremeContact DWS06 Plus': 'https://www.continentaltire.com/sites/default/files/styles/product_image_large/public/product-images/ExtremeContact_DWS06_Plus_Front.png',
    'Continental PremiumContact 6': 'https://www.continental-tires.com/content/dam/continental-tires/tires/passenger-cars/premiumcontact-6/premiumcontact-6-product-image.png',
    'Continental SportContact 7': 'https://blobs.continental-tires.com/www8/servlet/blob/5054122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/sportcontact-7-product-image-data.png',
    'Continental EcoContact 6': 'https://blobs.continental-tires.com/www8/servlet/blob/1054322/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/ecocontact-6-product-image-data.png',
    'Continental MaxContact MC6': 'https://blobs.continental-tires.com/www8/servlet/blob/1054322/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/maxcontact-mc6-product-image-data.png',
    'Continental CrossContact RX': 'https://blobs.continental-tires.com/www8/servlet/blob/1054322/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/crosscontact-rx-product-image-data.png',
    'Continental AllSeasonContact': 'https://blobs.continental-tires.com/www8/servlet/blob/1054322/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/allseasoncontact-product-image-data.png',
    'Hankook Ventus S1 evo3': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/ventus-s1-evo3-k127/ventus-s1-evo3-k127-side.png',
    'Hankook Kinergy 4S2': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/kinergy-4s2-h750/kinergy-4s2-h750-side.png',
    'Hankook Winter i*cept evo3': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/winter-i-cept-evo3-w330/winter-i-cept-evo3-w330-side.png',
    'Hankook iON flexclimate': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/ion-flexclimate-ih01/ion-flexclimate-ih01-side.png',
    'Hankook iON i*cept': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/ion-icept-iw01/ion-icept-iw01-side.png',
    'Hankook Kinergy EX': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/kinergy-ex-h308/kinergy-ex-h308-side.png',
    'Kumho Majesty 9 SOLUS TA91': 'https://www.kumhotire.com/upload/product/201905/TA91_list.png',
    'Kumho Ecsta PS71': 'https://www.kumhotire.com/upload/product/201905/PS71_list.png',
    'Kumho Wintercraft Wi61': 'https://www.kumhotire.com/upload/product/201905/Wi61_list.png',
    'Bridgestone Turanza T005': 'https://www.bridgestone.co.kr/content/dam/bridgestone/ototires/asia/kr/product/tire-list/turanza-t005/product-main.png',
    'Bridgestone Alenza 001': 'https://www.bridgestone.co.kr/content/dam/bridgestone/ototires/asia/kr/product/tire-list/alenza-001/product-main.png',
    'Bridgestone Blizzak DM-V3': 'https://www.bridgestone.co.kr/content/dam/bridgestone/ototires/asia/kr/product/tire-list/blizzak-dm-v3/product-main.png',
    'Bridgestone Blizzak LM005': 'https://www.bridgestone.co.kr/content/dam/bridgestone/ototires/asia/kr/product/tire-list/blizzak-lm005/product-main.png',
    'Pirelli P Zero (PZ4)': 'https://www.pirelli.com/tyres/en-ww/car/find-your-tyres/products-sheet/p-zero/_/v1/image',
    'Pirelli Cinturato P7 All Season': 'https://www.pirelli.com/tyres/en-ww/car/find-your-tyres/products-sheet/cinturato-p7-all-season/_/v1/image',
    'Pirelli Scorpion Verde': 'https://www.pirelli.com/tyres/en-ww/car/find-your-tyres/products-sheet/scorpion-verde/_/v1/image',
    'Pirelli Winter Sottozero 3': 'https://www.pirelli.com/tyres/en-ww/car/find-your-tyres/products-sheet/winter-sottozero-3/_/v1/image',
    'Goodyear Wrangler Territory RT': 'https://www.goodyear.com/content/dam/goodyear/en-us/tire-images/wrangler-territory-rt/wrangler-territory-rt-side.png',
    'Default': 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=400'
  };

  const tireLinks = {
    'Michelin Primacy 4': 'https://www.michelin.co.kr/auto/tyres/michelin-primacy-4',
    'Michelin Pilot Sport 5': 'https://www.michelin.co.kr/auto/tyres/michelin-pilot-sport-5',
    'Michelin CrossClimate 2': 'https://www.michelin.co.kr/auto/tyres/michelin-crossclimate-2',
    'Michelin Pilot Alpin 5': 'https://www.michelin.co.kr/auto/tyres/michelin-pilot-alpin-5',
    'Continental ProContact RX': 'https://www.continentaltire.com/products/procontact-rx',
    'Hankook Kinergy 4S2': 'https://www.hankooktire.com/kr/ko/tire/kinergy/4s2-h750.html',
    'Hankook Winter i*cept evo3': 'https://www.hankooktire.com/kr/ko/tire/winter-icept/evo3-w330.html',
    'Kumho Majesty 9 SOLUS TA91': 'https://www.kumhotire.com/kr/ko/tire/view.do?productSeq=2533'
  };

  const brandLinks = {
    'Michelin': 'https://www.michelin.co.kr',
    'Continental': 'https://www.continental-tires.com/kr/ko.html',
    'Hankook': 'https://www.hankooktire.com/kr/ko.html',
    'Kumho': 'https://www.kumhotire.com/kr/ko/index.do',
    'Bridgestone': 'https://www.bridgestone.co.kr',
    'Pirelli': 'https://www.pirelli.com/tyres/ko-kr/car/homepage'
  };

  const vehicleData = {
    'Hyundai': {
      models: {
        'Grandeur': {
          years: {
            '2023-2025 (GN7)': { sizes: ['225/55R18', '245/45R19', '245/40R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'MaxContact MC6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } },
            '2016-2022 (IG)': { sizes: ['225/55R17', '245/45R18', '245/40R19'], recs: { allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } }
          }
        },
        'Santa Fe': {
          years: {
            '2024-2025 (MX5)': { sizes: ['235/60R18', '255/45R20', '255/40R21'], recs: { allSeason: { brand: 'Continental', pattern: 'CrossContact RX' }, summer: { brand: 'Michelin', pattern: 'Latitude Sport 3' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } },
            '2018-2023 (TM)': { sizes: ['235/60R18', '235/55R19', '255/45R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } }
          }
        }
      }
    },
    'Tesla': {
      models: {
        'Model Y': {
          years: {
            '2021-2025': { sizes: ['255/45R19', '255/40R20', '255/35R21'], recs: { allSeason: { brand: 'Continental', pattern: 'ProContact RX' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } }
          }
        },
        'Model 3': {
          years: {
            '2024-2025 (Highland)': { sizes: ['235/45R18', '235/40R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } } },
            '2017-2023': { sizes: ['235/45R18', '235/40R19', '235/35R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Pilot Sport All Season 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 4S' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Pirelli', pattern: 'Winter Sottozero 3' } } }
          }
        }
      }
    },
    'BMW': {
      models: {
        '5 Series': {
          years: {
            '2024-2025 (G60)': { sizes: ['245/45R19', '245/40R20', '245/35R21'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } },
            '2017-2023 (G30)': { sizes: ['225/55R17', '245/45R18', '245/40R19'], recs: { allSeason: { brand: 'Pirelli', pattern: 'Cinturato P7 All Season' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } }
          }
        }
      }
    }
  };

  const initBrands = () => {
    Object.keys(vehicleData).forEach(brand => {
      const option = new Option(brand, brand);
      brandSelect.add(option);
    });
  };

  brandSelect.addEventListener('change', (e) => {
    const brand = e.target.value;
    modelSelect.innerHTML = '<option value="" disabled selected>차종 선택</option>';
    yearSelect.innerHTML = '<option value="" disabled selected>연도 선택</option>';
    sizeSelect.innerHTML = '<option value="" disabled selected>규격 선택</option>';
    modelSelect.disabled = false;
    yearSelect.disabled = sizeSelect.disabled = true;

    Object.keys(vehicleData[brand].models).forEach(model => {
      modelSelect.add(new Option(model, model));
    });
  });

  modelSelect.addEventListener('change', (e) => {
    const brand = brandSelect.value;
    const model = e.target.value;
    yearSelect.innerHTML = '<option value="" disabled selected>연도 선택</option>';
    sizeSelect.innerHTML = '<option value="" disabled selected>규격 선택</option>';
    yearSelect.disabled = false;
    sizeSelect.disabled = true;

    Object.keys(vehicleData[brand].models[model].years).forEach(year => {
      yearSelect.add(new Option(year, year));
    });
  });

  yearSelect.addEventListener('change', (e) => {
    const brand = brandSelect.value;
    const model = modelSelect.value;
    const year = e.target.value;
    sizeSelect.innerHTML = '<option value="" disabled selected>규격 선택</option>';
    sizeSelect.disabled = false;

    const data = vehicleData[brand].models[model].years[year];
    data.sizes.forEach(size => {
      sizeSelect.add(new Option(size, size));
    });
  });

  sizeSelect.addEventListener('change', (e) => {
    const brand = brandSelect.value;
    const model = modelSelect.value;
    const year = yearSelect.value;
    const recs = vehicleData[brand].models[model].years[year].recs;
    renderTireCards(recs, e.target.value);
  });

  const renderTireCards = (recs, size) => {
    recommendationsContainer.innerHTML = '';
    ['allSeason', 'summer', 'allWeather', 'winter'].forEach((catId, index) => {
      const tire = recs[catId];
      if (!tire) return;
      const meta = categoryMeta[catId];
      const fullName = `${tire.brand} ${tire.pattern}`;
      const imgUrl = tireImages[fullName] || tireImages['Default'];
      const productUrl = tireLinks[fullName] || brandLinks[tire.brand] || `https://www.google.com/search?q=${encodeURIComponent(fullName)}+tire`;

      const card = document.createElement('div');
      card.className = 'tire-card';
      card.innerHTML = `
        <span class="category-badge" style="background: ${meta.color}">${meta.label}</span>
        <div class="tire-image-wrapper">
          <img src="${imgUrl}" alt="${fullName}" class="tire-image" onerror="this.src='${tireImages['Default']}'">
        </div>
        <div class="tire-info" style="margin-bottom: 1rem;">
          <div class="tire-brand">${tire.brand}</div>
          <div class="tire-pattern">${tire.pattern}</div>
          <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.3rem;">Size: ${size}</div>
        </div>
        <a href="${productUrl}" target="_blank" class="view-product-btn">상세보기</a>
      `;
      recommendationsContainer.appendChild(card);
    });
  };

  const savedTheme = localStorage.getItem('theme');
  const applyTheme = (isDark) => {
    body.classList.toggle('dark-mode', isDark);
    themeToggle.innerHTML = isDark ? '🌙' : '☀️';
  };
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) applyTheme(true);
  themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
