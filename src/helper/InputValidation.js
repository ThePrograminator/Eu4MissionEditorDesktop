import React from "react";

const InputValidation = {
  validateContainerName: function (id, name, allContainer) {
    let nameInvalid = false;

    nameInvalid = InputValidation.checkIllegalCharacters(name);
    console.log("nameInvalid", nameInvalid);
    if (nameInvalid)
      return {
        valid: nameInvalid,
        errorMessage: "Name uses illegalCharacters",
      };

    let nameUsed = false;
    allContainer.map((container) => {
      if (container.id !== id && container.name === name) {
        console.log("validateContainerName name used");
        nameUsed = true;
      }
    });

    return { valid: nameUsed, errorMessage: "Name already used" };
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
