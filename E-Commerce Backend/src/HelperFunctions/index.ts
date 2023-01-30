import bcrypt from "bcryptjs";
const MAX_ID_NUMBER=10000000000;
const MIN_ID_NUMBER=1;

export async function encryptPassword(unhasedPassword: string) {
  let hashedPassword = bcrypt.hash(unhasedPassword, 10);
  return hashedPassword;
}
export function generateRandomID() {
  const randomNumber = Math.floor(Math.random() * (MAX_ID_NUMBER - MIN_ID_NUMBER + 1) + MIN_ID_NUMBER);
  return randomNumber.toString();
}
