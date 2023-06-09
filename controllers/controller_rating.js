import Rating from "../models/model_rating.js";

export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRatingsByEventId = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: {
        event_id: req.params.event_id,
      },
    });
    if (ratings.length > 0) {
      res.status(200).json(ratings);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRatingsByUserId = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });
    if (ratings.length > 0) {
      res.status(200).json(ratings);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const postRating = async (req, res) => {
  try {
    const ratingAlreadyExist = await Rating.findOne({
      where: {
          user_id: req.body.user_id,
          event_id: req.body.event_id
      }
    });
    const userRating = parseInt(req.body.user_rating);

    if (ratingAlreadyExist) {
      return res.status(400).json({ message: "Event sudah dirating oleh user." });
    }
    if (isNaN(userRating) || userRating < 1 || userRating > 10) {
      return res.status(400).json({ message: "Rating harus berupa angka antara 1 sampai 10." });
    }
    if (req.body.user_comment.length > 100) {
      return res.status(400).json({ message: "Komentar tidak boleh lebih dari 100 karakter." });
    }
    const rating = await Rating.create({
      user_id: req.body.user_id,
      event_id: req.body.event_id,
      user_rating: userRating,
      user_comment: req.body.user_comment,
    }, { fields: ['user_id', 'event_id', 'user_rating', 'user_comment'] });
    res.status(201).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const deleteRating = async (req, res) => {
  try {
    const ratingExist = await Rating.findOne({
      where: {
          id: req.params.id,
      }
    });
    if (!ratingExist) {
      return res.status(400).json({ message: "Rating tidak ada/sudah dihapus." });
    }
    await Rating.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Rating berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};