import GroupModel from "./model.js";

export const getGroup = async (_, res) => {
  await GroupModel.findById(req.params.id)
    .sort({ update_time: -1 })
    .then((group) => res.json(group))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error");
    });
};
