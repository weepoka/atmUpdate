const express = require("express");

const appStatus = (code, message, data, res) => {
  let responseData = {};

  if (data !== undefined) {
    responseData.data = data;
  }

  if (code >= 200 && code < 300) {
    responseData.message = `${message} Success`;
  } else if (code === 201) {
    responseData.message = `${message} Successfully Created`;
  } else if (code === 204) {
    responseData.message = `${message} has No content`;
  }

  res.status(code).json(responseData);
};

module.exports = appStatus;

