import { badRequestException } from "../../common/execption/index.js"

// Validate Request
export const validation=(schema)=>{
    return (req,res,next)=>{
        const data={
            body:req.body,
            params:req.params,
            query:req.query
        }
        const result=schema.safeParse(data)
        if(!result.success){
            const issues=result.error.issues.map((issue)=>{
                return {
                    path:issue.path.join("."),
                    message:issue.message
                }
            })
            badRequestException("validation error",issues)
        }
        req.body=result.data.body
        req.params=result.data.params
        req.query=result.data.query
        next()
    }
}
