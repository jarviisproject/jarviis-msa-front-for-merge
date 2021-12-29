import React, { useState } from "react"
import { MapMarker, useMap } from "react-kakao-maps-sdk"

export default function EventMarkerContainer({ position, content }) {
  // console.log(`position :: ${JSON.stringify(position)}`)
  // console.log(`content :: ${content.value}`)
    const map = useMap()
    const [isVisible, setIsVisible] = useState(false)
  
    return (
      <MapMarker
        position={position}
        image={{
          // src: "https://cdn-icons.flaticon.com/png/512/3536/premium/3536102.png?token=exp=1640324210~hmac=37defd75f64c8958befc3ca41a0f62c2", 
          // src: "https://cdn-icons.flaticon.com/png/512/3536/premium/3536102.png?token=exp=1640321729~hmac=bd9cdf6ba04c97f2a3cdd984b2607bc6", 
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
        // onClick={(marker) => {
        //   console.log(content)
        //   map.panTo(marker.getPosition())}}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    )
  }