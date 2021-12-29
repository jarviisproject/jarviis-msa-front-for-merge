import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { useState, React, useEffect } from 'react'
import EventMarkerContainer from './EventMarkerContainer';
import { useSelector } from 'react-redux';

function HistoryMap(props) {
  // const map = useMap()
  // const [map, setMap] = useState()

  const t = props.data
  const [isOpen, setIsOpen] = useState(false)

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })
  // let points = useSelector(state => state.history.historyData.map(
  //   x => {
  //     return {
  //       content: <div style={{ padding: "5px", color: "#000" }}>{x.name}</div>,
  //       latlng: { lat: x.latitude, lng: x.longitude }
  //     }
  //   }
  // ))
  const points = t.map(
    x => {
      console.log(`x.location :: ${JSON.stringify(x.location)}`)
      return {
        content: <div style={{ padding: "5px", color: "#000" }}>{JSON.stringify(x.location)}</div>,
        // latlng: { lat: parseFloat(x.y), lng: parseFloat(x.x) }
        // latlng: { lat: parseFloat(x.x), lng: parseFloat(x.y) }
        latlng: { lat: Math.floor(x.y * 1000000) /1000000, lng: Math.floor(x.x * 1000000) /1000000 }
      }
    }
  )

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "현재 위치를 찾을수없습니다.",
        isLoading: false,
      }))
    }
  }, [])

  return (
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "95%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
      >
        {!state.isLoading && (
          // <MapMarker position={state.center}>
          // </MapMarker>
          <MapMarker
            position={{ lat: state.center.lat, lng: state.center.lng }}
            // title='현재 위치'
            image={{
              // 무료 마커이미지의 주소: https://www.flaticon.com/kr/
              // src: "https://cdn-icons.flaticon.com/png/512/5693/premium/5693914.png?token=exp=1637741898~hmac=fada3fe37d0197cf397c5d7713400e95",
              // src: "https://cdn-icons.flaticon.com/png/512/5693/premium/5693889.png?token=exp=1640321865~hmac=62f8675abb29add857f5350b5ba27672",
              src: "https://cdn-icons-png.flaticon.com/512/5015/5015093.png",

              size: {
                width: 45,
                height: 45,
              },
              options: {
                offset: {
                  x: 25,
                  y: 45,
                },
              },
            }}
            // onClick={(marker) => map.panTo(marker.getPosition())}
            onMouseOver={() => setIsOpen(true)}
            onMouseOut={() => setIsOpen(false)}
          >{isOpen && <div style={{ padding: "5px", color: "#000" }}>내 위치</div>}</MapMarker>
        )}
        {points.map((value) => (
            <EventMarkerContainer
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
              position={value.latlng}
              content={value.content}
            />
        ))}
      </Map>
  )
}
export default HistoryMap;