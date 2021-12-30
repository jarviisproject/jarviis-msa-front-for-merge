import PropTypes from "prop-types";
import React, { Fragment } from "react";
import SuggestionOne from "../components/SuggestionOne";
import { LayOut } from "features/common";
import "features/common/font/font.scss"
import { AppTasks } from "features/todo";

export default function About(){

  return (
    <LayOut>
      <AppTasks/>
    {/* <Fragment> */}
      <SuggestionOne />
    {/* </Fragment> */}
    </LayOut>
  );
};

About.propTypes = {
  location: PropTypes.object
};

