import { selectAllTask, insertTask, deleteTask } from "../models/Task.js";
import { ApiError } from "../helpers/apiError.js";

const getTasks = async (req, res, next) => {
  try {
    const result = await selectAllTask();
    return res.status(200).json(result.rows || []);
  } catch (error) {
    return next(error);
  }
};

const postTask = async (req, res, next) => {
  const description = req.body.description;
    if (!description || description.length === 0)
      //return next(new ApiError("Invalid description for task", 400));
    return res.status(400).json({ error: 'Invalid description for task'});

  try {
    const result = await insertTask(description);
    return res.status(200).json({ id: result.rows[0].id });
  } catch (error) {
    return next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  const id = parseInt(req.params.id);
   // if (isNaN(id)) return next(new ApiError("Invalid id", 400));
   if (isNaN(id)) return res.status(400).json({ error: 'Invalid description for task'});

  try {
    const result = await deleteTask(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Task with ID ${id} not found` });
    }
    res.status(200).json({ deletedTaskId: id });
  } catch (error) {
    next(error);
  }
};

export { getTasks, postTask, deleteTaskById };
