import React, { useEffect, useState } from "react";
import sunny from "features/diary/images/sunny.png";
import diaryimg from "features/diary/images/a.png";
import "features/common/font/font.scss";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LayOut } from "features/common";
import "features/diary/style/Diary.scss";
import { DatePicker } from "@mui/lab";
// import DiaryDetail from "./DiaryDetail";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { diaryFindRequest } from "features/diary/reducer/diarySlice";
import dayjs from "dayjs";
import MemoModify from "features/diary/components/MemoModify"
import 'features/diary/style/DiaryText.scss'
import JsxDiary from "./JsxDiary";
import { Link } from "react-router-dom";

export default function PrevDiary() {
  const findDiary = useSelector(state => state.diary.diaryData)
  const dateFormat = (date) => dayjs(date).format("YYYY-MM-DD");
  const testDate1 = new Date(findDiary.data.diary_date)
  // window.localStorage.setItem("sessionDiaryDate", dateFormat(new Date(testDate1.setDate(testDate1.getDate() - 1))))
  // const testDate = window.localStorage.getItem("sessionDiaryDate")
  // const findDate = new Date(testDate)
  alert(`세션 :: ${testDate1}`)
  const today = new Date();
  // const [findDate, setFindDate] = useState(new Date(testDate));
  const [diary, setDiary] = useState(
    { data: {} }
  )
  const dispatch = useDispatch()
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    initManuscript(),
      setCounter(0),
      dispatch(diaryFindRequest({
        user_id: 1,
        diary_date: dateFormat(new Date(testDate1.setDate(testDate1.getDate() - 1)))
      }))
  }, []);
  alert(`counter ${counter}`)
  alert(`결국 데이터 제발 :: ${JSON.stringify(findDiary.data)}`)
  // if (findDiary != null && counter < 2) {
  if (dateFormat(findDiary.data.diary_date) == dateFormat(new Date(testDate1))  && counter < 1) {
    alert(`비교 :: ${dateFormat(new Date(testDate1))}`)
    setCounter(counter + 1)
    setDiary(findDiary.data)
  }
  else if (findDiary.data.process == "Nothing") {
    alert("Nothing!")
  }
  const [mode, setMode] = useState(0)
  function initManuscript() {
    const manuscript = document.querySelectorAll(".manuscript");
    const handleResize = () => {
      manuscript.forEach((elt) => {
        resizeMnuascriptContainer(elt);
        resizeImage(elt);
      });
    };

    window.addEventListener("load", handleResize, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    manuscript.forEach((element) => {
      element.querySelectorAll("p").forEach((element) => {
        const text = element.innerText;

        element.innerHTML = "";
        [...text].forEach((word) => {
          const span = document.createElement("span");
          const textNode = document.createTextNode(word);

          span.appendChild(textNode);
          element.append(span);
        });
      });
    });

    handleResize();
  }
  function resizeMnuascriptContainer(element) {
    element.style.width = `${(Math.floor(element.parentElement.offsetWidth / 24) - 1) * 24 - 1
      }px`;
  }

  function resizeImage(element) {
    element.querySelectorAll("img").forEach((img) => {
      const { naturalWidth, naturalHeight } = img;
      const ratio = naturalHeight / naturalWidth;
      const newHeight = element.offsetWidth * ratio;

      img.height = Math.floor(newHeight - (newHeight % 32) - 8);
    });
  }

  initManuscript();
  // const updateDate = e => {

  // }


  return (
    <LayOut>
      <div className="dp">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow></TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" style={{ width: "15vw" }}>
                  <Link to="/diary/prev" >
                    <img
                      class="wobble-hor-bottom"
                      style={{ width: "4vw", cursor: "pointer" }}
                      src={
                        require("features/diary/images/fingerl.png").default
                      }
                       /></Link>
                </TableCell>
                <TableCell>
                  <div className="Watch">
                    <div style={{ borderCollapse: "collapse" }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          views={["day"]}
                          label="날짜 이동"
                          value={testDate1}
                          maxDate={today}
                          onChange={(newValue) => {
                            // setFindDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center" style={{ width: "30%" }}>
                  <DiarySmallText>
                    {testDate1.toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}
                  </DiarySmallText>
                </TableCell>
                <TableCell style={{ textAlign: "center", width: "15%" }}>
                  <Link to="/diary/diary" >
                    <img
                      style={{ width: "16vw", cursor: "pointer" }}
                      src={require("features/diary/images/today.png").default}
                    /></Link>
                </TableCell>
                <TableCell align="center">
                  <DiarySmallText>{diary.weather}</DiarySmallText>
                  <img style={{ width: "5vw" }} src={sunny} />
                </TableCell>
                <TableCell align="center" style={{ width: "15%" }}>
                  {testDate1.getDate() < today.getDate() ?
                    (
                      <><Link to="/diary/next" >
                        <img
                          class="wobble-hor-bottom"
                          style={{
                            width: "4vw",
                            cursor: "pointer",
                            visibility: "visible",
                          }}
                          src={
                            require("features/diary/images/fingerr.png")
                              .default
                          }
                          onClick={
                        window.localStorage.setItem("sessionDiaryDate", dateFormat(new Date(findDate.setDate(findDate.getDate() + 1))))

                          }
                        /></Link>
                      </>
                    ) : (
                      <img
                        class="wobble-hor-bottom"
                        style={{
                          width: "20%",
                          cursor: "pointer",
                          visibility: "hidden",
                        }}
                        src={
                          require("features/diary/images/fingerr.png").default
                        }
                      />
                    )}
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: 0, textAlign: "center" }}>
                <TableCell
                  component="td"
                  colSpan="6"
                  style={{ textAlign: "center" }}
                >
                  <DiarySmallText>제목 : 안주현의 그림 일기</DiarySmallText>
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: 0 }}>
                <TableCell
                  component="td"
                  colSpan="6"
                  style={{ textAlign: "center" }}
                >
                  <DiarySmallText>
                    <img class="diary-img" src={diaryimg} />
                  </DiarySmallText>
                </TableCell>
              </TableRow>
              <TableRow sx={{ border: 0 }}>
                <TableCell
                  component="td"
                  colSpan="6"
                  style={{ textAlign: "center" }}
                >
                  <div class="manuscript-all" id="diaryText">
                    <div class="manuscript">
                      <p>{diary.contents}</p>
                    </div>
                    <br />
                    <div class="manuscript-all" id="diaryText">
                      <tr>
                        {mode == 0 ?
                          <><td>
                            <img class="diary-pencil" src={require("features/diary/images/edit.png").default}
                              onClick={() => setMode(1)} /></td><h2>코멘트를 달아보자!</h2></>
                          :
                          <><td>
                            <img class="diary-pencil" src={require("features/diary/images/edit.png").default}
                              onClick={() => setMode(0)} /></td><h2>작성 다 했어!</h2></>}
                      </tr>
                      <div class="manuscript">
                        {mode == 0 ?
                          <p>
                            {diary.memo}
                          </p>
                          : <>
                            <MemoModify data={diary} />
                          </>}
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </LayOut>
  );
}

const DiaryText = styled.div`
  font-family: "UhBeeRami";
  font-size: 2vw;
  font-weight: bold;
`;
const DiarySmallText = styled.div`
  font-family: "UhBeeRami";
  font-size: 2vw;
  font-weight: bold;
`
const TR = styled.tr`
  width: 50%;
`;
