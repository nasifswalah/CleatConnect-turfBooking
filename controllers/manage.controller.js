export const createTimeSlots = async (req, res, next) => {
  try {
    const { startDate, endDate, cost, bookedBy, turfId, newSlots } = req.body;

    let from = new Date(new Date(startDate).setUTCHours(0,0,0,0));
    let to = new Date(new Date(endDate).setUTCHours(0,0,0,0));
    const slotObjects = [];

    while(from <= to) {
      for(let slotData of newSlots) {
        slotObjects.push({
          date: JSON.parse(JSON.stringify(from)),
          slot: {
            name: slotData.name,
            id: slotData.id
          },
          cost,
          turfId,
          bookedBy
        })
      }
      from.setDate(from.getDate()+1)
    }
    await Slots.insertMany(slotObjects);
    res.status(201).json({message: "New slot created successfully"});
  } catch (error){
    next(error);
  }
}