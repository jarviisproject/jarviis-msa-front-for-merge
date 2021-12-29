import React, { useEffect, useState } from "react";
import nor1 from 'features/review/garden/images/normal/1.png'
import nor2 from 'features/review/garden/images/normal/2.png'
import nor3 from 'features/review/garden/images/normal/3.png'
import red4 from 'features/review/garden/images/red/4.png'
import red5 from 'features/review/garden/images/red/5.png'
import purple4 from 'features/review/garden/images/purple/4.png'
import purple5 from 'features/review/garden/images/purple/5.png'
import blue4 from 'features/review/garden/images/blue/4.png'
import blue5 from 'features/review/garden/images/blue/5.png'
import 'features/review/style/gridStyle.scss'
import { useDispatch, useSelector } from "react-redux";
import { flowerListRequest, routineRequest } from "features/review/reducer/gardenSlice";
import { values } from "lodash";
import Button from '@mui/material/Button';


export default function Flower() {
    const [counter, setCounter] = useState(0)
    const grow = (grade, color) => {
        if (grade === "1") {
            return (<img className='flower-img' src={nor1} />)
        } if (grade === "2") {
            return (<img className='flower-img' src={nor2} />)
        } if (grade === "3") {
            return (<img className='flower-img' src={nor3} />)
        } if (grade === "4") {
            if (color === "RED") {
                return (<img className='flower-img' src={red4} />)
            }
            if (color === "BLUE") {
                return (<img className='flower-img' src={blue4} />)
            }
            else {
                return (<img className='flower-img' src={purple4} />)
            }
        } if (grade === "5") {
            if (color === "RED") {
                return (<img className='flower-img' src={red5} />)
            }
            if (color === "BLUE") {
                return (<img className='flower-img' src={blue5} />)
            }
            else {
                return (<img className='flower-img' src={purple5} />)
            }
        } else {
            return (<></>)
        }
    }
    const [flower, setFlower] = useState(
        {
            data:
            {
                "id": "1",
                "create_date": "2021-12-13 16:56:53.704187+00:00",
                "update_date": "2021-12-13 16:56:53.704187+00:00",
                "title": "작업",
                "grade": "0",
                "step": "1",
                "color": "YELLOW",
                "log_id": "[15]",
                "event_id": null,
                "user_id": "1"
            }
        }
    )
    useEffect(() => {
        dispatch(flowerListRequest({
            user_id: 1,
        }))
    }, []);
    const dispatch = useDispatch()
    const flowers = useSelector(state => state.garden.gardenData)
    if (flowers != null && counter < 1) {
        setCounter(counter + 1)
        setFlower(flowers.data)
    }
    return (
        <div>
            <Button type="submit" variant="text"
          onClick={
            () => {
              dispatch(routineRequest({
                user_id : 1
              }))
            }
          } >오늘 루틴과 꽃 만들기</Button>
            {/* <h2>지금까지 키운 꽃 :</h2>
            {Object.keys(flower).map((value, index, array) => (
                <p><b>{flower[value].title}</b> :: {flower[value].step} 회</p>
            ))} */}
            {Object.keys(flower).map((value, index, array) => (
                <div>
                    {flower[value].grade == 0 ? <></>
                        : <div className="flower-div" >
                            <h1>{flower[value].title} 꽃을 키워보자!</h1>
                            <div>{grow(flower[value].grade, flower[value].color)}</div>
                            <p>GRADE : {flower[value].grade}</p>
                            <p>STEP : {flower[value].step}</p>
                        </div>}
                </div>
            ))}
        </div >
    )
}