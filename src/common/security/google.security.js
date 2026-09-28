import { OAuth2Client } from "google-auth-library"
import { GOOGLE_CLIENT_ID } from "../../config.js"
import { unauthorizedException } from "../execption/index.js"

const client=new OAuth2Client(GOOGLE_CLIENT_ID)

// Verify Google Token
export const verifyGoogleToken=async(idToken)=>{
    const ticket=await client.verifyIdToken({
        idToken,
        audience:GOOGLE_CLIENT_ID
    }).catch(()=>{
        unauthorizedException("invalid google token")
    })
    const payload=ticket.getPayload()
    if(!payload.email_verified){
        unauthorizedException("google email is not verified")
    }
    return payload
}
