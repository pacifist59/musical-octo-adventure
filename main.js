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
    'Continental EcoContact 6': 'https://blobs.continental-tires.com/www8/servlet/blob/1054122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/ecocontact-6-product-image-data.png',
    'Continental MaxContact MC6': 'https://blobs.continental-tires.com/www8/servlet/blob/1054122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/maxcontact-mc6-product-image-data.png',
    'Continental CrossContact RX': 'https://blobs.continental-tires.com/www8/servlet/blob/1054122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/crosscontact-rx-product-image-data.png',
    'Continental AllSeasonContact': 'https://blobs.continental-tires.com/www8/servlet/blob/1054122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/allseasoncontact-product-image-data.png',
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
    'Hankook Kinergy 4S2': 'https://www.hankooktire.com/kr/ko/tire/kinergy/4s2-h750.html',
    'Hankook Winter i*cept evo3': 'https://www.hankooktire.com/kr/ko/tire/winter-icept/evo3-w330.html',
    'Kumho Majesty 9 SOLUS TA91': 'https://www.kumhotire.com/kr/ko/tire/view.do?productSeq=2533',
    'Continental ProContact RX': 'https://www.continentaltire.com/products/procontact-rx'
  };

  const brandLinks = {
    'Michelin': 'https://www.michelin.co.kr',
    'Continental': 'https://www.continental-tires.com/kr/ko.html',
    'Hankook': 'https://www.hankooktire.com/kr/ko.html',
    'Kumho': 'https://www.kumhotire.com/kr/ko/index.do',
    'Bridgestone': 'https://www.bridgestone.co.kr',
    'Pirelli': 'https://www.pirelli.com/tyres/ko-kr/car/homepage',
    'Goodyear': 'https://www.goodyear.co.kr'
  };

  const vehicleData = {
    'Toyota': {
      models: {
        'Corolla': { years: { '2019-2025': { sizes: ['195/65R15', '205/55R16', '225/45R17'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Hankook', pattern: 'Ventus S1 evo3' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Camry': { years: { '2018-2025': { sizes: ['215/55R17', '235/45R18', '235/40R19'], recs: { allSeason: { brand: 'Bridgestone', pattern: 'Turanza T005' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Michelin', pattern: 'X-Ice Snow' } } } } },
        'RAV4': { years: { '2019-2025': { sizes: ['225/65R17', '225/60R18', '235/55R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Prius': { years: { '2023-2025': { sizes: ['195/60R17', '195/50R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Highlander': { years: { '2020-2025': { sizes: ['235/65R18', '235/55R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Sienna': { years: { '2021-2025': { sizes: ['235/65R17', '235/60R18', '235/50R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Turanza T005' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Tacoma': { years: { '2024-2025': { sizes: ['245/75R17', '265/70R17', '265/65R18'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'CrossContact RX' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Tundra': { years: { '2022-2025': { sizes: ['265/70R18', '265/60R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Alenza 001' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } }
      }
    },
    'Volkswagen': {
      models: {
        'Golf': { years: { '2020-2025': { sizes: ['205/55R16', '225/45R17', '225/40R18'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'ID.4': { years: { '2021-2025': { sizes: ['235/55R19', '235/50R20', '255/45R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Continental', pattern: 'EcoContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } } } } },
        'Tiguan': { years: { '2016-2025': { sizes: ['215/65R17', '235/55R18', '235/50R19', '255/40R20'], recs: { allSeason: { brand: 'Continental', pattern: 'CrossContact RX' }, summer: { brand: 'Michelin', pattern: 'Primacy 4' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Passat': { years: { '2015-2025': { sizes: ['215/60R16', '215/55R17', '235/45R18'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Atlas': { years: { '2018-2025': { sizes: ['245/60R18', '255/50R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } }
      }
    },
    'Hyundai': {
      models: {
        'Grandeur': { years: { '2023-2025 (GN7)': { sizes: ['225/55R18', '245/45R19', '245/40R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'MaxContact MC6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } }, '2016-2022 (IG)': { sizes: ['225/55R17', '245/45R18', '245/40R19'], recs: { allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Santa Fe': { years: { '2024-2025 (MX5)': { sizes: ['235/60R18', '255/45R20', '255/40R21'], recs: { allSeason: { brand: 'Continental', pattern: 'CrossContact RX' }, summer: { brand: 'Michelin', pattern: 'Latitude Sport 3' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } }, '2018-2023 (TM)': { sizes: ['235/60R18', '235/55R19', '255/45R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Avante': { years: { '2020-2025 (CN7)': { sizes: ['195/65R15', '205/55R16', '225/45R17'], recs: { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Kumho', pattern: 'Ecsta PS71' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } } } } },
        'Sonata': { years: { '2019-2025 (DN8)': { sizes: ['215/55R17', '235/45R18', '245/40R19'], recs: { allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Palisade': { years: { '2019-2025': { sizes: ['245/60R18', '245/50R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Alenza 001' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Michelin', pattern: 'X-Ice Snow SUV' } } } } },
        'Kona': { years: { '2023-2025 (SX2)': { sizes: ['215/60R17', '235/45R18', '235/45R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Tucson': { years: { '2020-2025 (NX4)': { sizes: ['235/65R17', '235/60R18', '235/55R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Staria': { years: { '2021-2025': { sizes: ['215/65R17', '235/55R18'], recs: { allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' }, summer: { brand: 'Michelin', pattern: 'Primacy 4' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Casper': { years: { '2021-2025': { sizes: ['155/80R13', '175/65R15', '185/55R17'], recs: { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Kumho', pattern: 'Ecsta PS71' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } } } } },
        'Ioniq 5': { years: { '2021-2025': { sizes: ['235/55R19', '255/45R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } } } } }
      }
    },
    'Kia': {
      models: {
        'Sorento': { years: { '2020-2025 (MQ4)': { sizes: ['235/60R18', '235/55R19', '255/45R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Sportage': { years: { '2021-2025 (NQ5)': { sizes: ['235/65R17', '235/60R18', '235/55R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'K5': { years: { '2019-2025 (DL3)': { sizes: ['215/55R17', '235/45R18', '245/40R19'], recs: { allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'EV6': { years: { '2021-2025': { sizes: ['235/55R19', '255/45R20', '255/40R21'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } } } } },
        'EV9': { years: { '2023-2025': { sizes: ['255/60R19', '285/45R21'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } } } } },
        'Carnival': { years: { '2020-2025 (KA4)': { sizes: ['235/65R17', '235/60R18', '235/55R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Turanza T005' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Ray': { years: { '2011-2025': { sizes: ['165/60R14', '175/50R15'], recs: { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Kumho', pattern: 'Ecsta PS71' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } } } } },
        'Telluride': { years: { '2019-2025': { sizes: ['245/60R18', '245/50R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } }
      }
    },
    'Ford': {
      models: {
        'F-150': { years: { '2021-2025': { sizes: ['265/70R17', '275/65R18', '275/60R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Alenza 001' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Explorer': { years: { '2020-2025': { sizes: ['255/65R18', '255/55R20', '275/45R21'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Pirelli', pattern: 'Scorpion Verde' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Mustang': { years: { '2024-2025': { sizes: ['235/50R18', '255/40R19', '275/40R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Pilot Sport All Season 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 4S' }, allWeather: { brand: 'Continental', pattern: 'ExtremeContact DWS06 Plus' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } } } },
        'Bronco': { years: { '2021-2025': { sizes: ['255/75R17', '265/70R17', '285/70R17'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Alenza 001' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } }
      }
    },
    'Chevrolet': {
      models: {
        'Traverse': { years: { '2018-2025': { sizes: ['255/65R18', '255/55R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Malibu': { years: { '2016-2024': { sizes: ['205/65R16', '225/55R17', '245/45R18'], recs: { allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Colorado': { years: { '2023-2025': { sizes: ['255/65R17', '265/65R18', '285/70R17'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Alenza 001' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Silverado': { years: { '2019-2025': { sizes: ['265/70R17', '265/65R18', '275/60R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Alenza 001' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } }
      }
    },
    'Honda': {
      models: {
        'Civic': { years: { '2022-2025': { sizes: ['215/55R16', '215/50R17', '235/40R18'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Hankook', pattern: 'Ventus S1 evo3' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Accord': { years: { '2023-2025': { sizes: ['225/50R17', '235/45R18', '235/40R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak LM005' } } } } },
        'CR-V': { years: { '2023-2025': { sizes: ['235/65R17', '235/60R18', '235/55R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Pilot': { years: { '2023-2025': { sizes: ['245/60R18', '255/50R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } }
      }
    },
    'Nissan': {
      models: {
        'Altima': { years: { '2019-2025': { sizes: ['215/60R16', '215/55R17', '235/45R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } },
        'Rogue': { years: { '2021-2025': { sizes: ['225/65R17', '235/60R18', '235/55R19'], recs: { allSeason: { brand: 'Continental', pattern: 'CrossContact RX' }, summer: { brand: 'Michelin', pattern: 'Primacy 4' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'Sentra': { years: { '2020-2025': { sizes: ['205/60R16', '215/50R17', '215/45R18'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Hankook', pattern: 'Ventus S1 evo3' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } } } } }
      }
    },
    'BMW': {
      models: {
        '3 Series': { years: { '2019-2025 (G20)': { sizes: ['225/50R17', '225/45R18', '225/40R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Continental', pattern: 'AllSeasonContact' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } } } },
        '5 Series': { years: { '2024-2025 (G60)': { sizes: ['245/45R19', '245/40R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } }, '2017-2023 (G30)': { sizes: ['225/55R17', '245/45R18'], recs: { allSeason: { brand: 'Pirelli', pattern: 'Cinturato P7 All Season' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } } } },
        'X5': { years: { '2019-2025 (G05)': { sizes: ['255/55R18', '265/50R19', '275/45R20'], recs: { allSeason: { brand: 'Continental', pattern: 'PremiumContact 6' }, summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } },
        'X3': { years: { '2018-2025 (G01)': { sizes: ['225/60R18', '245/50R19', '245/45R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } }
      }
    },
    'Mercedes-Benz': {
      models: {
        'C-Class': { years: { '2022-2025 (W206)': { sizes: ['225/50R17', '225/45R18', '225/40R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } } } },
        'E-Class': { years: { '2024-2025 (W214)': { sizes: ['225/55R18', '245/45R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'SportContact 7' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } }, '2016-2023 (W213)': { sizes: ['245/45R18', '245/40R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'MaxContact MC6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } } } },
        'S-Class': { years: { '2021-2025 (W223)': { sizes: ['255/45R19', '255/40R20', '255/35R21'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } } } } },
        'GLC': { years: { '2023-2025 (X254)': { sizes: ['235/60R18', '235/55R19', '255/45R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } } } } }
      }
    },
    'Tesla': {
      models: {
        'Model 3': { years: { '2024-2025 (Highland)': { sizes: ['235/45R18', '235/40R19'], recs: { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } } }, '2017-2023': { sizes: ['235/45R18', '235/40R19', '235/35R20'], recs: { allSeason: { brand: 'Michelin', pattern: 'Pilot Sport All Season 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 4S' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Pirelli', pattern: 'Winter Sottozero 3' } } } } },
        'Model Y': { years: { '2021-2025': { sizes: ['255/45R19', '255/40R20', '255/35R21'], recs: { allSeason: { brand: 'Continental', pattern: 'ProContact RX' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } } } } },
        'Cybertruck': { years: { '2024-2025': { sizes: ['285/65R20'], recs: { allSeason: { brand: 'Goodyear', pattern: 'Wrangler Territory RT' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } } } } }
      }
    }
  };

  const initBrands = () => {
    brandSelect.innerHTML = '<option value="" disabled selected>제조사 선택</option>';
    Object.keys(vehicleData).forEach(brand => {
      brandSelect.add(new Option(brand, brand));
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
    vehicleData[brand].models[model].years[year].sizes.forEach(size => {
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
    ['allSeason', 'summer', 'allWeather', 'winter'].forEach(catId => {
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
        <div class="tire-info">
          <div class="tire-brand">${tire.brand}</div>
          <div class="tire-pattern">${tire.pattern}</div>
          <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.3rem;">Size: ${size}</div>
        </div>
        <a href="${productUrl}" target="_blank" class="view-product-btn">상세보기</a>
      `;
      recommendationsContainer.appendChild(card);
    });
  };

  const applyTheme = (isDark) => {
    body.classList.toggle('dark-mode', isDark);
    themeToggle.innerHTML = isDark ? '🌙' : '☀️';
  };
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) applyTheme(true);
  themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  initBrands();
});
