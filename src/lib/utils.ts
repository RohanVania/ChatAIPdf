import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * 
 * @param inputString 
 * This function we use because Pinecone, only excepts ascii characters and sometimes filkey from s3 is not always contain only ascii characters
 */
export function convertToAscii(inputString:string){
  const asciiString=inputString.replace(/[^\x00- \x7F]/g,"");
  return asciiString;
}
