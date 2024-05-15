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
  // console.log("Input String",inputString)
  const asciiString=inputString.replace(/[^\x20-\x7E]/g, "");
  return asciiString;
}

// export function convertFilePathToAscii(filePath:string) {
//   const asciiFilePath = convertToAscii(filePath);
//   console.log("Ascii File Path", asciiFilePath);
//   return asciiFilePath;
// }

// // Usage example
// const filePath = 'uploads/1715781552529MyTinyGuidetoShadcn,Radix,andTailwind_byMairajPirzada_Medium.pdf';
// convertFilePathToAscii(filePath);