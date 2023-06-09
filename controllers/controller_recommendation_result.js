import Event from "../models/model_event.js";
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';

export const getRecResults = async (req, res) => {
  try {
    const { user_id } = req.params;
    const response = await fetch(`http://35.220.199.159/events/top-ranking-predictions/${user_id}`);
    const recommendations = await response.json();

    // Sort the recommendations array based on rating_prediction
    recommendations.sort((a, b) => b.rating_prediction - a.rating_prediction);

    const eventIds = recommendations.map((recommendation) => recommendation.id);

    const eventOrder = eventIds.join(',');

    const events = await Event.findAll({
      where: {
        id: eventIds,
      },
      order: Sequelize.literal(`FIELD(id, ${eventOrder})`), // Sort by custom order based on eventOrder
    });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getRecResultById = async (req, res) => {
  try {
    const recResult = await RecResult.findOne({
      where: {
        user_id: req.params.user_id,
        id: req.params.id
      }
    });
    if (recResult) {
      res.status(200).json(recResult);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};