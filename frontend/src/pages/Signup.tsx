import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup=()=>{
    return <div className="grid grid-cols-2">
        <div className="flex justify-center text-2xl font-bold">
            <div>
                <Auth/>
            </div>
        </div>
        <div className="invisible lg:visible">
            <Quote/>
        </div>
            
    </div>
}