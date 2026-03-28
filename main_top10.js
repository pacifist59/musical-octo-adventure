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
    'Toyota': {
      models: ['Corolla', 'Camry', 'RAV4', 'Prius', 'Highlander', 'Tacoma', 'Sienna', 'Crown', 'Supra', 'Land Cruiser', 'bZ4X', 'Venza', 'GR86'],
      sizes: {
        'Corolla': ['195/65R15', '205/55R16', '225/45R17'],
        'Camry': ['215/55R17', '235/45R18', '235/40R19'],
        'RAV4': ['225/65R17', '225/60R18', '235/55R19'],
        'Prius': ['195/65R15', '195/50R19'],
        'Highlander': ['235/65R18', '235/55R20'],
        'Crown': ['225/55R19', '225/45R21'],
        'bZ4X': ['235/60R18', '235/50R20']
      },
      recommendations: {
        'Corolla': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy 4' },
          summer: { brand: 'Hankook', pattern: 'Ventus S1 evo3' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' }
        },
        'Camry': {
          allSeason: { brand: 'Bridgestone', pattern: 'Turanza T005' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' },
          allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' },
          winter: { brand: 'Michelin', pattern: 'X-Ice Snow' }
        },
        'RAV4': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' },
          summer: { brand: 'Continental', pattern: 'PremiumContact 6' },
          allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' },
          winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' }
        }
      }
    },
    'Volkswagen': {
      models: ['Golf', 'Jetta', 'Tiguan', 'Passat', 'ID.4', 'Atlas', 'Polo', 'T-Roc', 'Arteon', 'Touareg', 'Taos'],
      sizes: {
        'Golf': ['205/55R16', '225/45R17', '225/40R18'],
        'Jetta': ['205/60R16', '205/55R17', '225/45R18'],
        'Tiguan': ['215/65R17', '235/55R18', '235/50R19', '255/40R20'],
        'ID.4': ['235/55R19', '235/50R20', '255/45R20']
      },
      recommendations: {
        'Golf': {
          allSeason: { brand: 'Continental', pattern: 'AllSeasonContact' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' },
          allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' },
          winter: { brand: 'Continental', pattern: 'WinterContact TS 870' }
        },
        'ID.4': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' },
          summer: { brand: 'Continental', pattern: 'EcoContact 6' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Hankook', pattern: 'iON i*cept' }
        }
      }
    },
    'Hyundai': {
      models: ['Grandeur', 'Santa Fe', 'Avante', 'Ioniq 5', 'Ioniq 6', 'Sonata', 'Kona', 'Tucson', 'Palisade', 'Venue', 'Casper'],
      sizes: {
        'Grandeur': ['225/55R17', '245/45R18', '245/40R19'],
        'Santa Fe': ['235/60R18', '235/55R19', '255/45R20'],
        'Avante': ['195/65R15', '205/55R16', '225/45R17'],
        'Ioniq 5': ['235/55R19', '255/45R20'],
        'Ioniq 6': ['225/55R18', '245/40R20'],
        'Sonata': ['215/55R17', '235/45R18', '245/40R19'],
        'Tucson': ['235/65R17', '235/60R18', '235/55R19'],
        'Palisade': ['245/60R18', '245/50R20']
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
        },
        'Palisade': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' },
          summer: { brand: 'Bridgestone', pattern: 'Alenza 001' },
          allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' },
          winter: { brand: 'Michelin', pattern: 'X-Ice Snow SUV' }
        }
      }
    },
    'Kia': {
      models: ['K3', 'K5', 'K8', 'K9', 'Sportage', 'Sorento', 'Carnival', 'EV6', 'EV9', 'Telluride', 'Niro', 'Seltos', 'Ray', 'Morning'],
      sizes: {
        'K5': ['215/55R17', '235/45R18', '245/40R19'],
        'Sportage': ['235/65R17', '235/60R18', '235/55R19'],
        'Sorento': ['235/60R18', '235/55R19', '255/45R20'],
        'EV6': ['235/55R19', '255/45R20', '255/40R21'],
        'Carnival': ['235/65R17', '235/60R18', '235/55R19']
      },
      recommendations: {
        'K5': {
          allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' }
        },
        'EV6': {
          allSeason: { brand: 'Continental', pattern: 'PremiumContact 6' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' },
          allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' },
          winter: { brand: 'Hankook', pattern: 'iON i*cept' }
        },
        'Sorento': {
          allSeason: { brand: 'Hankook', pattern: 'Dynapro HP2' },
          summer: { brand: 'Michelin', pattern: 'Latitude Sport 3' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' }
        }
      }
    },
    'Ford': {
      models: ['F-150', 'Explorer', 'Mustang', 'Mach-E', 'Ranger', 'Bronco', 'Escape', 'Edge', 'Maverick', 'Expedition'],
      sizes: {
        'F-150': ['265/70R17', '275/65R18', '275/60R20'],
        'Explorer': ['255/65R18', '255/55R20', '275/45R21'],
        'Mustang': ['235/50R18', '255/40R19', '275/40R19'],
        'Mach-E': ['225/60R18', '225/55R19', '245/45R20']
      },
      recommendations: {
        'Mustang': {
          allSeason: { brand: 'Michelin', pattern: 'Pilot Sport All Season 4' },
          summer: { brand: 'Michelin', pattern: 'Pilot Sport 4S' },
          allWeather: { brand: 'Continental', pattern: 'ExtremeContact DWS06 Plus' },
          winter: { brand: 'Pirelli', pattern: 'Winter Sottozero 3' }
        },
        'Explorer': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' },
          summer: { brand: 'Pirelli', pattern: 'Scorpion Verde' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' }
        }
      }
    },
    'Chevrolet': {
      models: ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Suburban', 'Trailblazer', 'Traverse', 'Colorado', 'Corvette', 'Bolt EV'],
      sizes: {
        'Malibu': ['205/65R16', '225/55R17', '245/45R18', '245/40R19'],
        'Equinox': ['225/65R17', '225/60R18', '235/50R19'],
        'Traverse': ['255/65R18', '255/55R20']
      },
      recommendations: {
        'Malibu': {
          allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' },
          summer: { brand: 'Michelin', pattern: 'Primacy 4' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' }
        }
      }
    },
    'Honda': {
      models: ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'Odyssey', 'Passport', 'Ridgeline'],
      sizes: {
        'Civic': ['215/55R16', '215/50R17', '235/40R18'],
        'Accord': ['225/50R17', '235/45R18', '235/40R19'],
        'CR-V': ['235/65R17', '235/60R18', '235/55R19']
      },
      recommendations: {
        'Accord': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy 4' },
          summer: { brand: 'Hankook', pattern: 'Ventus S1 evo3' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Bridgestone', pattern: 'Blizzak LM005' }
        }
      }
    },
    'Nissan': {
      models: ['Sentra', 'Altima', 'Rogue', 'Pathfinder', 'Frontier', 'Leaf', 'Ariya', 'Z', 'Maxima'],
      sizes: {
        'Altima': ['215/60R16', '215/55R17', '235/45R19'],
        'Rogue': ['225/65R17', '235/60R18', '235/55R19'],
        'Leaf': ['205/55R16', '215/50R17']
      },
      recommendations: {
        'Rogue': {
          allSeason: { brand: 'Continental', pattern: 'CrossContact RX' },
          summer: { brand: 'Michelin', pattern: 'Primacy 4' },
          allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' },
          winter: { brand: 'Michelin', pattern: 'X-Ice Snow' }
        }
      }
    },
    'BMW': {
      models: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '7 Series', '8 Series', 'X1', 'X3', 'X5', 'X7', 'i4', 'iX', 'i7'],
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
    },
    'Mercedes-Benz': {
      models: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'EQB', 'EQE', 'EQS', 'G-Class'],
      sizes: {
        'C-Class': ['225/50R17', '225/45R18', '225/40R19'],
        'E-Class': ['225/55R17', '245/45R18', '245/40R19', '275/35R19'],
        'GLC': ['235/60R18', '235/55R19', '255/45R20']
      },
      recommendations: {
        'E-Class': {
          allSeason: { brand: 'Michelin', pattern: 'Primacy 4' },
          summer: { brand: 'Continental', pattern: 'SportContact 7' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' }
        },
        'GLC': {
          allSeason: { brand: 'Continental', pattern: 'CrossContact RX' },
          summer: { brand: 'Michelin', pattern: 'Latitude Sport 3' },
          allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' },
          winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' }
        }
      }
    },
    'Tesla': {
      models: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
      sizes: {
        'Model 3': ['235/45R18', '235/40R19', '235/35R20'],
        'Model Y': ['255/45R19', '255/40R20', '255/35R21'],
        'Model S': ['245/45R19', '245/35R21'],
        'Model X': ['265/50R19', '265/45R20', '265/35R22']
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

  // Theme Initialization (System Default + Persistence)
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const applyTheme = (isDark) => {
    if (isDark) {
      body.classList.add('dark-mode');
      themeToggle.innerHTML = '<span class="moon-icon">🌙</span>';
    } else {
      body.classList.remove('dark-mode');
      themeToggle.innerHTML = '<span class="sun-icon">☀️</span>';
    }
  };

  // Initial Theme Check
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
