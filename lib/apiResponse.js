const { MSG_TYPES } = require("../constant/types");

function JsonResponse(res, status, msg, data = null, meta = null) {
  const body = {
    msg: "",
    data: null,
    meta: {
      total: 1,
      pagination: {
        pageSize: 1,
        page: 1,
        // currentPage: 1,
      },
    },
  };

  if (data) {
    body.data = data;
  }
  if (meta) {
    body.meta = meta;
  } else {
    delete body.meta;
  }
  
  if (typeof msg === "string") {
    const data = MSG_TYPES[msg];
    if (typeof data !== "undefined") {
      body.msg = MSG_ERRORS[msg];
    } else {
      body.msg = msg;
    }
  }
  res.status(status ?? 200).send(body);
  return;
}


module.exports = {
  JsonResponse
};
