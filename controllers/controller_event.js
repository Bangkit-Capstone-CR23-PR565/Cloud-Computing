import Event from "../models/model_event.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

