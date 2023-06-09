import UserLike from "../models/model_user_like.js";
import Event from "../models/model_event.js";

export const getUserLikes = async (req, res) => {
  try {
    const userLikes = await UserLike.findAll({
      where: {
        user_id: req.params.user_id
      }
    });
    if (!userLikes) {
      return res.status(404).json({ message: "User likes not found" });
    }
    const eventIds = userLikes.map((like) => like.event_id);
    const showEvents = await Event.findAll({
      where: {
        id: eventIds
      }
    });
    if (!showEvents) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(showEvents);
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
          user_id: req.params.user_id,
          event_id: req.params.event_id
      }
    });
    if (!userLikeExist) {
      return res.status(400).json({ message: "User like tidak ada/sudah dihapus." });
    }
    await UserLike.destroy({
      where: {
        user_id: req.params.user_id,
        event_id: req.params.event_id
      }
    });
    res.status(200).json({ message: "User like berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};