import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler =(event)=>{
            setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }
    const onNameHandler =(event) =>{
        setName(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }


    const onSubmitHandler = (event) =>{
        event.preventDefault();
        // 이걸 사용하면 페이지가 리프레쉬 되는 것을 막음.
        // 리프레쉬가 되면 아래 진행될 코드가 실행되지 못하기 때문에 막는거임

        if(Password !== ConfirmPassword){
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
        }

        let body ={
            email : Email,
            password : Password,
            name : Name
        }
        //액션으로 보냄
        dispatch(registerUser(body)) 
            .then(response=>{
                console.log("sign up response" ,response);
                if(response.payload.success){
                    props.history.push("/login")
                }else{
                    alert("Fail to sign up")
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
                name    
                </label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>
                password    
                </label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>
                confirm password    
                </label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br/>
                <button>
                    회원 가입
                </button>

            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
