import bcrypt from "bcryptjs";
const MAX_ID_NUMBER=10000000000;
const MIN_ID_NUMBER=1;
const saltRounds=10;

export async function hashPassword(unhashedPassword: string) {
  let hashedPassword :any= bcrypt.hash(unhashedPassword,saltRounds);
  return hashedPassword as string;
}
export async function comparePassword(unhashedPassword:string, hashedPassword:string) {
  return await bcrypt.compare(unhashedPassword,hashedPassword);
}
// export function generateRandomID() {
//   const randomNumber = Math.floor(Math.random() * (MAX_ID_NUMBER - MIN_ID_NUMBER + 1) + MIN_ID_NUMBER);
//   return randomNumber.toString();
// }
