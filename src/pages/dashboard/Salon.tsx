
export default function SalonDashboard() {
  // Force cache invalidation
  console.log('🚨 NEW SALON DASHBOARD LOADED - TIMESTAMP:', new Date().toISOString());
  console.log('🚨 If you see the old UI, this is a platform caching bug!');
  
  const timestamp = Date.now();
  
  return (
    <div style={{ 
      color: "lime", 
      fontSize: 36, 
      margin: 40,
      backgroundColor: "black",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center"
    }}>
      <h1>🚨 NEW SALON DASHBOARD - CACHE BUSTER 🚨</h1>
      <p style={{ fontSize: 20, marginTop: 20 }}>
        Timestamp: {timestamp}
      </p>
      <p style={{ fontSize: 16, color: "yellow", marginTop: 10 }}>
        If you see ANY other UI, this is a platform caching bug!
      </p>
    </div>
  );
}
