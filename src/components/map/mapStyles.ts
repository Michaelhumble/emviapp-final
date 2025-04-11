
// Default map styles for Google Maps
export const defaultMapStyles = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { color: "#e9e9e9" },
      { lightness: 17 }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      { color: "#f5f5f5" },
      { lightness: 20 }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      { color: "#ffffff" },
      { lightness: 17 }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#ffffff" },
      { lightness: 29 },
      { weight: 0.2 }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { color: "#ffffff" },
      { lightness: 18 }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      { color: "#ffffff" },
      { lightness: 16 }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      { color: "#f5f5f5" },
      { lightness: 21 }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      { color: "#dedede" },
      { lightness: 21 }
    ]
  }
];
