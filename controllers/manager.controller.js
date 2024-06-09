import Turfs from "../models/turf.model.js";
import { errorHandler } from "../utils/error.handler.js";
import nodemailer from 'nodemailer';

export const createTimeSlots = async (req, res, next) => {
  try {
    const { startDate, endDate, cost, bookedBy, turfId, newSlots } = req.body;

    let from = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
    let to = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));
    const slotObjects = [];

    while (from <= to) {
      for (let slotData of newSlots) {
        slotObjects.push({
          date: JSON.parse(JSON.stringify(from)),
          slot: {
            name: slotData.name,
            id: slotData.id,
          },
          cost,
          turfId,
          bookedBy,
        });
      }
      from.setDate(from.getDate() + 1);
    }
    await Slots.insertMany(slotObjects);
    res.status(201).json({ message: "New slot created successfully" });
  } catch (error) {
    next(error);
  }
};

export const manageMyTurf = async (req, res, next) => {
  try {
    const myTurfData = await Turfs.find({manager: req.user.email});

    if(!myTurfData){
      return next(errorHandler(404, "Turf data not found"));
    }

    res.status(200).json(myTurfData);
  } catch (error) {
    next(error);
  }
};

export const bookingConfirmation = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_ID,
        pass: process.env.NODEMAILER_AUTH_PASSWORD
      }
    });

    const mailOptions = {
      from: `"CleatConnect" <${process.env.NODEMAILER_AUTH_ID}>`,
      to: "nasifswalah@gmail.com",
      subject: "Nodemailer testing",
      text: "Nodemailer working"
    }

    const mail = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', mail.messageId);
    res.status(200).json("Confirmation mail has been send");
    
  } catch (error) {
    next(error);
  }  
}