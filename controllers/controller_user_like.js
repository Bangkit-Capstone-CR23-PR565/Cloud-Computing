import UserLike from "../models/model_user_like.js";
import Event from "../models/model_event.js";

export const getUserLikes = async (req, res) => {
  try {
    const userLike = await UserLike.findAll({
      where: {
        user_id: req.params.user_id
      }
    });
    res.status(200).json(userLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserLikeById = async (req, res) => {
  try {
    const userLike = await UserLike.findOne({
      where: {
        user_id: req.params.user_id,
        id: req.params.id
      }
    });
    if (!userLike) {
      return res.status(404).json({ message: "User like not found" });
    }
    const showEvent = await Event.findOne({
      where: {
        id: userLike.event_id
      }
    });
    if (!showEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(showEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const postUserLike = async (req, res) => {
  try {
    const likeAlreadyExist = await UserLike.findOne({
      where: {
          user_id: req.body.user_id,
          event_id: req.body.event_id
      }
    });
    if (likeAlreadyExist) {
      return res.status(400).json({ message: "Event sudah dilike oleh user." });
    }
    const userLike = await UserLike.create({
      user_id: req.body.user_id,
      event_id: req.body.event_id
    });
    res.status(201).json(userLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUserLike = async (req, res) => {
  try {
    const userLikeExist = await UserLike.findOne({
      where: {
          id: req.body.id,
      }
    });
    if (!userLikeExist) {
      return res.status(400).json({ message: "User like tidak ada/sudah dihapus." });
    }
    await UserLike.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).json({ message: "User like berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};