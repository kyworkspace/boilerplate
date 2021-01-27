import React,{useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

function LandingPage(props) {

    //랜딩페이지에 들어오자마자 실행한다는 뜻
    useEffect(()=>{
        axios.get('/api/hello').then(response=>console.log(response.data))
    },[]);

    const onClickHandler =() =>{
        axios.get('/api/users/logout')
        .then(response=>{
            if(response.data.success){
                props.history.push("/login")
            }else{
                alert("로그아웃에 실패하였습니다.")
            }
            
        })
    }

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',
        width:'100%',height:'100vh'}}>
            시작 페이지
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
