const initState=[null,0]
function AuthReducer(state=initState,action)
{
    switch(action.type)
    {
        case "login":
            state[0]=action.data.un;
            state[1]=action.data.role;
            return state;
        case "logout":
            state=initState;
            return state;
        default :
            return state;
    }

}
export default AuthReducer;
//action={type:"login",data:{un:"yash",role:1}}