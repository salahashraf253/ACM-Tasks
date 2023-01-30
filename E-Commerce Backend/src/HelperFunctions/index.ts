import bcrypt from 'bcryptjs';

export async function encryptPassword(unhasedPassword:string){
    let hashedPassword= bcrypt.hash(unhasedPassword,10);
    return hashedPassword; 
}
export function generateRandomID() {
    const min = 1;
    const max = 10000000000;
    const randomNumber= Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber.toString();
  }