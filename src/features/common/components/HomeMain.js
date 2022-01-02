
import React from 'react';
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Flash from 'react-reveal/Flash';
import "features/common/style/HomeMainStyle.scss"
import Snow from './Snow';


export default function HomeMain() {
  const CarouselUI = ({ children }) => <Container>{children}</Container>;
  const Carousel = makeCarousel(CarouselUI);

  return (
    
    <div className="hmp">
      
      {/* <h1>
        <Fade left cascade>
          = 당신의 하나뿐인 개인비서 자비스에 오신 걸 환영합니다 =
        </Fade>
      </h1> */}

      <Flash ><h3>Happy New Year <br/> HM & JH & IS  </h3>
      <span role="emoji" aria-lavel="tree" style={{fontSize:"30vh"}}>트리</span>
      </Flash>
      
      
      {/* <Carousel defaultWait={5000}>  */}
        {/* <Slide right>
          <div>
            <img
              src={require("features/common/images/me.png").default } /> 팀장 안주현입니다 
          </div>
        </Slide>
        <Slide right>
          <div>
            <img
              className="jarviis-img"
              src={require("features/common/images/Be with you-001.png").default} 
            />혜민쓰
          </div>
        </Slide>
        <Slide right>
          <div>
            <img
              src={require("features/common/images/running.gif").default}
            /> 인성쓰
          </div>
        </Slide> */}
      {/* </Carousel> */}
    </div>

  );
}
const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 1629px;
  height: 448px;
  right: 564px;
  top: 115px
  text-align: center;
`
