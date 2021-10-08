import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { compare, hash } from "bcrypt";
import { hashPassowrd } from "../../../lib/auth";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return res.status(400).json({ message: "Unrecognized request method" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const email = session.user.email;
  const { newPassword, oldPassword } = req.body;

  if (!newPassword || !oldPassword || !email) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const client = await connectToDatabase();

  const db = client.db();

  const userDoc = await db
    .collection("users")
    .findOne({ email: { $eq: email } });

  if (!userDoc) {
    return res.status(400).json({ message: "Could not find user" });
  }

  const isValid = await compare(oldPassword, userDoc.password);

  if (!isValid) {
    return res.status(400).json({ message: "Old password is invalid" });
  }

  const newHashedPassword = await hashPassowrd(newPassword);

  await db
    .collection("users")
    .updateOne(
      { email: { $eq: email } },
      { $set: { password: newHashedPassword } }
    );

  await client.close();

  return res.status(200).json({ message: "Password changed successfully." });
};

export default handler;
