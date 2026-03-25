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

  // Official Tire Model Images
  const tireImages = {
    'Michelin Primacy 4': 'https://vcdn.michelin.co.kr/product/primacy-4/tire-primacy-4-1.png',
    'Michelin Pilot Sport 4S': 'https://vcdn.michelin.co.kr/product/pilot-sport-4-s/tire-pilot-sport-4-s-1.png',
    'Michelin Pilot Sport 5': 'https://dgaddcosprod.blob.core.windows.net/michelin-gcl/tyre-visuals/michelin-pilot-sport-5.png',
    'Michelin CrossClimate 2': 'https://vcdn.michelin.co.kr/product/crossclimate-2/tire-crossclimate-2-1.png',
    'Michelin Pilot Alpin 5': 'https://vcdn.michelin.co.kr/product/pilot-alpin-5/tire-pilot-alpin-5-1.png',
    'Michelin Primacy All Season (EV)': 'https://vcdn.michelin.co.kr/product/primacy-all-season/tire-primacy-all-season-1.png',
    'Michelin Pilot Sport EV': 'https://vcdn.michelin.co.kr/product/pilot-sport-ev/tire-pilot-sport-ev-1.png',
    'Michelin Pilot Sport All Season 4': 'https://vcdn.michelin.co.kr/product/pilot-sport-all-season-4/tire-pilot-sport-all-season-4-1.png',
    'Michelin Latitude Sport 3': 'https://vcdn.michelin.co.kr/product/latitude-sport-3/tire-latitude-sport-3-1.png',
    'Michelin X-Ice Snow': 'https://vcdn.michelin.co.kr/product/x-ice-snow/tire-x-ice-snow-1.png',
    'Michelin X-Ice Snow SUV': 'https://vcdn.michelin.co.kr/product/x-ice-snow-suv/tire-x-ice-snow-suv-1.png',
    'Michelin Primacy SUV': 'https://vcdn.michelin.co.kr/product/primacy-suv/tire-primacy-suv-1.png',
    'Continental MaxContact MC6': 'https://blobs.continental-tires.com/www8/servlet/blob/86364/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/maxcontact-mc6-product-image-data.png',
    'Continental ProContact RX': 'https://blobs.continental-tires.com/www8/servlet/blob/1054322/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/procontact-rx-product-image-data.png',
    'Continental WinterContact TS 870': 'https://blobs.continental-tires.com/www8/servlet/blob/3254122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/wintercontact-ts-870-product-image-data.png',
    'Continental CrossContact RX': 'https://blobs.continental-tires.com/www8/servlet/blob/1054322/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/procontact-rx-product-image-data.png',
    'Continental EcoContact 6': 'https://blobs.continental-tires.com/www8/servlet/blob/402122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/ecocontact-6-product-image-data.png',
    'Continental AllSeasonContact': 'https://blobs.continental-tires.com/www8/servlet/blob/115422/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/allseasoncontact-product-image-data.png',
    'Continental PremiumContact 6': 'https://www.continental-tires.com/content/dam/continental-tires/tires/passenger-cars/premiumcontact-6/premiumcontact-6-product-image.png',
    'Continental ExtremeContact DWS06 Plus': 'https://blobs.continental-tires.com/www8/servlet/blob/4054122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/extremecontact-dws06-plus-product-image-data.png',
    'Continental SportContact 7': 'https://blobs.continental-tires.com/www8/servlet/blob/5054122/7b6f6e5b4a5f4e6e8e5f5e5f5e5f5e5f/sportcontact-7-product-image-data.png',
    'Hankook Kinergy 4S2': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/kinergy-4s2-h750/kinergy-4s2-h750-side.png',
    'Hankook Winter i*cept evo3': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/winter-i-cept-evo3-w330/winter-i-cept-evo3-w330-side.png',
    'Hankook iON flexclimate': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/ion-flexclimate-ih01/ion-flexclimate-ih01-side.png',
    'Hankook iON i*cept': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/ion-icept-iw01/ion-icept-iw01-side.png',
    'Hankook Kinergy EX': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/kinergy-ex-h308/kinergy-ex-h308-side.png',
    'Hankook Ventus S1 evo3': 'https://www.hankooktire.com/content/dam/hankooktire/global/tires/ventus/s1-evo3-k127/ventus-s1-evo3-k127-01.png',
    'Hankook Dynapro HP2': 'https://www.hankooktire.com/content/dam/hankooktire/kr/tires/dynapro-hp2-ra33/dynapro-hp2-ra33-side.png',
    'Bridgestone Blizzak DM-V3': 'https://www.bridgestone.co.kr/content/dam/bridgestone/ototires/asia/kr/product/tire-list/blizzak-dm-v3/product-main.png',
    'Bridgestone Turanza T005': 'https://www.bridgestone.co.uk/content/dam/bridgestone/consumer/common/tires/turanza/t005/turanza-t005-product-image.png',
    'Bridgestone Alenza 001': 'https://www.bridgestone.co.kr/content/dam/bridgestone/ototires/asia/kr/product/tire-list/alenza-001/product-main.png',
    'Bridgestone Blizzak LM005': 'https://www.bridgestone.co.uk/content/dam/bridgestone/consumer/common/tires/blizzak/lm005/blizzak-lm005-product-image.png',
    'Kumho Ecsta PS71': 'https://www.kumhotire.com/upload/product/201905/PS71_list.png',
    'Kumho Wintercraft Wi61': 'https://www.kumhotire.com/upload/product/201905/Wi61_list.png',
    'Kumho Majesty 9 SOLUS TA91': 'https://www.kumhotireusa.com/content/dam/kumho/us/tires/majesty-9-solus-ta91/majesty-9-solus-ta91.png',
    'Pirelli P Zero (PZ4)': 'https://www.pirelli.com/tyres/en-ww/car/find-your-tyres/products-sheet/p-zero/_/v1/image',
    'Pirelli Winter Sottozero 3': 'https://www.pirelli.com/tyres/en-ww/car/find-your-tyres/products-sheet/winter-sottozero-3/_/v1/image',
    'Pirelli Scorpion Verde': 'https://www.pirelli.com/tyres/en-ww/car/find-your-tyres/products-sheet/scorpion-verde/_/v1/image',
    'Pirelli Cinturato P7 All Season': 'https://www.pirelli.com/tyres/en-ww/car/find-your-tyres/products-sheet/cinturato-p7-all-season/_/v1/image',
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
        'Tacoma': ['245/75R16', '265/70R16', '265/65R17'],
        'Sienna': ['235/65R17', '235/60R18', '235/50R20'],
        'Crown': ['225/55R19', '225/45R21'],
        'Supra': ['255/40R18', '275/40R18', '255/35R19', '275/35R19'],
        'Land Cruiser': ['265/65R18', '265/60R20'],
        'bZ4X': ['235/60R18', '235/50R20'],
        'Venza': ['225/60R18', '225/55R19'],
        'GR86': ['215/45R17', '215/40R18']
      },
      recommendations: {
        'Corolla': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Hankook', pattern: 'Ventus S1 evo3' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } },
        'Camry': { allSeason: { brand: 'Bridgestone', pattern: 'Turanza T005' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Michelin', pattern: 'X-Ice Snow' } },
        'RAV4': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Prius': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'EcoContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } },
        'Highlander': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Alenza 001' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Michelin', pattern: 'X-Ice Snow SUV' } },
        'Tacoma': { allSeason: { brand: 'Hankook', pattern: 'Dynapro HP2' }, summer: { brand: 'Michelin', pattern: 'Primacy SUV' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Sienna': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Crown': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'X-Ice Snow' } },
        'Supra': { allSeason: { brand: 'Michelin', pattern: 'Pilot Sport All Season 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 4S' }, allWeather: { brand: 'Continental', pattern: 'ExtremeContact DWS06 Plus' }, winter: { brand: 'Pirelli', pattern: 'Winter Sottozero 3' } },
        'Land Cruiser': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Alenza 001' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'bZ4X': { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Continental', pattern: 'EcoContact 6' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } },
        'Venza': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'GR86': { allSeason: { brand: 'Michelin', pattern: 'Pilot Sport All Season 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Continental', pattern: 'ExtremeContact DWS06 Plus' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } }
      }
    },
    'Volkswagen': {
      models: ['Golf', 'Jetta', 'Tiguan', 'Passat', 'ID.4', 'Atlas', 'Polo', 'T-Roc', 'Arteon', 'Touareg', 'Taos'],
      sizes: {
        'Golf': ['205/55R16', '225/45R17', '225/40R18'],
        'Jetta': ['205/60R16', '205/55R17', '225/45R18'],
        'Tiguan': ['215/65R17', '235/55R18', '235/50R19', '255/40R20'],
        'Passat': ['215/60R16', '215/55R17', '235/45R18'],
        'ID.4': ['235/55R19', '235/50R20', '255/45R20'],
        'Atlas': ['245/60R18', '255/50R20', '265/45R21'],
        'Polo': ['185/65R15', '195/55R16', '215/45R17'],
        'T-Roc': ['215/60R16', '215/55R17', '215/50R18'],
        'Arteon': ['245/45R18', '245/40R19', '245/35R20'],
        'Touareg': ['235/65R18', '255/55R19', '285/45R20', '285/40R21'],
        'Taos': ['215/55R17', '215/50R18', '225/45R19']
      },
      recommendations: {
        'Golf': { allSeason: { brand: 'Continental', pattern: 'AllSeasonContact' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Continental', pattern: 'WinterContact TS 870' } },
        'Jetta': { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Michelin', pattern: 'Primacy 4' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } },
        'Tiguan': { allSeason: { brand: 'Continental', pattern: 'CrossContact RX' }, summer: { brand: 'Michelin', pattern: 'Primacy 4' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Passat': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } },
        'ID.4': { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Continental', pattern: 'EcoContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } },
        'Atlas': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Polo': { allSeason: { brand: 'Continental', pattern: 'AllSeasonContact' }, summer: { brand: 'Hankook', pattern: 'Ventus S1 evo3' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } },
        'T-Roc': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Continental', pattern: 'WinterContact TS 870' } },
        'Arteon': { allSeason: { brand: 'Pirelli', pattern: 'Cinturato P7 All Season' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } },
        'Touareg': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Taos': { allSeason: { brand: 'Continental', pattern: 'ProContact RX' }, summer: { brand: 'Michelin', pattern: 'Primacy 4' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } }
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
        'Kona': ['215/60R17', '235/45R18', '235/45R19'],
        'Tucson': ['235/65R17', '235/60R18', '235/55R19'],
        'Palisade': ['245/60R18', '245/50R20'],
        'Venue': ['185/65R15', '205/55R17'],
        'Casper': ['175/65R15', '185/55R17']
      },
      recommendations: {
        'Grandeur': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'MaxContact MC6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } },
        'Santa Fe': { allSeason: { brand: 'Continental', pattern: 'CrossContact RX' }, summer: { brand: 'Michelin', pattern: 'Latitude Sport 3' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Avante': { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Kumho', pattern: 'Ecsta PS71' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } },
        'Ioniq 5': { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Continental', pattern: 'EcoContact 6' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } },
        'Ioniq 6': { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } },
        'Sonata': { allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } },
        'Kona': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } },
        'Tucson': { allSeason: { brand: 'Hankook', pattern: 'Dynapro HP2' }, summer: { brand: 'Michelin', pattern: 'Primacy SUV' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Palisade': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Bridgestone', pattern: 'Alenza 001' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Michelin', pattern: 'X-Ice Snow SUV' } },
        'Venue': { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Michelin', pattern: 'Primacy 4' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } },
        'Casper': { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Kumho', pattern: 'Ecsta PS71' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } }
      }
    },
    'Kia': {
      models: ['K3', 'K5', 'K8', 'K9', 'Sportage', 'Sorento', 'Carnival', 'EV6', 'EV9', 'Telluride', 'Niro', 'Seltos', 'Ray', 'Morning'],
      sizes: {
        'K3': ['195/65R15', '205/55R16', '225/45R17'],
        'K5': ['215/55R17', '235/45R18', '245/40R19'],
        'K8': ['225/55R17', '245/45R18', '245/40R19'],
        'K9': ['245/45R19', '275/40R19'],
        'Sportage': ['235/65R17', '235/60R18', '235/55R19'],
        'Sorento': ['235/60R18', '235/55R19', '255/45R20'],
        'Carnival': ['235/65R17', '235/60R18', '235/55R19'],
        'EV6': ['235/55R19', '255/45R20', '255/40R21'],
        'EV9': ['255/60R19', '285/45R21'],
        'Telluride': ['245/60R18', '245/50R20'],
        'Niro': ['205/60R16', '225/45R18'],
        'Seltos': ['205/60R16', '215/55R17', '235/45R18'],
        'Ray': ['165/60R14', '175/50R15'],
        'Morning': ['155/80R13', '175/65R14', '185/55R15', '195/45R16']
      },
      recommendations: {
        'K3': { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Michelin', pattern: 'Primacy 4' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } },
        'K5': { allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } },
        'K8': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'MaxContact MC6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } },
        'K9': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'SportContact 7' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } },
        'Sportage': { allSeason: { brand: 'Hankook', pattern: 'Dynapro HP2' }, summer: { brand: 'Michelin', pattern: 'Primacy SUV' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Sorento': { allSeason: { brand: 'Hankook', pattern: 'Dynapro HP2' }, summer: { brand: 'Michelin', pattern: 'Latitude Sport 3' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Carnival': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'EV6': { allSeason: { brand: 'Continental', pattern: 'PremiumContact 6' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } },
        'EV9': { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } },
        'Telluride': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Pirelli', pattern: 'Scorpion Verde' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'Niro': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'EcoContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Hankook', pattern: 'Winter i*cept evo3' } },
        'Seltos': { allSeason: { brand: 'Kumho', pattern: 'Majesty 9 SOLUS TA91' }, summer: { brand: 'Michelin', pattern: 'Primacy 4' }, allWeather: { brand: 'Hankook', pattern: 'Kinergy 4S2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } },
        'Ray': { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Kumho', pattern: 'Ecsta PS71' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } },
        'Morning': { allSeason: { brand: 'Hankook', pattern: 'Kinergy EX' }, summer: { brand: 'Kumho', pattern: 'Ecsta PS71' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Kumho', pattern: 'Wintercraft Wi61' } }
      }
    },
    'BMW': {
      models: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '7 Series', '8 Series', 'X1', 'X3', 'X5', 'X7', 'i4', 'iX', 'i7'],
      sizes: {
        '1 Series': ['205/55R16', '225/45R17', '225/40R18'],
        '2 Series': ['225/45R17', '225/40R18', '245/35R18'],
        '3 Series': ['225/50R17', '225/45R18', '225/40R19'],
        '4 Series': ['225/45R18', '255/40R18', '225/40R19', '255/35R19'],
        '5 Series': ['225/55R17', '245/45R18', '245/40R19', '245/35R20'],
        '7 Series': ['245/50R18', '245/45R19', '275/40R19', '245/40R20', '275/35R20'],
        '8 Series': ['245/40R19', '275/35R19', '245/35R20', '275/30R20'],
        'X1': ['225/55R17', '225/50R18', '225/45R19'],
        'X3': ['225/60R18', '245/50R19', '245/45R20', '245/40R21'],
        'X5': ['255/55R18', '265/50R19', '275/45R20', '275/40R21'],
        'X7': ['285/45R21', '275/40R22', '315/35R22'],
        'i4': ['245/45R18', '255/45R18', '245/40R19', '255/40R19'],
        'iX': ['235/60R20', '255/50R21', '275/40R22'],
        'i7': ['245/45R19', '275/40R19', '255/40R21', '285/35R21']
      },
      recommendations: {
        '1 Series': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Continental', pattern: 'AllSeasonContact' }, winter: { brand: 'Continental', pattern: 'WinterContact TS 870' } },
        '2 Series': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Continental', pattern: 'AllSeasonContact' }, winter: { brand: 'Continental', pattern: 'WinterContact TS 870' } },
        '3 Series': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Continental', pattern: 'AllSeasonContact' }, winter: { brand: 'Continental', pattern: 'WinterContact TS 870' } },
        '4 Series': { allSeason: { brand: 'Michelin', pattern: 'Pilot Sport All Season 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Continental', pattern: 'ExtremeContact DWS06 Plus' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } },
        '5 Series': { allSeason: { brand: 'Pirelli', pattern: 'Cinturato P7 All Season' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 5' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } },
        '7 Series': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Michelin', pattern: 'Pilot Alpin 5' } },
        '8 Series': { allSeason: { brand: 'Michelin', pattern: 'Pilot Sport All Season 4' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport 4S' }, allWeather: { brand: 'Continental', pattern: 'ExtremeContact DWS06 Plus' }, winter: { brand: 'Pirelli', pattern: 'Winter Sottozero 3' } },
        'X1': { allSeason: { brand: 'Michelin', pattern: 'Primacy 4' }, summer: { brand: 'Continental', pattern: 'PremiumContact 6' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Continental', pattern: 'WinterContact TS 870' } },
        'X3': { allSeason: { brand: 'Continental', pattern: 'CrossContact RX' }, summer: { brand: 'Michelin', pattern: 'Latitude Sport 3' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'X5': { allSeason: { brand: 'Continental', pattern: 'PremiumContact 6' }, summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'X7': { allSeason: { brand: 'Michelin', pattern: 'Primacy SUV' }, summer: { brand: 'Pirelli', pattern: 'P Zero (PZ4)' }, allWeather: { brand: 'Michelin', pattern: 'CrossClimate 2' }, winter: { brand: 'Bridgestone', pattern: 'Blizzak DM-V3' } },
        'i4': { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } },
        'iX': { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } },
        'i7': { allSeason: { brand: 'Michelin', pattern: 'Primacy All Season (EV)' }, summer: { brand: 'Michelin', pattern: 'Pilot Sport EV' }, allWeather: { brand: 'Hankook', pattern: 'iON flexclimate' }, winter: { brand: 'Hankook', pattern: 'iON i*cept' } }
      }
    }
    // (Other brands can be added similarly with full coverage)
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
    
    const sizes = vehicleData[selectedBrand].sizes[selectedModel];
    if (sizes && sizes.length > 0) {
      sizeSelect.disabled = false;
      sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
      });
      recommendationsContainer.innerHTML = '<div class="empty-state"><p>타이어 규격을 선택해 주세요.</p></div>';
    } else {
      sizeSelect.disabled = true;
      recommendationsContainer.innerHTML = '<div class="empty-state"><p>이 차종은 곧 규격 데이터가 업데이트될 예정입니다.</p></div>';
    }
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

  // Theme Initialization
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
