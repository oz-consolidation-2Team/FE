import React, { useEffect } from 'react';


/**
 * 카카오맵 표시 컴포넌트
 * @param {number} latitude - 위도
 * @param {number} longitude - 경도
 * @param {string} workPlaceName - 근무지 이름
 */
const KakaoMap = ({ latitude, longitude, workPlaceName }) => {
  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }

    const loadKakaoMapScript = (callback) => {
      const existingScript = document.getElementById('kakao-map-script');
      if (existingScript) {
        if (window.kakao?.maps) callback();
        return;
      }

      const script = document.createElement('script');

      script.id = 'kakao-map-script';
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(callback);
      };
      script.onerror = () => {
      };
      document.head.appendChild(script);
    };

    loadKakaoMapScript(() => {
      const lat = latitude;
      const lng = longitude;

      const container = document.getElementById('map');
      if (!container) {
        return;
      }

      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 1,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

      const map = new window.kakao.maps.Map(container, options);
      map.setDraggable(false);
      map.setZoomable(false);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        map: map,
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${workPlaceName || '근무지 위치'}</div>`,
      });

      infowindow.open(map, marker);
    });
  }, [latitude, longitude, workPlaceName]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '340px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    ></div>
  );
};

export default KakaoMap;