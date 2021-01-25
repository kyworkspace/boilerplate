import React,{useEffect} from 'react'
import axios from 'axios'
function LandingPage() {

    //랜딩페이지에 들어오자마자 실행한다는 뜻
    useEffect(()=>{
        axios.get('http://localhost:5000/api/hello').then(response=>console.log(response.data))
    },[]);
    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage