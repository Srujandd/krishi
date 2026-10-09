import { GpsCoordinates } from '../types/farm';

export const REGIONAL_GPS_PRESETS: GpsCoordinates[] = [
  {
    latitude: 21.5222,
    longitude: 70.4579,
    accuracyMeters: 4.2,
    altitudeMeters: 107,
    district: 'Junagadh (Saurashtra)',
    state: 'Gujarat',
    agroClimaticZone: 'Zone XIII — Gujarat Plains & Hills (Groundnut-Cotton Belt)',
    updatedAt: new Date().toISOString(),
    isSimulated: true,
  },
  {
    latitude: 22.5645,
    longitude: 72.9289,
    accuracyMeters: 3.8,
    altitudeMeters: 39,
    district: 'Anand (Charotar)',
    state: 'Gujarat',
    agroClimaticZone: 'Middle Gujarat Agro-Climatic Zone III (Loamy Alluvial)',
    updatedAt: new Date().toISOString(),
    isSimulated: true,
  },
  {
    latitude: 23.805,
    longitude: 72.3933,
    accuracyMeters: 5.1,
    altitudeMeters: 112,
    district: 'Unjha / Mehsana',
    state: 'Gujarat',
    agroClimaticZone: 'North Gujarat Arid-Semi Arid Zone IV (Cumin-Wheat Belt)',
    updatedAt: new Date().toISOString(),
    isSimulated: true,
  },
];

export async function acquireBrowserGps(): Promise<GpsCoordinates> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    return REGIONAL_GPS_PRESETS[0];
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: Number(pos.coords.latitude.toFixed(5)),
          longitude: Number(pos.coords.longitude.toFixed(5)),
          accuracyMeters: Number((pos.coords.accuracy || 6.5).toFixed(1)),
          altitudeMeters: pos.coords.altitude ? Math.round(pos.coords.altitude) : 85,
          district: 'Live Field Coordinate Lock',
          state: 'India (WGS84 GNSS)',
          agroClimaticZone: 'Verified Live Satellite Fix',
          updatedAt: new Date().toISOString(),
          isSimulated: false,
        });
      },
      () => {
        resolve({
          ...REGIONAL_GPS_PRESETS[0],
          updatedAt: new Date().toISOString(),
        });
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 10000 }
    );
  });
}
