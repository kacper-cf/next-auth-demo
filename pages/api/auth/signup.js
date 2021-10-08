import { hashPassowrd } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(404).send();
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({ message: "Invalid input" });
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db
    .collection("users")
    .findOne({ email: { $eq: email } });

  console.log(existingUser);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await hashPassowrd(password);

  db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
};

export default handler;
