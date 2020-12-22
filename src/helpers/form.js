module.exports = {
    success: (res, data) => {
      const resObject = {
        message: "Data Success",
        status: 200,
        data: data,
      };
      res.json(resObject);
    },
    error: (res, err) => {
      const resObject = {
        message: err,
        // status: 500,
        // error: err
      };
      res.status(500).json(resObject);
    },
};