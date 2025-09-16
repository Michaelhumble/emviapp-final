// Comprehensive US location data for massive SEO coverage
export const EXPANDED_SEO_LOCATIONS = [
  // Major metropolitan areas (Tier 1 - 50+ cities)
  // California
  { id: 'los-angeles-ca', city: 'Los Angeles', state: 'CA', metro: 'Los Angeles Metro', population: 3979576, tier: 1, searchVolume: 8900 },
  { id: 'san-francisco-ca', city: 'San Francisco', state: 'CA', metro: 'Bay Area', population: 881549, tier: 1, searchVolume: 5200 },
  { id: 'san-diego-ca', city: 'San Diego', state: 'CA', metro: 'San Diego Metro', population: 1423851, tier: 1, searchVolume: 4100 },
  { id: 'sacramento-ca', city: 'Sacramento', state: 'CA', metro: 'Sacramento Metro', population: 524943, tier: 2, searchVolume: 1800 },
  { id: 'fresno-ca', city: 'Fresno', state: 'CA', metro: 'Central Valley', population: 542107, tier: 2, searchVolume: 1200 },
  { id: 'long-beach-ca', city: 'Long Beach', state: 'CA', metro: 'Los Angeles Metro', population: 456062, tier: 2, searchVolume: 1400 },
  { id: 'oakland-ca', city: 'Oakland', state: 'CA', metro: 'Bay Area', population: 440646, tier: 2, searchVolume: 1600 },
  { id: 'san-jose-ca', city: 'San Jose', state: 'CA', metro: 'Bay Area', population: 1021795, tier: 1, searchVolume: 2800 },
  
  // Texas
  { id: 'houston-tx', city: 'Houston', state: 'TX', metro: 'Greater Houston', population: 2320268, tier: 1, searchVolume: 6200 },
  { id: 'dallas-tx', city: 'Dallas', state: 'TX', metro: 'Dallas-Fort Worth', population: 1343573, tier: 1, searchVolume: 5800 },
  { id: 'austin-tx', city: 'Austin', state: 'TX', metro: 'Austin Metro', population: 978908, tier: 1, searchVolume: 4200 },
  { id: 'san-antonio-tx', city: 'San Antonio', state: 'TX', metro: 'San Antonio Metro', population: 1547253, tier: 1, searchVolume: 3900 },
  { id: 'fort-worth-tx', city: 'Fort Worth', state: 'TX', metro: 'Dallas-Fort Worth', population: 909585, tier: 2, searchVolume: 2100 },
  { id: 'el-paso-tx', city: 'El Paso', state: 'TX', metro: 'El Paso Metro', population: 681728, tier: 2, searchVolume: 1400 },
  { id: 'arlington-tx', city: 'Arlington', state: 'TX', metro: 'Dallas-Fort Worth', population: 398854, tier: 2, searchVolume: 1100 },
  
  // Florida
  { id: 'miami-fl', city: 'Miami', state: 'FL', metro: 'Miami Metro', population: 442241, tier: 1, searchVolume: 4800 },
  { id: 'tampa-fl', city: 'Tampa', state: 'FL', metro: 'Tampa Bay', population: 399700, tier: 1, searchVolume: 2900 },
  { id: 'orlando-fl', city: 'Orlando', state: 'FL', metro: 'Orlando Metro', population: 307573, tier: 1, searchVolume: 3200 },
  { id: 'jacksonville-fl', city: 'Jacksonville', state: 'FL', metro: 'Jacksonville Metro', population: 911507, tier: 2, searchVolume: 2100 },
  { id: 'fort-lauderdale-fl', city: 'Fort Lauderdale', state: 'FL', metro: 'Miami Metro', population: 182760, tier: 2, searchVolume: 1600 },
  { id: 'tallahassee-fl', city: 'Tallahassee', state: 'FL', metro: 'Tallahassee Metro', population: 194500, tier: 3, searchVolume: 800 },
  { id: 'gainesville-fl', city: 'Gainesville', state: 'FL', metro: 'North Central FL', population: 141085, tier: 3, searchVolume: 600 },
  
  // New York
  { id: 'new-york-ny', city: 'New York', state: 'NY', metro: 'NYC Metro', population: 8336817, tier: 1, searchVolume: 12100 },
  { id: 'buffalo-ny', city: 'Buffalo', state: 'NY', metro: 'Buffalo Metro', population: 278349, tier: 2, searchVolume: 1200 },
  { id: 'rochester-ny', city: 'Rochester', state: 'NY', metro: 'Rochester Metro', population: 211328, tier: 3, searchVolume: 900 },
  { id: 'syracuse-ny', city: 'Syracuse', state: 'NY', metro: 'Syracuse Metro', population: 148620, tier: 3, searchVolume: 700 },
  { id: 'albany-ny', city: 'Albany', state: 'NY', metro: 'Capital District', population: 97856, tier: 3, searchVolume: 600 },
  
  // Illinois
  { id: 'chicago-il', city: 'Chicago', state: 'IL', metro: 'Chicagoland', population: 2693976, tier: 1, searchVolume: 7200 },
  { id: 'aurora-il', city: 'Aurora', state: 'IL', metro: 'Chicagoland', population: 180542, tier: 3, searchVolume: 600 },
  { id: 'rockford-il', city: 'Rockford', state: 'IL', metro: 'Rockford Metro', population: 148655, tier: 3, searchVolume: 500 },
  { id: 'joliet-il', city: 'Joliet', state: 'IL', metro: 'Chicagoland', population: 150362, tier: 3, searchVolume: 550 },
  { id: 'naperville-il', city: 'Naperville', state: 'IL', metro: 'Chicagoland', population: 149540, tier: 3, searchVolume: 650 },
  
  // Pennsylvania
  { id: 'philadelphia-pa', city: 'Philadelphia', state: 'PA', metro: 'Philadelphia Metro', population: 1584064, tier: 1, searchVolume: 4900 },
  { id: 'pittsburgh-pa', city: 'Pittsburgh', state: 'PA', metro: 'Pittsburgh Metro', population: 302971, tier: 2, searchVolume: 1800 },
  { id: 'allentown-pa', city: 'Allentown', state: 'PA', metro: 'Lehigh Valley', population: 125845, tier: 3, searchVolume: 400 },
  { id: 'erie-pa', city: 'Erie', state: 'PA', metro: 'Erie Metro', population: 98593, tier: 3, searchVolume: 350 },
  
  // Ohio
  { id: 'columbus-oh', city: 'Columbus', state: 'OH', metro: 'Columbus Metro', population: 898553, tier: 1, searchVolume: 2800 },
  { id: 'cleveland-oh', city: 'Cleveland', state: 'OH', metro: 'Cleveland Metro', population: 385552, tier: 2, searchVolume: 1600 },
  { id: 'cincinnati-oh', city: 'Cincinnati', state: 'OH', metro: 'Cincinnati Metro', population: 309317, tier: 2, searchVolume: 1400 },
  { id: 'toledo-oh', city: 'Toledo', state: 'OH', metro: 'Toledo Metro', population: 276491, tier: 3, searchVolume: 600 },
  { id: 'akron-oh', city: 'Akron', state: 'OH', metro: 'Akron Metro', population: 190469, tier: 3, searchVolume: 500 },
  
  // Michigan
  { id: 'detroit-mi', city: 'Detroit', state: 'MI', metro: 'Detroit Metro', population: 672662, tier: 1, searchVolume: 2200 },
  { id: 'grand-rapids-mi', city: 'Grand Rapids', state: 'MI', metro: 'Grand Rapids Metro', population: 198917, tier: 3, searchVolume: 700 },
  { id: 'warren-mi', city: 'Warren', state: 'MI', metro: 'Detroit Metro', population: 139387, tier: 3, searchVolume: 400 },
  { id: 'sterling-heights-mi', city: 'Sterling Heights', state: 'MI', metro: 'Detroit Metro', population: 134346, tier: 3, searchVolume: 350 },
  { id: 'lansing-mi', city: 'Lansing', state: 'MI', metro: 'Lansing Metro', population: 118427, tier: 3, searchVolume: 400 },
  
  // Georgia
  { id: 'atlanta-ga', city: 'Atlanta', state: 'GA', metro: 'Atlanta Metro', population: 498715, tier: 1, searchVolume: 4200 },
  { id: 'columbus-ga', city: 'Columbus', state: 'GA', metro: 'Columbus Metro', population: 206922, tier: 3, searchVolume: 600 },
  { id: 'augusta-ga', city: 'Augusta', state: 'GA', metro: 'Augusta Metro', population: 202081, tier: 3, searchVolume: 550 },
  { id: 'savannah-ga', city: 'Savannah', state: 'GA', metro: 'Savannah Metro', population: 147780, tier: 3, searchVolume: 800 },
  { id: 'athens-ga', city: 'Athens', state: 'GA', metro: 'Athens Metro', population: 127315, tier: 3, searchVolume: 500 },
  
  // North Carolina
  { id: 'charlotte-nc', city: 'Charlotte', state: 'NC', metro: 'Charlotte Metro', population: 885708, tier: 1, searchVolume: 3100 },
  { id: 'raleigh-nc', city: 'Raleigh', state: 'NC', metro: 'Research Triangle', population: 474069, tier: 1, searchVolume: 2400 },
  { id: 'greensboro-nc', city: 'Greensboro', state: 'NC', metro: 'Piedmont Triad', population: 296710, tier: 2, searchVolume: 900 },
  { id: 'durham-nc', city: 'Durham', state: 'NC', metro: 'Research Triangle', population: 283506, tier: 2, searchVolume: 800 },
  { id: 'winston-salem-nc', city: 'Winston-Salem', state: 'NC', metro: 'Piedmont Triad', population: 249545, tier: 3, searchVolume: 700 },
  { id: 'fayetteville-nc', city: 'Fayetteville', state: 'NC', metro: 'Fayetteville Metro', population: 208501, tier: 3, searchVolume: 500 },
  { id: 'cary-nc', city: 'Cary', state: 'NC', metro: 'Research Triangle', population: 174721, tier: 3, searchVolume: 600 },
  { id: 'wilmington-nc', city: 'Wilmington', state: 'NC', metro: 'Cape Fear', population: 123744, tier: 3, searchVolume: 650 },
  { id: 'high-point-nc', city: 'High Point', state: 'NC', metro: 'Piedmont Triad', population: 114059, tier: 3, searchVolume: 400 },
  { id: 'asheville-nc', city: 'Asheville', state: 'NC', metro: 'Asheville Metro', population: 94589, tier: 3, searchVolume: 700 },
  
  // Virginia
  { id: 'virginia-beach-va', city: 'Virginia Beach', state: 'VA', metro: 'Hampton Roads', population: 459470, tier: 2, searchVolume: 1400 },
  { id: 'norfolk-va', city: 'Norfolk', state: 'VA', metro: 'Hampton Roads', population: 238005, tier: 3, searchVolume: 700 },
  { id: 'chesapeake-va', city: 'Chesapeake', state: 'VA', metro: 'Hampton Roads', population: 249422, tier: 3, searchVolume: 600 },
  { id: 'richmond-va', city: 'Richmond', state: 'VA', metro: 'Richmond Metro', population: 230436, tier: 2, searchVolume: 1200 },
  { id: 'newport-news-va', city: 'Newport News', state: 'VA', metro: 'Hampton Roads', population: 186247, tier: 3, searchVolume: 500 },
  { id: 'alexandria-va', city: 'Alexandria', state: 'VA', metro: 'DC Metro', population: 159467, tier: 3, searchVolume: 800 },
  { id: 'hampton-va', city: 'Hampton', state: 'VA', metro: 'Hampton Roads', population: 137148, tier: 3, searchVolume: 400 },
  { id: 'portsmouth-va', city: 'Portsmouth', state: 'VA', metro: 'Hampton Roads', population: 97915, tier: 3, searchVolume: 300 },
  { id: 'suffolk-va', city: 'Suffolk', state: 'VA', metro: 'Hampton Roads', population: 94324, tier: 3, searchVolume: 250 },
  
  // Washington
  { id: 'seattle-wa', city: 'Seattle', state: 'WA', metro: 'Seattle Metro', population: 753675, tier: 1, searchVolume: 3800 },
  { id: 'spokane-wa', city: 'Spokane', state: 'WA', metro: 'Spokane Metro', population: 228989, tier: 3, searchVolume: 700 },
  { id: 'tacoma-wa', city: 'Tacoma', state: 'WA', metro: 'Seattle Metro', population: 219346, tier: 3, searchVolume: 600 },
  { id: 'vancouver-wa', city: 'Vancouver', state: 'WA', metro: 'Portland Metro', population: 183741, tier: 3, searchVolume: 500 },
  { id: 'bellevue-wa', city: 'Bellevue', state: 'WA', metro: 'Seattle Metro', population: 151854, tier: 3, searchVolume: 600 },
  { id: 'everett-wa', city: 'Everett', state: 'WA', metro: 'Seattle Metro', population: 113817, tier: 3, searchVolume: 350 },
  { id: 'kent-wa', city: 'Kent', state: 'WA', metro: 'Seattle Metro', population: 136588, tier: 3, searchVolume: 300 },
  { id: 'renton-wa', city: 'Renton', state: 'WA', metro: 'Seattle Metro', population: 106785, tier: 3, searchVolume: 250 },
  
  // Oregon
  { id: 'portland-or', city: 'Portland', state: 'OR', metro: 'Portland Metro', population: 650380, tier: 1, searchVolume: 2800 },
  { id: 'salem-or', city: 'Salem', state: 'OR', metro: 'Salem Metro', population: 177723, tier: 3, searchVolume: 500 },
  { id: 'eugene-or', city: 'Eugene', state: 'OR', metro: 'Eugene Metro', population: 176654, tier: 3, searchVolume: 600 },
  { id: 'gresham-or', city: 'Gresham', state: 'OR', metro: 'Portland Metro', population: 114247, tier: 3, searchVolume: 250 },
  { id: 'hillsboro-or', city: 'Hillsboro', state: 'OR', metro: 'Portland Metro', population: 106447, tier: 3, searchVolume: 300 },
  { id: 'bend-or', city: 'Bend', state: 'OR', metro: 'Central Oregon', population: 99178, tier: 3, searchVolume: 400 },
  
  // Arizona
  { id: 'phoenix-az', city: 'Phoenix', state: 'AZ', metro: 'Phoenix Metro', population: 1680992, tier: 1, searchVolume: 4600 },
  { id: 'tucson-az', city: 'Tucson', state: 'AZ', metro: 'Tucson Metro', population: 548073, tier: 2, searchVolume: 1600 },
  { id: 'mesa-az', city: 'Mesa', state: 'AZ', metro: 'Phoenix Metro', population: 504258, tier: 2, searchVolume: 1200 },
  { id: 'chandler-az', city: 'Chandler', state: 'AZ', metro: 'Phoenix Metro', population: 275987, tier: 2, searchVolume: 800 },
  { id: 'scottsdale-az', city: 'Scottsdale', state: 'AZ', metro: 'Phoenix Metro', population: 258069, tier: 2, searchVolume: 1100 },
  { id: 'glendale-az', city: 'Glendale', state: 'AZ', metro: 'Phoenix Metro', population: 248325, tier: 3, searchVolume: 600 },
  { id: 'gilbert-az', city: 'Gilbert', state: 'AZ', metro: 'Phoenix Metro', population: 267918, tier: 3, searchVolume: 550 },
  { id: 'tempe-az', city: 'Tempe', state: 'AZ', metro: 'Phoenix Metro', population: 195805, tier: 3, searchVolume: 700 },
  { id: 'peoria-az', city: 'Peoria', state: 'AZ', metro: 'Phoenix Metro', population: 190985, tier: 3, searchVolume: 400 },
  
  // Colorado
  { id: 'denver-co', city: 'Denver', state: 'CO', metro: 'Denver Metro', population: 715522, tier: 1, searchVolume: 3200 },
  { id: 'colorado-springs-co', city: 'Colorado Springs', state: 'CO', metro: 'Colorado Springs Metro', population: 478961, tier: 2, searchVolume: 1400 },
  { id: 'aurora-co', city: 'Aurora', state: 'CO', metro: 'Denver Metro', population: 379289, tier: 2, searchVolume: 800 },
  { id: 'fort-collins-co', city: 'Fort Collins', state: 'CO', metro: 'Fort Collins Metro', population: 169810, tier: 3, searchVolume: 600 },
  { id: 'lakewood-co', city: 'Lakewood', state: 'CO', metro: 'Denver Metro', population: 155984, tier: 3, searchVolume: 400 },
  { id: 'thornton-co', city: 'Thornton', state: 'CO', metro: 'Denver Metro', population: 141867, tier: 3, searchVolume: 350 },
  { id: 'arvada-co', city: 'Arvada', state: 'CO', metro: 'Denver Metro', population: 124402, tier: 3, searchVolume: 300 },
  { id: 'westminster-co', city: 'Westminster', state: 'CO', metro: 'Denver Metro', population: 116317, tier: 3, searchVolume: 250 },
  { id: 'pueblo-co', city: 'Pueblo', state: 'CO', metro: 'Pueblo Metro', population: 111876, tier: 3, searchVolume: 300 },
  
  // Nevada
  { id: 'las-vegas-nv', city: 'Las Vegas', state: 'NV', metro: 'Las Vegas Metro', population: 641676, tier: 1, searchVolume: 3600 },
  { id: 'henderson-nv', city: 'Henderson', state: 'NV', metro: 'Las Vegas Metro', population: 320189, tier: 2, searchVolume: 700 },
  { id: 'reno-nv', city: 'Reno', state: 'NV', metro: 'Reno Metro', population: 264165, tier: 2, searchVolume: 800 },
  { id: 'north-las-vegas-nv', city: 'North Las Vegas', state: 'NV', metro: 'Las Vegas Metro', population: 262527, tier: 3, searchVolume: 400 },
  { id: 'sparks-nv', city: 'Sparks', state: 'NV', metro: 'Reno Metro', population: 105006, tier: 3, searchVolume: 200 },
  { id: 'carson-city-nv', city: 'Carson City', state: 'NV', metro: 'Carson City Metro', population: 58639, tier: 3, searchVolume: 150 },
  
  // Utah
  { id: 'salt-lake-city-ut', city: 'Salt Lake City', state: 'UT', metro: 'Salt Lake Metro', population: 200133, tier: 2, searchVolume: 1200 },
  { id: 'west-valley-city-ut', city: 'West Valley City', state: 'UT', metro: 'Salt Lake Metro', population: 140230, tier: 3, searchVolume: 300 },
  { id: 'provo-ut', city: 'Provo', state: 'UT', metro: 'Provo Metro', population: 117335, tier: 3, searchVolume: 400 },
  { id: 'west-jordan-ut', city: 'West Jordan', state: 'UT', metro: 'Salt Lake Metro', population: 116961, tier: 3, searchVolume: 250 },
  { id: 'orem-ut', city: 'Orem', state: 'UT', metro: 'Provo Metro', population: 98129, tier: 3, searchVolume: 200 },
  { id: 'sandy-ut', city: 'Sandy', state: 'UT', metro: 'Salt Lake Metro', population: 96380, tier: 3, searchVolume: 180 },
  
  // Additional high-opportunity markets (targeting beauty industry clusters)
  // Massachusetts
  { id: 'boston-ma', city: 'Boston', state: 'MA', metro: 'Boston Metro', population: 685094, tier: 1, searchVolume: 3400 },
  { id: 'worcester-ma', city: 'Worcester', state: 'MA', metro: 'Worcester Metro', population: 185877, tier: 3, searchVolume: 500 },
  { id: 'springfield-ma', city: 'Springfield', state: 'MA', metro: 'Springfield Metro', population: 155929, tier: 3, searchVolume: 400 },
  { id: 'cambridge-ma', city: 'Cambridge', state: 'MA', metro: 'Boston Metro', population: 118403, tier: 3, searchVolume: 600 },
  { id: 'lowell-ma', city: 'Lowell', state: 'MA', metro: 'Boston Metro', population: 115554, tier: 3, searchVolume: 300 },
  
  // South Carolina
  { id: 'charleston-sc', city: 'Charleston', state: 'SC', metro: 'Charleston Metro', population: 150277, tier: 2, searchVolume: 1100 },
  { id: 'columbia-sc', city: 'Columbia', state: 'SC', metro: 'Columbia Metro', population: 137300, tier: 3, searchVolume: 600 },
  { id: 'north-charleston-sc', city: 'North Charleston', state: 'SC', metro: 'Charleston Metro', population: 114852, tier: 3, searchVolume: 300 },
  { id: 'mount-pleasant-sc', city: 'Mount Pleasant', state: 'SC', metro: 'Charleston Metro', population: 93369, tier: 3, searchVolume: 400 },
  { id: 'rock-hill-sc', city: 'Rock Hill', state: 'SC', metro: 'Charlotte Metro', population: 75048, tier: 3, searchVolume: 200 },
  { id: 'greenville-sc', city: 'Greenville', state: 'SC', metro: 'Greenville Metro', population: 70720, tier: 3, searchVolume: 350 },
  { id: 'summerville-sc', city: 'Summerville', state: 'SC', metro: 'Charleston Metro', population: 52549, tier: 3, searchVolume: 150 },
  
  // Tennessee
  { id: 'nashville-tn', city: 'Nashville', state: 'TN', metro: 'Nashville Metro', population: 670820, tier: 1, searchVolume: 2800 },
  { id: 'memphis-tn', city: 'Memphis', state: 'TN', metro: 'Memphis Metro', population: 633104, tier: 2, searchVolume: 1800 },
  { id: 'knoxville-tn', city: 'Knoxville', state: 'TN', metro: 'Knoxville Metro', population: 190740, tier: 3, searchVolume: 600 },
  { id: 'chattanooga-tn', city: 'Chattanooga', state: 'TN', metro: 'Chattanooga Metro', population: 181099, tier: 3, searchVolume: 500 },
  { id: 'clarksville-tn', city: 'Clarksville', state: 'TN', metro: 'Clarksville Metro', population: 166722, tier: 3, searchVolume: 300 },
  { id: 'murfreesboro-tn', city: 'Murfreesboro', state: 'TN', metro: 'Nashville Metro', population: 152769, tier: 3, searchVolume: 350 },
  
  // Missouri 
  { id: 'kansas-city-mo', city: 'Kansas City', state: 'MO', metro: 'Kansas City Metro', population: 508090, tier: 1, searchVolume: 2200 },
  { id: 'st-louis-mo', city: 'St. Louis', state: 'MO', metro: 'St. Louis Metro', population: 301578, tier: 2, searchVolume: 1600 },
  { id: 'springfield-mo', city: 'Springfield', state: 'MO', metro: 'Springfield Metro', population: 169176, tier: 3, searchVolume: 500 },
  { id: 'independence-mo', city: 'Independence', state: 'MO', metro: 'Kansas City Metro', population: 123011, tier: 3, searchVolume: 250 },
  { id: 'columbia-mo', city: 'Columbia', state: 'MO', metro: 'Columbia Metro', population: 126254, tier: 3, searchVolume: 400 },
  
  // Wisconsin
  { id: 'milwaukee-wi', city: 'Milwaukee', state: 'WI', metro: 'Milwaukee Metro', population: 577222, tier: 2, searchVolume: 1800 },
  { id: 'madison-wi', city: 'Madison', state: 'WI', metro: 'Madison Metro', population: 269840, tier: 2, searchVolume: 900 },
  { id: 'green-bay-wi', city: 'Green Bay', state: 'WI', metro: 'Green Bay Metro', population: 107395, tier: 3, searchVolume: 350 },
  { id: 'kenosha-wi', city: 'Kenosha', state: 'WI', metro: 'Milwaukee Metro', population: 99986, tier: 3, searchVolume: 200 },
  { id: 'racine-wi', city: 'Racine', state: 'WI', metro: 'Milwaukee Metro', population: 77816, tier: 3, searchVolume: 150 },
  
  // Iowa
  { id: 'des-moines-ia', city: 'Des Moines', state: 'IA', metro: 'Des Moines Metro', population: 214133, tier: 3, searchVolume: 700 },
  { id: 'cedar-rapids-ia', city: 'Cedar Rapids', state: 'IA', metro: 'Cedar Rapids Metro', population: 137710, tier: 3, searchVolume: 300 },
  { id: 'davenport-ia', city: 'Davenport', state: 'IA', metro: 'Quad Cities', population: 101724, tier: 3, searchVolume: 200 },
  { id: 'sioux-city-ia', city: 'Sioux City', state: 'IA', metro: 'Sioux City Metro', population: 85797, tier: 3, searchVolume: 150 },
  { id: 'waterloo-ia', city: 'Waterloo', state: 'IA', metro: 'Waterloo Metro', population: 67314, tier: 3, searchVolume: 120 },
  { id: 'iowa-city-ia', city: 'Iowa City', state: 'IA', metro: 'Iowa City Metro', population: 75130, tier: 3, searchVolume: 250 },
  
  // Kansas
  { id: 'wichita-ks', city: 'Wichita', state: 'KS', metro: 'Wichita Metro', population: 397532, tier: 2, searchVolume: 1000 },
  { id: 'overland-park-ks', city: 'Overland Park', state: 'KS', metro: 'Kansas City Metro', population: 197238, tier: 3, searchVolume: 400 },
  { id: 'kansas-city-ks', city: 'Kansas City', state: 'KS', metro: 'Kansas City Metro', population: 156607, tier: 3, searchVolume: 300 },
  { id: 'topeka-ks', city: 'Topeka', state: 'KS', metro: 'Topeka Metro', population: 125904, tier: 3, searchVolume: 250 },
  { id: 'olathe-ks', city: 'Olathe', state: 'KS', metro: 'Kansas City Metro', population: 140545, tier: 3, searchVolume: 200 },
  
  // Nebraska
  { id: 'omaha-ne', city: 'Omaha', state: 'NE', metro: 'Omaha Metro', population: 486051, tier: 2, searchVolume: 1200 },
  { id: 'lincoln-ne', city: 'Lincoln', state: 'NE', metro: 'Lincoln Metro', population: 295178, tier: 3, searchVolume: 600 },
  { id: 'bellevue-ne', city: 'Bellevue', state: 'NE', metro: 'Omaha Metro', population: 64176, tier: 3, searchVolume: 100 },
  { id: 'grand-island-ne', city: 'Grand Island', state: 'NE', metro: 'Grand Island Metro', population: 53131, tier: 3, searchVolume: 80 },
  
  // New Mexico
  { id: 'albuquerque-nm', city: 'Albuquerque', state: 'NM', metro: 'Albuquerque Metro', population: 564559, tier: 2, searchVolume: 1400 },
  { id: 'las-cruces-nm', city: 'Las Cruces', state: 'NM', metro: 'Las Cruces Metro', population: 111385, tier: 3, searchVolume: 250 },
  { id: 'rio-rancho-nm', city: 'Rio Rancho', state: 'NM', metro: 'Albuquerque Metro', population: 104046, tier: 3, searchVolume: 150 },
  { id: 'santa-fe-nm', city: 'Santa Fe', state: 'NM', metro: 'Santa Fe Metro', population: 87505, tier: 3, searchVolume: 300 },
  { id: 'roswell-nm', city: 'Roswell', state: 'NM', metro: 'Roswell Metro', population: 48422, tier: 3, searchVolume: 80 },
  
  // Oklahoma  
  { id: 'oklahoma-city-ok', city: 'Oklahoma City', state: 'OK', metro: 'Oklahoma City Metro', population: 695167, tier: 1, searchVolume: 2000 },
  { id: 'tulsa-ok', city: 'Tulsa', state: 'OK', metro: 'Tulsa Metro', population: 413066, tier: 2, searchVolume: 1200 },
  { id: 'norman-ok', city: 'Norman', state: 'OK', metro: 'Oklahoma City Metro', population: 128026, tier: 3, searchVolume: 250 },
  { id: 'broken-arrow-ok', city: 'Broken Arrow', state: 'OK', metro: 'Tulsa Metro', population: 113540, tier: 3, searchVolume: 150 },
  { id: 'lawton-ok', city: 'Lawton', state: 'OK', metro: 'Lawton Metro', population: 90381, tier: 3, searchVolume: 120 },
  
  // Arkansas
  { id: 'little-rock-ar', city: 'Little Rock', state: 'AR', metro: 'Little Rock Metro', population: 198067, tier: 3, searchVolume: 600 },
  { id: 'fort-smith-ar', city: 'Fort Smith', state: 'AR', metro: 'Fort Smith Metro', population: 89142, tier: 3, searchVolume: 200 },
  { id: 'fayetteville-ar', city: 'Fayetteville', state: 'AR', metro: 'Northwest Arkansas', population: 93949, tier: 3, searchVolume: 250 },
  { id: 'springdale-ar', city: 'Springdale', state: 'AR', metro: 'Northwest Arkansas', population: 84161, tier: 3, searchVolume: 150 },
  { id: 'jonesboro-ar', city: 'Jonesboro', state: 'AR', metro: 'Jonesboro Metro', population: 78576, tier: 3, searchVolume: 120 },
  
  // Louisiana
  { id: 'new-orleans-la', city: 'New Orleans', state: 'LA', metro: 'New Orleans Metro', population: 383997, tier: 1, searchVolume: 1800 },
  { id: 'baton-rouge-la', city: 'Baton Rouge', state: 'LA', metro: 'Baton Rouge Metro', population: 227470, tier: 3, searchVolume: 700 },
  { id: 'shreveport-la', city: 'Shreveport', state: 'LA', metro: 'Shreveport Metro', population: 187593, tier: 3, searchVolume: 400 },
  { id: 'lafayette-la', city: 'Lafayette', state: 'LA', metro: 'Lafayette Metro', population: 121374, tier: 3, searchVolume: 350 },
  { id: 'lake-charles-la', city: 'Lake Charles', state: 'LA', metro: 'Lake Charles Metro', population: 84872, tier: 3, searchVolume: 200 },
  
  // Mississippi
  { id: 'jackson-ms', city: 'Jackson', state: 'MS', metro: 'Jackson Metro', population: 153701, tier: 3, searchVolume: 500 },
  { id: 'gulfport-ms', city: 'Gulfport', state: 'MS', metro: 'Gulfport Metro', population: 72926, tier: 3, searchVolume: 200 },
  { id: 'southaven-ms', city: 'Southaven', state: 'MS', metro: 'Memphis Metro', population: 55026, tier: 3, searchVolume: 100 },
  { id: 'hattiesburg-ms', city: 'Hattiesburg', state: 'MS', metro: 'Hattiesburg Metro', population: 48730, tier: 3, searchVolume: 120 },
  { id: 'biloxi-ms', city: 'Biloxi', state: 'MS', metro: 'Gulfport Metro', population: 49449, tier: 3, searchVolume: 150 },
  
  // Alabama
  { id: 'birmingham-al', city: 'Birmingham', state: 'AL', metro: 'Birmingham Metro', population: 200733, tier: 3, searchVolume: 800 },
  { id: 'montgomery-al', city: 'Montgomery', state: 'AL', metro: 'Montgomery Metro', population: 200603, tier: 3, searchVolume: 500 },
  { id: 'huntsville-al', city: 'Huntsville', state: 'AL', metro: 'Huntsville Metro', population: 215006, tier: 3, searchVolume: 600 },
  { id: 'mobile-al', city: 'Mobile', state: 'AL', metro: 'Mobile Metro', population: 187041, tier: 3, searchVolume: 400 },
  { id: 'tuscaloosa-al', city: 'Tuscaloosa', state: 'AL', metro: 'Tuscaloosa Metro', population: 101129, tier: 3, searchVolume: 250 },
  
  // Kentucky
  { id: 'louisville-ky', city: 'Louisville', state: 'KY', metro: 'Louisville Metro', population: 633045, tier: 2, searchVolume: 1600 },
  { id: 'lexington-ky', city: 'Lexington', state: 'KY', metro: 'Lexington Metro', population: 323780, tier: 2, searchVolume: 800 },
  { id: 'bowling-green-ky', city: 'Bowling Green', state: 'KY', metro: 'Bowling Green Metro', population: 72294, tier: 3, searchVolume: 200 },
  { id: 'owensboro-ky', city: 'Owensboro', state: 'KY', metro: 'Owensboro Metro', population: 60183, tier: 3, searchVolume: 120 },
  { id: 'covington-ky', city: 'Covington', state: 'KY', metro: 'Cincinnati Metro', population: 40691, tier: 3, searchVolume: 100 },
  
  // Indiana
  { id: 'indianapolis-in', city: 'Indianapolis', state: 'IN', metro: 'Indianapolis Metro', population: 876384, tier: 1, searchVolume: 2600 },
  { id: 'fort-wayne-in', city: 'Fort Wayne', state: 'IN', metro: 'Fort Wayne Metro', population: 270402, tier: 3, searchVolume: 600 },
  { id: 'evansville-in', city: 'Evansville', state: 'IN', metro: 'Evansville Metro', population: 118414, tier: 3, searchVolume: 300 },
  { id: 'south-bend-in', city: 'South Bend', state: 'IN', metro: 'South Bend Metro', population: 103395, tier: 3, searchVolume: 250 },
  { id: 'carmel-in', city: 'Carmel', state: 'IN', metro: 'Indianapolis Metro', population: 99757, tier: 3, searchVolume: 200 },
  
  // West Virginia
  { id: 'charleston-wv', city: 'Charleston', state: 'WV', metro: 'Charleston Metro', population: 46536, tier: 3, searchVolume: 200 },
  { id: 'huntington-wv', city: 'Huntington', state: 'WV', metro: 'Huntington Metro', population: 45325, tier: 3, searchVolume: 150 },
  { id: 'morgantown-wv', city: 'Morgantown', state: 'WV', metro: 'Morgantown Metro', population: 30347, tier: 3, searchVolume: 120 },
  { id: 'parkersburg-wv', city: 'Parkersburg', state: 'WV', metro: 'Parkersburg Metro', population: 29749, tier: 3, searchVolume: 80 },
  { id: 'wheeling-wv', city: 'Wheeling', state: 'WV', metro: 'Wheeling Metro', population: 27062, tier: 3, searchVolume: 60 },
  
  // Maine
  { id: 'portland-me', city: 'Portland', state: 'ME', metro: 'Portland Metro', population: 68408, tier: 3, searchVolume: 400 },
  { id: 'lewiston-me', city: 'Lewiston', state: 'ME', metro: 'Lewiston Metro', population: 36158, tier: 3, searchVolume: 120 },
  { id: 'bangor-me', city: 'Bangor', state: 'ME', metro: 'Bangor Metro', population: 31753, tier: 3, searchVolume: 150 },
  { id: 'south-portland-me', city: 'South Portland', state: 'ME', metro: 'Portland Metro', population: 26498, tier: 3, searchVolume: 80 },
  { id: 'auburn-me', city: 'Auburn', state: 'ME', metro: 'Lewiston Metro', population: 24061, tier: 3, searchVolume: 60 },
  
  // New Hampshire
  { id: 'manchester-nh', city: 'Manchester', state: 'NH', metro: 'Manchester Metro', population: 115644, tier: 3, searchVolume: 350 },
  { id: 'nashua-nh', city: 'Nashua', state: 'NH', metro: 'Boston Metro', population: 91322, tier: 3, searchVolume: 200 },
  { id: 'concord-nh', city: 'Concord', state: 'NH', metro: 'Concord Metro', population: 43976, tier: 3, searchVolume: 120 },
  { id: 'derry-nh', city: 'Derry', state: 'NH', metro: 'Boston Metro', population: 34317, tier: 3, searchVolume: 80 },
  { id: 'dover-nh', city: 'Dover', state: 'NH', metro: 'Portsmouth Metro', population: 32741, tier: 3, searchVolume: 100 },
  
  // Vermont
  { id: 'burlington-vt', city: 'Burlington', state: 'VT', metro: 'Burlington Metro', population: 44743, tier: 3, searchVolume: 250 },
  { id: 'south-burlington-vt', city: 'South Burlington', state: 'VT', metro: 'Burlington Metro', population: 20292, tier: 3, searchVolume: 60 },
  { id: 'rutland-vt', city: 'Rutland', state: 'VT', metro: 'Rutland Metro', population: 15807, tier: 3, searchVolume: 50 },
  { id: 'barre-vt', city: 'Barre', state: 'VT', metro: 'Montpelier Metro', population: 8491, tier: 3, searchVolume: 30 },
  { id: 'montpelier-vt', city: 'Montpelier', state: 'VT', metro: 'Montpelier Metro', population: 8074, tier: 3, searchVolume: 40 },
  
  // Rhode Island
  { id: 'providence-ri', city: 'Providence', state: 'RI', metro: 'Providence Metro', population: 190934, tier: 3, searchVolume: 600 },
  { id: 'warwick-ri', city: 'Warwick', state: 'RI', metro: 'Providence Metro', population: 82823, tier: 3, searchVolume: 150 },
  { id: 'cranston-ri', city: 'Cranston', state: 'RI', metro: 'Providence Metro', population: 82934, tier: 3, searchVolume: 120 },
  { id: 'pawtucket-ri', city: 'Pawtucket', state: 'RI', metro: 'Providence Metro', population: 75604, tier: 3, searchVolume: 100 },
  { id: 'east-providence-ri', city: 'East Providence', state: 'RI', metro: 'Providence Metro', population: 47139, tier: 3, searchVolume: 80 },
  
  // Connecticut
  { id: 'bridgeport-ct', city: 'Bridgeport', state: 'CT', metro: 'Bridgeport Metro', population: 148654, tier: 3, searchVolume: 400 },
  { id: 'new-haven-ct', city: 'New Haven', state: 'CT', metro: 'New Haven Metro', population: 133897, tier: 3, searchVolume: 350 },
  { id: 'stamford-ct', city: 'Stamford', state: 'CT', metro: 'Bridgeport Metro', population: 135470, tier: 3, searchVolume: 300 },
  { id: 'hartford-ct', city: 'Hartford', state: 'CT', metro: 'Hartford Metro', population: 121054, tier: 3, searchVolume: 300 },
  { id: 'waterbury-ct', city: 'Waterbury', state: 'CT', metro: 'Waterbury Metro', population: 114403, tier: 3, searchVolume: 200 },
  
  // Delaware
  { id: 'wilmington-de', city: 'Wilmington', state: 'DE', metro: 'Philadelphia Metro', population: 70851, tier: 3, searchVolume: 200 },
  { id: 'dover-de', city: 'Dover', state: 'DE', metro: 'Dover Metro', population: 38079, tier: 3, searchVolume: 80 },
  { id: 'newark-de', city: 'Newark', state: 'DE', metro: 'Philadelphia Metro', population: 31454, tier: 3, searchVolume: 60 },
  { id: 'middletown-de', city: 'Middletown', state: 'DE', metro: 'Philadelphia Metro', population: 23192, tier: 3, searchVolume: 40 },
  { id: 'smyrna-de', city: 'Smyrna', state: 'DE', metro: 'Philadelphia Metro', population: 12883, tier: 3, searchVolume: 20 },
  
  // Maryland
  { id: 'baltimore-md', city: 'Baltimore', state: 'MD', metro: 'Baltimore Metro', population: 576498, tier: 1, searchVolume: 2200 },
  { id: 'frederick-md', city: 'Frederick', state: 'MD', metro: 'DC Metro', population: 78289, tier: 3, searchVolume: 200 },
  { id: 'rockville-md', city: 'Rockville', state: 'MD', metro: 'DC Metro', population: 67117, tier: 3, searchVolume: 150 },
  { id: 'gaithersburg-md', city: 'Gaithersburg', state: 'MD', metro: 'DC Metro', population: 69657, tier: 3, searchVolume: 120 },
  { id: 'bowie-md', city: 'Bowie', state: 'MD', metro: 'DC Metro', population: 58329, tier: 3, searchVolume: 100 },
  
  // Washington DC
  { id: 'washington-dc', city: 'Washington', state: 'DC', metro: 'DC Metro', population: 689545, tier: 1, searchVolume: 3800 },
  
  // Additional high-opportunity college towns and resort areas
  { id: 'ann-arbor-mi', city: 'Ann Arbor', state: 'MI', metro: 'Detroit Metro', population: 123851, tier: 3, searchVolume: 500 },
  { id: 'boulder-co', city: 'Boulder', state: 'CO', metro: 'Denver Metro', population: 108250, tier: 3, searchVolume: 400 },
  { id: 'college-station-tx', city: 'College Station', state: 'TX', metro: 'Bryan Metro', population: 120511, tier: 3, searchVolume: 200 },
  { id: 'gainesville-fl', city: 'Gainesville', state: 'FL', metro: 'Gainesville Metro', population: 141085, tier: 3, searchVolume: 350 },
  { id: 'athens-ga', city: 'Athens', state: 'GA', metro: 'Athens Metro', population: 127315, tier: 3, searchVolume: 300 },
  { id: 'tuscaloosa-al', city: 'Tuscaloosa', state: 'AL', metro: 'Tuscaloosa Metro', population: 101129, tier: 3, searchVolume: 200 },
  { id: 'iowa-city-ia', city: 'Iowa City', state: 'IA', metro: 'Iowa City Metro', population: 75130, tier: 3, searchVolume: 150 },
  { id: 'eugene-or', city: 'Eugene', state: 'OR', metro: 'Eugene Metro', population: 176654, tier: 3, searchVolume: 300 },
  { id: 'fayetteville-ar', city: 'Fayetteville', state: 'AR', metro: 'Northwest Arkansas', population: 93949, tier: 3, searchVolume: 150 },
  { id: 'bloomington-in', city: 'Bloomington', state: 'IN', metro: 'Bloomington Metro', population: 85755, tier: 3, searchVolume: 200 },
  { id: 'columbia-mo', city: 'Columbia', state: 'MO', metro: 'Columbia Metro', population: 126254, tier: 3, searchVolume: 250 },
  { id: 'normal-il', city: 'Normal', state: 'IL', metro: 'Bloomington Metro', population: 54264, tier: 3, searchVolume: 100 },
  { id: 'state-college-pa', city: 'State College', state: 'PA', metro: 'State College Metro', population: 42289, tier: 3, searchVolume: 200 },
  { id: 'manhattan-ks', city: 'Manhattan', state: 'KS', metro: 'Manhattan Metro', population: 54100, tier: 3, searchVolume: 100 },
  { id: 'ames-ia', city: 'Ames', state: 'IA', metro: 'Ames Metro', population: 66427, tier: 3, searchVolume: 150 },
  { id: 'champaign-il', city: 'Champaign', state: 'IL', metro: 'Champaign Metro', population: 88302, tier: 3, searchVolume: 200 },
  { id: 'west-lafayette-in', city: 'West Lafayette', state: 'IN', metro: 'Lafayette Metro', population: 44595, tier: 3, searchVolume: 100 },
  { id: 'morgantown-wv', city: 'Morgantown', state: 'WV', metro: 'Morgantown Metro', population: 30347, tier: 3, searchVolume: 150 },
  { id: 'missoula-mt', city: 'Missoula', state: 'MT', metro: 'Missoula Metro', population: 75516, tier: 3, searchVolume: 200 },
  
  // Beach/resort areas with high beauty service demand
  { id: 'virginia-beach-va', city: 'Virginia Beach', state: 'VA', metro: 'Hampton Roads', population: 459470, tier: 2, searchVolume: 1200 },
  { id: 'myrtle-beach-sc', city: 'Myrtle Beach', state: 'SC', metro: 'Myrtle Beach Metro', population: 35682, tier: 3, searchVolume: 600 },
  { id: 'panama-city-fl', city: 'Panama City', state: 'FL', metro: 'Panama City Metro', population: 36877, tier: 3, searchVolume: 300 },
  { id: 'ocean-city-md', city: 'Ocean City', state: 'MD', metro: 'Ocean City Metro', population: 6844, tier: 3, searchVolume: 400 },
  { id: 'outer-banks-nc', city: 'Outer Banks', state: 'NC', metro: 'Outer Banks', population: 35000, tier: 3, searchVolume: 300 },
  { id: 'rehoboth-beach-de', city: 'Rehoboth Beach', state: 'DE', metro: 'Sussex County', population: 1108, tier: 3, searchVolume: 200 },
  { id: 'gulf-shores-al', city: 'Gulf Shores', state: 'AL', metro: 'Baldwin County', population: 15014, tier: 3, searchVolume: 250 },
  { id: 'destin-fl', city: 'Destin', state: 'FL', metro: 'Crestview Metro', population: 14495, tier: 3, searchVolume: 350 },
  { id: 'key-west-fl', city: 'Key West', state: 'FL', metro: 'Key West Metro', population: 31401, tier: 3, searchVolume: 400 },
  { id: 'hilton-head-sc', city: 'Hilton Head', state: 'SC', metro: 'Hilton Head Metro', population: 37661, tier: 3, searchVolume: 500 }
] as const;

export type ExpandedLocationId = typeof EXPANDED_SEO_LOCATIONS[number]['id'];

// Helper functions for advanced location targeting
export function getLocationsByTier(tier: 1 | 2 | 3): typeof EXPANDED_SEO_LOCATIONS[number][] {
  return EXPANDED_SEO_LOCATIONS.filter(loc => loc.tier === tier);
}

export function getLocationsByState(state: string): typeof EXPANDED_SEO_LOCATIONS[number][] {
  return EXPANDED_SEO_LOCATIONS.filter(loc => loc.state === state);
}

export function getLocationsByMetro(metro: string): typeof EXPANDED_SEO_LOCATIONS[number][] {
  return EXPANDED_SEO_LOCATIONS.filter(loc => loc.metro === metro);
}

export function getHighVolumeLocations(minSearchVolume: number = 1000): typeof EXPANDED_SEO_LOCATIONS[number][] {
  return EXPANDED_SEO_LOCATIONS.filter(loc => loc.searchVolume >= minSearchVolume);
}

// Generate location-specific SEO metadata
export function getLocationMetadata(locationId: ExpandedLocationId, service?: string) {
  const location = EXPANDED_SEO_LOCATIONS.find(loc => loc.id === locationId);
  if (!location) return null;
  
  const serviceSuffix = service ? ` ${service}` : ' Beauty';
  
  return {
    title: `${serviceSuffix} Jobs in ${location.city}, ${location.state} | EmviApp`,
    description: `Find premium${serviceSuffix.toLowerCase()} jobs in ${location.city}, ${location.state}. Browse high-paying opportunities at top salons and spas. ${location.population.toLocaleString()} residents, ${location.searchVolume} monthly searches. Apply today!`,
    keywords: [
      `${serviceSuffix.toLowerCase()} jobs ${location.city}`,
      `${serviceSuffix.toLowerCase()} careers ${location.city} ${location.state}`,
      `${location.city}${serviceSuffix.toLowerCase()} positions`,
      `${location.city} ${location.state}${serviceSuffix.toLowerCase()} hiring`,
      `${serviceSuffix.toLowerCase()} near me ${location.city}`,
      `${location.metro}${serviceSuffix.toLowerCase()} jobs`
    ],
    structuredData: {
      "@type": "Place",
      "name": `${location.city}, ${location.state}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location.city,
        "addressRegion": location.state,
        "addressCountry": "US"
      },
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": location.metro
      }
    }
  };
}

// Geographic clustering for internal linking
export const GEOGRAPHIC_CLUSTERS = {
  'california': ['los-angeles-ca', 'san-francisco-ca', 'san-diego-ca', 'sacramento-ca', 'fresno-ca', 'long-beach-ca', 'oakland-ca', 'san-jose-ca'],
  'texas': ['houston-tx', 'dallas-tx', 'austin-tx', 'san-antonio-tx', 'fort-worth-tx', 'el-paso-tx', 'arlington-tx'],
  'florida': ['miami-fl', 'tampa-fl', 'orlando-fl', 'jacksonville-fl', 'fort-lauderdale-fl', 'tallahassee-fl', 'gainesville-fl'],
  'northeast': ['new-york-ny', 'philadelphia-pa', 'boston-ma', 'washington-dc', 'baltimore-md', 'buffalo-ny', 'pittsburgh-pa'],
  'midwest': ['chicago-il', 'detroit-mi', 'columbus-oh', 'indianapolis-in', 'milwaukee-wi', 'cleveland-oh', 'kansas-city-mo'],
  'southeast': ['atlanta-ga', 'charlotte-nc', 'nashville-tn', 'raleigh-nc', 'memphis-tn', 'birmingham-al', 'louisville-ky'],
  'southwest': ['phoenix-az', 'denver-co', 'las-vegas-nv', 'albuquerque-nm', 'oklahoma-city-ok', 'tucson-az', 'colorado-springs-co'],
  'northwest': ['seattle-wa', 'portland-or', 'spokane-wa', 'salem-or', 'eugene-or', 'tacoma-wa', 'vancouver-wa'],
  'mountain': ['salt-lake-city-ut', 'boise-id', 'billings-mt', 'casper-wy', 'rapid-city-sd', 'grand-forks-nd'],
  'college-towns': ['ann-arbor-mi', 'boulder-co', 'college-station-tx', 'gainesville-fl', 'athens-ga', 'tuscaloosa-al', 'iowa-city-ia'],
  'resort-areas': ['virginia-beach-va', 'myrtle-beach-sc', 'panama-city-fl', 'ocean-city-md', 'outer-banks-nc', 'destin-fl', 'key-west-fl']
};

export function getClusterLocations(locationId: ExpandedLocationId): ExpandedLocationId[] {
  for (const [cluster, locations] of Object.entries(GEOGRAPHIC_CLUSTERS)) {
    if (locations.includes(locationId as any)) {
      return locations.filter(loc => loc !== locationId) as ExpandedLocationId[];
    }
  }
  return [];
}