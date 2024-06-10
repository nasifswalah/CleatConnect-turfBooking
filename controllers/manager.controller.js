import Bookings from "../models/booking.model.js";
import Slots from "../models/slots.model.js";
import Turfs from "../models/turf.model.js";
import { errorHandler } from "../utils/error.handler.js";
import nodemailer from 'nodemailer';

export const createTimeSlots = async (req, res, next) => {
  try {
    const { startDate, endDate, cost, turfId, selectedSlots } = req.body;

    let from = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
    let to = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));
    const slotObjects = [];

    while (from < to) {
      for (let slotData of selectedSlots) {
        slotObjects.push({
          date: JSON.parse(JSON.stringify(from)),
          slot: {
            name: slotData.name,
            id: slotData.id,
          },
          cost,
          turfId,
        });
      }
      from.setDate(from.getDate()+1);
    }
    const newSlots = await Slots.insertMany(slotObjects);
    res.status(201).json({
      success: true,
      message: "New slots added successfully",
      data: newSlots
    });
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

    res.status(200).json({
      success: true,
      data: myTurfData
    });
  } catch (error) {
    next(error);
  }
};

export const listBookings = async (req, res, next) => {
  try {
    const turfId = req.body;
    const turfBookings = await Bookings.find(turfId);

    if(!turfBookings) {
      return next(errorHandler(404, "Bookings are empty"));
    }

    res.status(200).json({
      success: true,
      message: "Bookings are listed successfully",
      data: turfBookings
    })
  } catch (error) {
    
  }
}

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