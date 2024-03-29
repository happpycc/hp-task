import GroupModel from "../model.js";

const vertifyName = (name) => {
  if (typeof name !== "string") {
    return true;
  }
  if (name.trim() === "") {
    return true;
  }
  return false;
};

export const getGroups = async (_, res) => {
  await GroupModel.find({}, { tasks: 0 })
    .sort({ update_time: -1 })
    .then((groups) => res.json(groups))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error");
    });
};

export const getGroup = async (req, res) => {
  await GroupModel.findById(req.params.id)
    .then((group) => res.json(group))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error");
    });
};

export const addGroup = async (req, res) => {
  const { name } = req.body;
  if (vertifyName(name)) {
    return res.status(400).send("Server error");
  }
  const GroupDoc = new GroupModel({ name });
  await GroupDoc.save()
    .then((group) => {
      res.status(200).send(group);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error");
    });
};

export const deleteGroup = async (req, res) => {
  await GroupModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).send("Deleted the group successfully.");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error");
    });
};

export const updateGroupName = async (req, res) => {
  const { name } = req.body;
  const update_time = Date.now();
  if (vertifyName(name)) {
    return res.status(400).send("Server error");
  }
  await GroupModel.findByIdAndUpdate(req.params.id, { name })
    .then((group) => {
      group.name = name;
      group.update_time = update_time;
      group.tasks = undefined;
      res.status(200).send(group);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Server error");
    });
};
