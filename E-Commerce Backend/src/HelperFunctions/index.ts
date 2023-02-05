import bcrypt from "bcryptjs";
const MAX_ID_NUMBER=10000000000;
const MIN_ID_NUMBER=1;
const saltRounds=10;

export async function hashPassword(unhashedPassword: string) {
  let hashedPassword :string= (await bcrypt.hash(unhashedPassword,saltRounds)).toString();
  return hashedPassword;
}
export async function comparePassword(unhashedPassword:string, hashedPassword:string) {
  return await bcrypt.compare(unhashedPassword,hashedPassword);
}

