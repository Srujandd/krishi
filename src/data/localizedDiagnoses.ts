import { DiagnosisReport, SupportedLanguage } from '../types/farm';

type LocalizedReportFields = Pick<
  DiagnosisReport,
  | 'cropName'
  | 'diseaseName'
  | 'summary'
  | 'symptoms'
  | 'organicRemedies'
  | 'chemicalRemedies'
  | 'preventiveSteps'
>;

export const BASE_DIAGNOSES: Record<string, Omit<DiagnosisReport, 'id' | 'timestamp'>> = {
  groundnut_tikka: {
    cropName: 'Groundnut (Arachis hypogaea)',
    scientificName: 'Arachis hypogaea',
    diseaseName: 'Tikka Leaf Spot (Early & Late Cercospora)',
    pathogenName: 'Cercospora arachidicola / Phaeoisariopsis personata',
    confidence: 96.4,
    severity: 'high',
    sampleId: 'groundnut_tikka',
    inferenceEngine: 'tflite-edge',
    latencyMs: 42,
    summary:
      'Circular dark-brown necrotic lesions surrounded by bright yellow halos on lower and middle leaflets, accelerating premature defoliation during pegging.',
    symptoms: [
      'Circular 2–6 mm dark brown spots on upper leaf surface with distinct yellow chlorotic rings',
      'Velvety carbon-black conidial tufts on the underside of older leaflets',
      'Premature leaflet shedding reducing pod filling by 25–40% if untreated',
    ],
    organicRemedies: [
      'Foliar spray of Trichoderma viride bio-formulation at 5 g per liter of water during evening hours',
      'Apply 5% Neem Seed Kernel Extract (NSKE) mixed with 1 ml natural soap sticker per liter',
      'Use fermented buttermilk + cow urine foliar wash (1:10 dilution) at 10-day intervals',
    ],
    chemicalRemedies: [
      'Spray Hexaconazole 5% EC at 2.0 ml per liter of water (400 ml in 200 L water per acre)',
      'Alternate with Mancozeb 75% WP at 2.5 g per liter or Carbendazim 12% + Mancozeb 63% WP at 2 g/L',
      'Ensure thorough wetting of lower canopy foliage using hollow-cone nozzle',
    ],
    preventiveSteps: [
      'Seed treatment with Trichoderma harzianum (10 g/kg seed) prior to monsoon sowing',
      'Maintain 45 cm x 10 cm row spacing to improve air circulation and reduce canopy humidity',
      'Remove volunteer groundnut plants and deep-plough crop residue after harvest',
    ],
    dosage: {
      chemicalName: 'Hexaconazole 5% EC / Mancozeb 75% WP',
      organicName: 'Trichoderma viride 1.5% WP + Neem Extract',
      chemicalPerLiterMl: 2.0,
      organicPerLiterMl: 5.0,
      waterLitersPerAcre: 200,
      applicationIntervalDays: 12,
      safetyIntervalDays: 21,
    },
  },
  cotton_curl: {
    cropName: 'Bt Cotton (Gossypium hirsutum)',
    scientificName: 'Gossypium hirsutum',
    diseaseName: 'Cotton Leaf Curl Begomovirus (CLCuV)',
    pathogenName: 'Begomovirus transmitted by Whitefly (Bemisia tabaci)',
    confidence: 94.8,
    severity: 'moderate',
    sampleId: 'cotton_curl',
    inferenceEngine: 'tflite-edge',
    latencyMs: 38,
    summary:
      'Upward and downward cupping of young terminal leaves accompanied by dark green vein thickening and leaf-like enations on the underside.',
    symptoms: [
      'Severe upward curling and crinkling of apical leaves with leathery texture',
      'Dark green thickened veins with cup-shaped laminar outgrowths (enations) underneath',
      'Stunted internode elongation and honeydew/whitefly nymphs visible on abaxial surface',
    ],
    organicRemedies: [
      'Install 15 yellow sticky traps per acre at 15 cm above crop canopy height to trap adult whiteflies',
      'Spray Azadirachtin 10,000 ppm (1% EC) at 3 ml per liter of water with Karanj oil emulsifier',
      'Apply Verticillium lecanii entomopathogenic fungus at 5 g per liter during humid evenings',
    ],
    chemicalRemedies: [
      'Foliar application of Flonicamid 50% WG at 0.4 g per liter or Diafenthiuron 50% WP at 1.2 g/L',
      'For severe whitefly nymph load, spray Pyriproxyfen 10% EC at 2.0 ml per liter of water',
      'Avoid synthetic pyrethroids which trigger whitefly resurgence',
    ],
    preventiveSteps: [
      'Eradicate alternate weed hosts such as Kanghi buti (Abutilon) and Peeli buti around field bunds',
      'Avoid excessive urea top-dressing which produces succulent foliage attractive to sucking pests',
      'Plant barrier rows of pearl millet (Bajra) or maize around the cotton perimeter',
    ],
    dosage: {
      chemicalName: 'Diafenthiuron 50% WP / Pyriproxyfen 10% EC',
      organicName: 'Azadirachtin 10,000 ppm + Verticillium lecanii',
      chemicalPerLiterMl: 1.5,
      organicPerLiterMl: 4.0,
      waterLitersPerAcre: 200,
      applicationIntervalDays: 10,
      safetyIntervalDays: 15,
    },
  },
  tomato_blight: {
    cropName: 'Tomato (Solanum lycopersicum)',
    scientificName: 'Solanum lycopersicum',
    diseaseName: 'Early Blight Target Spot',
    pathogenName: 'Alternaria solani',
    confidence: 97.2,
    severity: 'high',
    sampleId: 'tomato_blight',
    inferenceEngine: 'tflite-edge',
    latencyMs: 39,
    summary:
      'Characteristic bullseye concentric ring lesions starting on older lower leaves, progressing upward with yellowing and stem collar girdling.',
    symptoms: [
      'Dark brown necrotic lesions with target-like concentric rings up to 12 mm in diameter',
      'Diffuse yellow chlorosis surrounding lesions leading to dry, papery leaf margins',
      'Sunken dark cankers on stems and leathery black rot near the fruit calyx',
    ],
    organicRemedies: [
      'Spray Pseudomonas fluorescens liquid formulation at 5 ml per liter of water across foliage',
      'Apply Copper Oxychloride (organic-approved 50% WP) at 2.5 g/L or sour buttermilk + copper wash',
      'Prune infected bottom leaves up to 20 cm from soil level and apply neem cake mulch',
    ],
    chemicalRemedies: [
      'Spray Azoxystrobin 23% SC at 1.0 ml per liter or Chlorothalonil 75% WP at 2.0 g per liter',
      'Follow up after 12 days with Mancozeb 75% WP at 2.5 g per liter to prevent resistance',
      'Add 0.5 ml silicone spreader per liter for uniform leaf coverage',
    ],
    preventiveSteps: [
      'Use drip irrigation instead of overhead sprinklers to keep leaf surfaces dry',
      'Stake plants vertically to prevent lower foliage from touching damp soil',
      'Practice a 2-year crop rotation with non-solanaceous crops like marigold or legumes',
    ],
    dosage: {
      chemicalName: 'Azoxystrobin 23% SC / Chlorothalonil 75% WP',
      organicName: 'Pseudomonas fluorescens + Bio-Copper',
      chemicalPerLiterMl: 1.5,
      organicPerLiterMl: 5.0,
      waterLitersPerAcre: 200,
      applicationIntervalDays: 10,
      safetyIntervalDays: 7,
    },
  },
  rice_blast: {
    cropName: 'Paddy / Rice (Oryza sativa)',
    scientificName: 'Oryza sativa',
    diseaseName: 'Leaf & Neck Blast',
    pathogenName: 'Magnaporthe oryzae (Pyricularia oryzae)',
    confidence: 93.5,
    severity: 'moderate',
    sampleId: 'rice_blast',
    inferenceEngine: 'tflite-edge',
    latencyMs: 44,
    summary:
      'Spindle-shaped lesions with greyish-white centers and reddish-brown necrotic borders on leaf blades, risking panicle neck rot.',
    symptoms: [
      'Diamond or boat-shaped spots with grey centers and dark brown margins on leaves',
      'Coalescing lesions causing complete drying of leaf blades during tillering stage',
      'Blackish-brown girdling at the panicle neck node leading to chaffy grains',
    ],
    organicRemedies: [
      'Foliar spray of Pseudomonas fluorescens talc formulation at 5 g per liter of water',
      'Apply fermented Panchagavya (30 ml/L) mixed with Bacillus subtilis bio-fungicide',
      'Maintain thin water film instead of deep stagnation during cloudy humid spells',
    ],
    chemicalRemedies: [
      'Spray Tricyclazole 75% WP at 0.6 g per liter of water (120 g in 200 L water per acre)',
      'Alternatively apply Isoprothiolane 40% EC at 1.5 ml per liter at booting stage',
      'Direct spray nozzles toward the flag leaf and emerging panicle neck',
    ],
    preventiveSteps: [
      'Split nitrogen fertilizer into 3–4 balanced doses; avoid heavy urea application at tillering',
      'Burn or compost infected straw and weed hosts (Echinochloa) on field bunds',
      'Treat seeds with Pseudomonas fluorescens (10 g/kg seed) before nursery sowing',
    ],
    dosage: {
      chemicalName: 'Tricyclazole 75% WP / Isoprothiolane 40% EC',
      organicName: 'Pseudomonas fluorescens + Bacillus subtilis',
      chemicalPerLiterMl: 1.2,
      organicPerLiterMl: 5.0,
      waterLitersPerAcre: 200,
      applicationIntervalDays: 14,
      safetyIntervalDays: 21,
    },
  },
  wheat_rust: {
    cropName: 'Wheat (Triticum aestivum)',
    scientificName: 'Triticum aestivum',
    diseaseName: 'Yellow Stripe Rust',
    pathogenName: 'Puccinia striiformis',
    confidence: 92.1,
    severity: 'low',
    sampleId: 'wheat_rust',
    inferenceEngine: 'tflite-edge',
    latencyMs: 36,
    summary:
      'Parallel rows of lemon-yellow uredinial pustules running along leaf veins, favored by cool night temperatures and morning dew.',
    symptoms: [
      'Linear streaks of bright yellow-orange powdery pustules parallel to leaf veins',
      'Yellow spore dust rubs off onto fingers when touching infected leaf blades',
      'Tip drying and reduced grain test weight if flag leaf becomes infected',
    ],
    organicRemedies: [
      'Spray sour buttermilk diluted 1:15 with water combined with 3 ml Neem oil per liter',
      'Apply potassium silicate foliar nutrient (2 g/L) to strengthen epidermal cell walls',
      'Dust wood ash on early localized patches during morning dew hours',
    ],
    chemicalRemedies: [
      'Spray Propiconazole 25% EC at 1.0 ml per liter of water immediately upon noticing first stripes',
      'Alternatively use Tebuconazole 25.9% EC at 1.0 ml per liter of water',
      'Cover surrounding 5-meter buffer zone around initial infection foci',
    ],
    preventiveSteps: [
      'Cultivate rust-resistant varieties such as GW-496, GW-513, or HD-3226',
      'Avoid late sowing beyond November 25 which exposes grain filling to rust spores',
      'Apply balanced muriate of potash (MOP) to boost natural disease tolerance',
    ],
    dosage: {
      chemicalName: 'Propiconazole 25% EC / Tebuconazole 25.9% EC',
      organicName: 'Potassium Silicate + Azadirachtin Bio-Wash',
      chemicalPerLiterMl: 1.0,
      organicPerLiterMl: 4.5,
      waterLitersPerAcre: 200,
      applicationIntervalDays: 15,
      safetyIntervalDays: 30,
    },
  },
  healthy_leaf: {
    cropName: 'Cumin / Field Crop Canopy',
    scientificName: 'Cuminum cyminum',
    diseaseName: 'Healthy Vigorous Leaf (No Pathogen Detected)',
    pathogenName: 'None — Optimal Chlorophyll & Turgor',
    confidence: 98.9,
    severity: 'healthy',
    sampleId: 'healthy_leaf',
    inferenceEngine: 'tflite-edge',
    latencyMs: 31,
    summary:
      'Uniform deep-green chlorophyll distribution, intact cuticular wax layer, and zero necrotic or chlorotic lesions across the leaf lamina.',
    symptoms: [
      'Vibrant green lamina with normal stomatal turgor and clean leaf margins',
      'Absence of fungal mycelium, bacterial water-soaked spots, or insect feeding scars',
      'Strong petiolar attachment indicating balanced nitrogen and micronutrient uptake',
    ],
    organicRemedies: [
      'Continue preventive Jeevamrut drenching (200 liters/acre) with irrigation water every 21 days',
      'Optional foliar spray of Seaweed Extract (Ascophyllum nodosum) at 2 ml/L for flower retention',
    ],
    chemicalRemedies: [
      'No chemical fungicide or pesticide spray required — preserve beneficial ladybird beetles and lacewings',
    ],
    preventiveSteps: [
      'Scout field corners weekly during morning hours for early aphid or thrips arrival',
      'Maintain optimal soil moisture without waterlogging around the root collar zone',
    ],
    dosage: {
      chemicalName: 'None Required (Preventive Water-Soluble NPK 19:19:19)',
      organicName: 'Seaweed Bio-Stimulant / Jeevamrut',
      chemicalPerLiterMl: 0,
      organicPerLiterMl: 2.5,
      waterLitersPerAcre: 180,
      applicationIntervalDays: 21,
      safetyIntervalDays: 0,
    },
  },
};

const GUJARATI_DIAGNOSES: Record<string, LocalizedReportFields> = {
  groundnut_tikka: {
    cropName: 'મગફળી (Groundnut - Arachis hypogaea)',
    diseaseName: 'મગફળીનો ટીક્કા રોગ (આગોતરા અને પાછોતરા ટપકાં)',
    summary:
      'મગફળીના નીચેના અને વચ્ચેના પાંદડા પર પીળી કિનારીવાળા ગોળાકાર ઘેરા કથ્થાઈ રંગના ટપકાં જોવા મળે છે, જેનાથી પાંદડા વહેલા ખરી પડે છે અને સૂયા બેસવામાં ઘટાડો થાય છે.',
    symptoms: [
      'પાંદડાની ઉપરની સપાટી પર પીળા વલય (Halo) સાથે ૨–૬ મિ.મી. ના ગોળાકાર ઘેરા કથ્થાઈ ટપકાં',
      'જૂના પાંદડાની નીચેની બાજુએ કાળા રંગની મખમલી ફૂગની વૃદ્ધિ',
      'સમયસર સારવાર ન થાય તો પાંદડા ખરી પડવાથી શીંગોના ઉત્પાદનમાં ૨૫–૪૦% નો ઘટાડો',
    ],
    organicRemedies: [
      'સાંજના સમયે ટ્રાયકોડર્મા વિરીડી (Trichoderma viride) પાવડર ૫ ગ્રામ પ્રતિ લિટર પાણીમાં ભેળવી છંટકાવ કરો',
      '૫% લીંબોળીના મીંજનો અર્ક (NSKE) ૧ મિ.લી. કુદરતી સ્ટીકર સાથે પ્રતિ લિટર પાણીમાં છાંટો',
      'ખાટી છાશ અને ગૌમૂત્રનું દ્રાવણ (૧:૧૦ પ્રમાણ) ૧૦ દિવસના અંતરે પાંદડા પર છાંટો',
    ],
    chemicalRemedies: [
      'હેક્ઝાકોનાઝોલ ૫% EC ૨.૦ મિ.લી. પ્રતિ લિટર પાણીમાં (એકર દીઠ ૨૦૦ લિટર પાણીમાં ૪૦૦ મિ.લી.) છાંટો',
      'બીજા છંટકાવમાં મેન્કોઝેબ ૭૫% WP ૨.૫ ગ્રામ/લિટર અથવા કાર્બેન્ડાઝિમ ૧૨% + મેન્કોઝેબ ૬૩% WP ૨ ગ્રામ/લિટર વાપરો',
      'છોડના નીચેના પાંદડા બરાબર ભીંજાય તે રીતે હોલો-કોન નોઝલથી છંટકાવ કરો',
    ],
    preventiveSteps: [
      'વાવેતર પહેલાં પ્રતિ કિલો બીજને ૧૦ ગ્રામ ટ્રાયકોડર્મા હાર્ઝિયાનમથી પટ આપો',
      'હવાની અવરજવર અને ભેજ ઘટાડવા બે ચાસ વચ્ચે ૪૫ સે.મી. x ૧૦ સે.મી. નું અંતર રાખો',
      'લણણી પછી રોગિષ્ઠ પાકના અવશેષોનો નાશ કરો અને ઊંડી ખેડ કરો',
    ],
  },
  cotton_curl: {
    cropName: 'બીટી કપાસ (Bt Cotton - Gossypium hirsutum)',
    diseaseName: 'કપાસનો પાન કોકડાવાનો વાયરસ (CLCuV)',
    summary:
      'સફેદ માખી (Whitefly) દ્વારા ફેલાતા આ વાયરસથી કપાસના નવા પાંદડા ઉપર કે નીચેની તરફ વાટકીની જેમ વળી જાય છે અને નસો જાડી થઈ જાય છે.',
    symptoms: [
      'ટોચના કુમળા પાંદડા ઉપરની તરફ કોકડાઈ જવા અને પાંદડા જાડા-બરછટ થવા',
      'પાંદડાની નીચેની બાજુએ નસો ઘેરી લીલી અને જાડી થવી તથા નાની પત્તી જેવી રચના (Enations) દેખાવી',
      'છોડનીં ઊંચાઈ અટકી જવી અને પાંદડાની નીચે સફેદ માખીના બચ્ચાં જોવા મળવા',
    ],
    organicRemedies: [
      'સફેદ માખીના નિયંત્રણ માટે એકર દીઠ ૧૫ પીળા ચીકણા ટ્રેપ (Yellow Sticky Traps) પાકની ઊંચાઈથી ૧૫ સે.મી. ઉપર મૂકો',
      'એઝાડિરાક્ટીન ૧૦,૦૦૦ ppm (૧% EC) ૩ મિ.લી. પ્રતિ લિટર પાણીમાં કરંજ તેલ સાથે છાંટો',
      'ભેજવાળા હવામાનમાં સાંજે વર્ટીસિલિયમ લેકાની (Verticillium lecanii) ૫ ગ્રામ પ્રતિ લિટર પાણીમાં છાંટો',
    ],
    chemicalRemedies: [
      'ફ્લોનિકામિડ ૫૦% WG ૦.૪ ગ્રામ પ્રતિ લિટર અથવા ડાયફેન્થિયુરોન ૫૦% WP ૧.૨ ગ્રામ પ્રતિ લિટર પાણીમાં છાંટો',
      'સફેદ માખીનો ઉપદ્રવ વધુ હોય તો પાયરીપ્રોક્સીફેન ૧૦% EC ૨.૦ મિ.લી. પ્રતિ લિટર પાણીમાં છાંટો',
      'સિન્થેટિક પાયરેથ્રોઇડ જૂથની દવાઓનો છંટકાવ ટાળો જેથી સફેદ માખીનો ઉપદ્રવ વધે નહીં',
    ],
    preventiveSteps: [
      'શેઢા-પાળા પરથી કાંસકી (Abutilon) અને અન્ય યજમાન નીંદણનો તાત્કાલિક નાશ કરો',
      'યુરિયા ખાતરનો વધુ પડતો ઉપયોગ ટાળો જેથી ચૂસિયાં જીવાત ઓછી આકર્ષાય',
      'કપાસના ખેતરની ફરતે બાજરી અથવા મકાઈની રક્ષણાત્મક હાર (Barrier crop) વાવો',
    ],
  },
  tomato_blight: {
    cropName: 'ટામેટાં (Tomato - Solanum lycopersicum)',
    diseaseName: 'ટામેટાંનો આગોતરો સુકારો (Early Blight)',
    summary:
      'નીચેના જૂના પાંદડા પર ચક્ર જેવા ગોળાકાર વલયોવાળા કાળા-કથ્થાઈ ટપકાં પડે છે, જે ધીમે ધીમે ઉપરના પાંદડા અને થડ સુધી ફેલાય છે.',
    symptoms: [
      'પાંદડા પર નિશાન (Bullseye target) જેવા ગોળાકાર ચક્રોવાળા ૧૨ મિ.મી. સુધીના ઘેરા કથ્થાઈ ટપકાં',
      'ટપકાંની આજુબાજુનો ભાગ પીળો પડી જવો અને પાંદડા સુકાઈને ખરી પડવા',
      'થડ પર કાળા ચાંઠા પડવા અને ફળના ડીંટિયા પાસે કાળો સડો થવો',
    ],
    organicRemedies: [
      'સ્યુડોમોનાસ ફ્લોરોસેન્સ (Pseudomonas fluorescens) પ્રવાહી ૫ મિ.લી. પ્રતિ લિટર પાણીમાં ભેળવી છાંટો',
      'કોપર ઓક્સીક્લોરાઇડ ૫૦% WP ૨.૫ ગ્રામ/લિટર અથવા ખાટી છાશ + તાંબાનું દ્રાવણ છાંટો',
      'જમીનને અડતા નીચેના ૨૦ સે.મી. સુધીના રોગિષ્ઠ પાંદડા કાપી નાખો અને લીંબોળી ખોળનું મલ્ચિંગ કરો',
    ],
    chemicalRemedies: [
      'એઝોક્સીસ્ટ્રોબિન ૨૩% SC ૧.૦ મિ.લી. પ્રતિ લિટર અથવા ક્લોરોથાલોનિલ ૭૫% WP ૨.૦ ગ્રામ પ્રતિ લિટર છાંટો',
      '૧૨ દિવસ પછી મેન્કોઝેબ ૭૫% WP ૨.૫ ગ્રામ પ્રતિ લિટર પાણીમાં છાંટો',
      'દવા પાંદડા પર સરખી રીતે ફેલાય તે માટે ૦.૫ મિ.લી. સિલિકોન સ્ટીકર પ્રતિ લિટર ઉમેરો',
    ],
    preventiveSteps: [
      'પાંદડા ભીના ન રહે તે માટે ફુવારા પિયતને બદલે ટપક સિંચાઈ (Drip Irrigation) વાપરો',
      'છોડને વાંસ અને તારથી ટેકો આપો જેથી પાંદડા અને ફળ ભીની જમીનને અડે નહીં',
      'ગલગોટા અથવા કઠોળ વર્ગના પાકો સાથે ૨ વર્ષની પાક ફેરબદલી (Crop Rotation) કરો',
    ],
  },
  rice_blast: {
    cropName: 'ડાંગર (Paddy - Oryza sativa)',
    diseaseName: 'ડાંગરનો કર્મોડી રોગ (Leaf & Neck Blast)',
    summary:
      'ડાંગરના પાંદડા પર હોડી કે ત્રાક આકારના રાખોડી કેન્દ્ર અને લાલ-કથ્થાઈ કિનારીવાળા ટપકાં પડે છે, જે કંટીની ગરદન (Neck) ને પણ સુકવી નાખે છે.',
    symptoms: [
      'પાંદડા પર વચ્ચેથી રાખોડી-સફેદ અને ફરતે ઘેરી કથ્થાઈ કિનારીવાળા ત્રાક (Spindle) આકારના ટપકાં',
      'ટપકાં ભેગા થઈ જવાથી પીલા ફૂટવાના સમયે આખા પાંદડા બળી ગયેલા દેખાવા',
      'કંટી નીકળતી વખતે ગરદનના ગાંઠ પર કાળો સડો થવાથી દાણા પોચા (પોલા) રહી જવા',
    ],
    organicRemedies: [
      'સ્યુડોમોનાસ ફ્લોરોસેન્સ પાવડર ૫ ગ્રામ પ્રતિ લિટર પાણીમાં ભેળવી છંટકાવ કરો',
      'પંચગવ્ય (૩૦ મિ.લી./લિટર) અને બેસિલસ સબટિલિસ બાયો-ફંગીસાઇડનું મિશ્રણ છાંટો',
      'વાદળછાયા અને ભેજવાળા વાતાવરણમાં ક્યારીમાં ઊંડું પાણી ભરી રાખવાને બદલે છીછરું પાણી રાખો',
    ],
    chemicalRemedies: [
      'ટ્રાયસાયક્લાઝોલ ૭૫% WP ૦.૬ ગ્રામ પ્રતિ લિટર પાણીમાં (એકર દીઠ ૨૦૦ લિટર પાણીમાં ૧૨૦ ગ્રામ) છાંટો',
      'અથવા આઇસોપ્રોથિયોલેન ૪૦% EC ૧.૫ મિ.લી. પ્રતિ લિટર પાણીમાં ગાભમાળ અવસ્થાએ છાંટો',
      'ધ્વજ પર્ણ (Flag leaf) અને કંટીની ગરદન પર દવા પહોંચે તે રીતે છંટકાવ કરો',
    ],
    preventiveSteps: [
      'નાઇટ્રોજન (યુરિયા) ખાતર એકસાથે ન આપતાં ૩–૪ હપ્તામાં સંતુલિત માત્રામાં આપો',
      'શેઢા-પાળા પરનું સામો (Echinochloa) નીંદણ અને રોગિષ્ઠ પરાળનો નાશ કરો',
      'ધરૂવાડિયામાં વાવતા પહેલાં પ્રતિ કિલો બીજને ૧૦ ગ્રામ સ્યુડોમોનાસ ફ્લોરોસેન્સનો પટ આપો',
    ],
  },
  wheat_rust: {
    cropName: 'ઘઉં (Wheat - Triticum aestivum)',
    diseaseName: 'ઘઉંનો પીળો ગેરુ રોગ (Yellow Stripe Rust)',
    summary:
      'ઠંડા રાત્રિના તાપમાન અને સવારના ઝાકળમાં ઘઉંના પાંદડાની નસોને સમાંતર પીળા રંગના પાવડર જેવા પટ્ટા (Pustules) જોવા મળે છે.',
    symptoms: [
      'પાંદડા પર નસોની દિશામાં સીધી લીટીમાં લીંબુ જેવા પીળા-નારંગી રંગના ટપકાંની હારમાળા',
      'પાંદડાને હાથ અડાડતાં આંગળીઓ પર પીળા રંગનો ગેરુ પાવડર ચોંટી જવો',
      'ટોચના પાંદડા પર રોગ ફેલાતાં દાણા ચીમળાઈ જવા અને વજનમાં ઘટાડો થવો',
    ],
    organicRemedies: [
      '૧:૧૫ ના પ્રમાણમાં ખાટી છાશ અને ૩ મિ.લી. લીંબોળી તેલ પ્રતિ લિટર પાણીમાં ભેળવી છાંટો',
      'પાંદડાની કોષદીવાલ મજબૂત કરવા પોટેશિયમ સિલિકેટ ૨ ગ્રામ પ્રતિ લિટર પાણીમાં છાંટો',
      'શરૂઆતના નાના રોગિષ્ઠ કુંડાળામાં સવારે ઝાકળ વખતે લાકડાની રાખનો છંટકાવ કરો',
    ],
    chemicalRemedies: [
      'રોગની શરૂઆત દેખાતાં જ પ્રોપીકોનાઝોલ ૨૫% EC ૧.૦ મિ.લી. પ્રતિ લિટર પાણીમાં છાંટો',
      'અથવા ટેબુકોનાઝોલ ૨૫.૯% EC ૧.૦ મિ.લી. પ્રતિ લિટર પાણીમાં ભેળવી છંટકાવ કરો',
      'રોગિષ્ઠ ભાગની આજુબાજુના ૫ મીટર વિસ્તારને આવરી લઈ તાત્કાલિક છંટકાવ કરો',
    ],
    preventiveSteps: [
      'ગેરુ પ્રતિકારક જાતો જેવી કે GW-496, GW-513 અથવા HD-3226 નું વાવેતર કરો',
      '૨૫ નવેમ્બર પછી મોડું વાવેતર ટાળો જેથી પાકને ગેરુના બીજાણુથી બચાવી શકાય',
      'પાકની રોગપ્રતિકારક શક્તિ વધારવા પોટાશ (MOP) ખાતરનો સંતુલિત ઉપયોગ કરો',
    ],
  },
  healthy_leaf: {
    cropName: 'જીરું / તંદુરસ્ત ખેત પાક (Cumin / Healthy Crop)',
    diseaseName: 'તંદુરસ્ત પાંદડું (કોઈ રોગ કે જીવાત નથી)',
    summary:
      'પાંદડામાં એકસરખો ઘેરો લીલો રંગ (હરિતદ્રવ્ય), કુદરતી ચમક અને કોઈપણ પ્રકારના ફૂગ કે જીવાતના ટપકાં વિનાની સંપૂર્ણ તંદુરસ્ત સ્થિતિ.',
    symptoms: [
      'સંપૂર્ણ લીલું પાંદડું, તંદુરસ્ત કિનારી અને પૂરતો ભેજ (Turgor)',
      'ફૂગની છારી, સુકારાના ટપકાં કે ચૂસિયાં જીવાતના ડંખનો સંપૂર્ણ અભાવ',
      'સંતુલિત પોષકતત્વો અને મૂળની મજબૂત કાર્યક્ષમતા દર્શાવતી તંદુરસ્ત વૃદ્ધિ',
    ],
    organicRemedies: [
      'દર ૨૧ દિવસે પિયત સાથે એકર દીઠ ૨૦૦ લિટર જીવામૃત આપવાનું ચાલુ રાખો',
      'ફૂલ અને ફળ ધારણ ક્ષમતા વધારવા સી-વીડ અર્ક (Seaweed Extract) ૨ મિ.લી./લિટર છાંટી શકાય',
    ],
    chemicalRemedies: [
      'કોઈ રાસાયણિક દવા છાંટવાની જરૂર નથી — ખેતરના મિત્ર કીટકો (દાળિયા/Ladybird) નું રક્ષણ કરો',
    ],
    preventiveSteps: [
      'સવારના સમયે ખેતરના ખૂણાઓમાં મોલોમશી કે થ્રિપ્સની હાજરી માટે અઠવાડિયે નિરીક્ષણ કરો',
      'મૂળ પાસે પાણી ભરાઈ ન રહે તે રીતે હળવું અને નિયમિત પિયત આપો',
    ],
  },
};

export function getLocalizedDiagnosis(
  sampleId: string,
  lang: SupportedLanguage
): DiagnosisReport {
  const base = BASE_DIAGNOSES[sampleId] || BASE_DIAGNOSES.groundnut_tikka;
  const localized = lang === 'gu' ? GUJARATI_DIAGNOSES[sampleId] : undefined;

  return {
    ...base,
    id: `scan_${sampleId}_${Date.now()}`,
    timestamp: new Date().toISOString(),
    cropName: localized?.cropName || base.cropName,
    diseaseName: localized?.diseaseName || base.diseaseName,
    summary: localized?.summary || base.summary,
    symptoms: localized?.symptoms || base.symptoms,
    organicRemedies: localized?.organicRemedies || base.organicRemedies,
    chemicalRemedies: localized?.chemicalRemedies || base.chemicalRemedies,
    preventiveSteps: localized?.preventiveSteps || base.preventiveSteps,
  };
}
