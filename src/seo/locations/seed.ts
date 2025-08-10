export const ROLES = ["nails","hair","esthetics","brows-lashes","makeup","barber"] as const;

export const CITIES: Array<{city:string,state:string,slug:string,nearby:string[]}> = [
  { city:"New York",      state:"NY", slug:"new-york-ny",      nearby:["jersey-city-nj","newark-nj","brooklyn-ny"] },
  { city:"Los Angeles",   state:"CA", slug:"los-angeles-ca",   nearby:["glendale-ca","pasadena-ca","long-beach-ca"] },
  { city:"Chicago",       state:"IL", slug:"chicago-il",       nearby:["oak-park-il","evanston-il","skokie-il"] },
  { city:"Houston",       state:"TX", slug:"houston-tx",       nearby:["katy-tx","sugar-land-tx","pearland-tx"] },
  { city:"Dallas",        state:"TX", slug:"dallas-tx",        nearby:["plano-tx","irving-tx","garland-tx"] },
  { city:"Phoenix",       state:"AZ", slug:"phoenix-az",       nearby:["mesa-az","chandler-az","scottsdale-az"] },
  { city:"San Antonio",   state:"TX", slug:"san-antonio-tx",   nearby:["schertz-tx","new-braunfels-tx","converse-tx"] },
  { city:"San Diego",     state:"CA", slug:"san-diego-ca",     nearby:["chula-vista-ca","la-mesa-ca","el-cajon-ca"] },
  { city:"San Jose",      state:"CA", slug:"san-jose-ca",      nearby:["santa-clara-ca","sunnyvale-ca","milpitas-ca"] },
  { city:"Philadelphia",  state:"PA", slug:"philadelphia-pa",  nearby:["camden-nj","king-of-prussia-pa","ardmore-pa"] },
  { city:"Austin",        state:"TX", slug:"austin-tx",        nearby:["round-rock-tx","cedar-park-tx","pflugerville-tx"] },
  { city:"Jacksonville",  state:"FL", slug:"jacksonville-fl",  nearby:["orange-park-fl","st-augustine-fl","baldwin-fl"] },
  { city:"Fort Worth",    state:"TX", slug:"fort-worth-tx",    nearby:["arlington-tx","north-richland-hills-tx","keller-tx"] },
  { city:"Columbus",      state:"OH", slug:"columbus-oh",      nearby:["dublin-oh","westerville-oh","grove-city-oh"] },
  { city:"Charlotte",     state:"NC", slug:"charlotte-nc",     nearby:["concord-nc","gastonia-nc","monroe-nc"] },
  { city:"San Francisco", state:"CA", slug:"san-francisco-ca", nearby:["oakland-ca","daly-city-ca","berkeley-ca"] },
  { city:"Indianapolis",  state:"IN", slug:"indianapolis-in",  nearby:["carmel-in","fishers-in","greenwood-in"] },
  { city:"Seattle",       state:"WA", slug:"seattle-wa",       nearby:["bellevue-wa","redmond-wa","kirkland-wa"] },
  { city:"Denver",        state:"CO", slug:"denver-co",        nearby:["aurora-co","lakewood-co","arvada-co"] },
  { city:"Washington",    state:"DC", slug:"washington-dc",    nearby:["arlington-va","alexandria-va","silver-spring-md"] },
  { city:"Boston",        state:"MA", slug:"boston-ma",        nearby:["cambridge-ma","somerville-ma","quincy-ma"] },
  { city:"Nashville",     state:"TN", slug:"nashville-tn",     nearby:["franklin-tn","hendersonville-tn","smyrna-tn"] },
  { city:"Detroit",       state:"MI", slug:"detroit-mi",       nearby:["dearborn-mi","southfield-mi","warren-mi"] },
  { city:"Oklahoma City", state:"OK", slug:"oklahoma-city-ok", nearby:["edmond-ok","moore-ok","norman-ok"] },
  { city:"Portland",      state:"OR", slug:"portland-or",      nearby:["beaverton-or","gresham-or","hillsboro-or"] }
];
