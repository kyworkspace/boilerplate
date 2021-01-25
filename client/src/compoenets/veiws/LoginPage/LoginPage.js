import React,{useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler =(event)=>{
            setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        // 이걸 사용하면 페이지가 리프레쉬 되는 것을 막음.
        // 리프레쉬가 되면 아래 진행될 코드가 실행되지 못하기 때문에 막는거임
        let body ={
            email : Email,
            password : Password
        }
        //액션으로 보냄
        dispatch(loginUser(body)) 
            .then(response=>{
                if(response.payload.loginSuccess){
                    props.history.push("/");
                    //메인 페이지 이동
                }else{
                    alert("ERROR");
                }
            })

    }

    return (
        <div style={{
            display:'flex',justifyContent:'center',alignItems:'center',
        width:'100%',height:'100vh'}}>
            <form style={{display:'flex' , flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>
                Email    
                </label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>
                password    
                </label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button>
                    Login
                </button>

            </form>
        </div>
    )
}

export default LoginPage
