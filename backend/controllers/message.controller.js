import Message from "../models/messageSchema.js";


export const sendMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, message } = req.body;

    if (!firstName || !lastName || !email || !phoneNo || !message) {
      return res.status(400).json({
        success: false,
        message: "Please Fill The Form ",
      });
    }

    await Message.create({
      firstName,
      lastName,
      email,
      phoneNo,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully!",
    });
  } catch (error) {
    console.log(`Error in MessageUser ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
