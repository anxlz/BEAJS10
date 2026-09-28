import bcrypt from "bcrypt"
export const hash=async(plaintext,rounds=12,minor="b")=>{
    const salt=await bcrypt.genSalt(rounds,minor)
    return await bcrypt.hash(plaintext,salt)
}

export const compare=async(plaintext,ciphertext)=>{
    return await bcrypt.compare(plaintext,ciphertext)
}