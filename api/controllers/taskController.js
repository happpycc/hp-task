import GroupModel from "../model.js";

const vertifyContent = (content) => {
  if (typeof content !== "string") {
    return true;
  }
  if (content.trim() === "") {
    return true;
  }
  return false;
};

export const addTask = async (req, res) => {
  const { position, content } = req.body;
  if (vertifyContent(content) || typeof position !== "number") {
    return res.status(400).send("Server error");
  }
  try {
    const GroupDoc = await GroupModel.findById(req.params.id);
    GroupDoc.tasks.push({
      $each: [{ content }],
      $position: position,
    });
    await GroupDoc.save();
    res.status(200).send("Added a task successfully");
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const GroupDoc = await GroupModel.findById(req.params.group_id);
    GroupDoc.tasks.pull(req.params.task_id);
    await GroupDoc.save();
    res.status(200).send("Deleted a task successfully");
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

export const updateTask = async (req, res) => {
  const { position, content, id } = req.body;
  if (vertifyContent(content) || typeof position !== "number") {
    return res.status(400).send("Server error");
  }
  try {
    const GroupDoc = await GroupModel.findById(req.params.id);
    GroupDoc.tasks.pull(id);
    GroupDoc.tasks.push({
      $each: [{ content }],
      $position: position,
    });
    await GroupDoc.save();
    res.status(200).json(GroupDoc.tasks[position]);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};