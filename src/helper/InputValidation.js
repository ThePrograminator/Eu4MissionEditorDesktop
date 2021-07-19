import React from "react";

const InputValidation = {
  validateSeriesName: function (id, name, allSeries) {
    let nameInvalid = false;

    nameInvalid = InputValidation.checkIllegalCharacters(name);
    console.log("nameInvalid", nameInvalid);
    if (nameInvalid) return true;

    allSeries.map((serie) => {
      if (serie.id !== id && serie.name === name) {
        console.log("validateSeriesName name used");
        return true;
      }
    });

    return false;
  },
  checkIllegalCharacters: function (text) {
    const regex = /[\s={}()\[\]]/g;
    if (new RegExp(regex).test(text)) {
      console.log("Your string was invalid.");
      return true;
    }
    console.log("text", text);
    return false;
  },
};

export default InputValidation;
