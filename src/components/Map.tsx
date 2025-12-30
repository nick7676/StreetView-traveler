import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([44.1490613, 8.1632221], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current);

    const points: L.LatLngExpression[] = [
      [44.1490613, 8.1632221],
      [44.1493174, 8.163466],
    ];

    const getRoute = async (
      start: L.LatLngExpression,
      end: L.LatLngExpression
    ) => {
      const [lat1, lng1] = start as [number, number];
      const [lat2, lng2] = end as [number, number];

      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?geometries=geojson`
      );
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates.map(
          ([lng, lat]: [number, number]) => [lat, lng]
        );
        L.polyline(coords, { color: "red", weight: 3, opacity: 0.7 }).addTo(
          mapInstanceRef.current!
        );
      }
    };
    (async () => {
      for (let i = 0; i < points.length - 1; i++) {
        await getRoute(points[i], points[i + 1]);
      }
    })();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapRef} id="map" style={{ height: "100vh", width: "100%" }} />
  );
}
