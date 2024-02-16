import prisma from "../db";
import { comparePassword, createJTW, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJTW(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const valid = await comparePassword(req.body.password, user.password);

  if (!valid) {
    res.status(401);
    res.json("nope.");
    return;
  }

  const token = createJTW(user);
  res.json({ token });
};
