import { connectToDatabase } from "../../lib/mongodb";
import axios from "axios";
const uri = `http://localhost:3000`;

export default async (req, res) => {
  try {
    const data = await axios.get(`${uri}`);

    // console.log(data.data);
    res.json(data.data);
  } catch (err) {
    console.log(err);
  }
};
