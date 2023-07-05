const update = async (req, res) => {
  try {
    console.log("my first api is calling");
    console.log("req", req.body);
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = {
  update,
};
