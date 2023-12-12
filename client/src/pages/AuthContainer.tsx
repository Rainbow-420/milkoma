import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signin, setInfoBatch } from '../slices/auth'
import axios from 'axios'
import { API } from '../axios'

const AuthContainer = () => {
  const token = sessionStorage.getItem('token')
  const dispatch = useDispatch()
  const user_data = sessionStorage?.getItem('user');
  const user = user_data ? JSON.parse(user_data) : null;
  if(user !== null){
    // console.log("user - ", user)
    dispatch(signin(user))
    axios.post(`${API}/api/getUserInfo?id=${user.id}`)
    .then(res => {
      dispatch(setInfoBatch(
        {
          username : res.data.username,
          isLoggedIn : true,
          admin: res.data.admin,
          region: res.data.region,
        }
      ))
    })
    .catch(err => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      window.location.pathname = '/login'
    })
  }else{
    if(token){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      window.location.pathname = '/login'
    }
  }
  return (
    <>
      {token ? 
      (
        <></>
      ) : 
      (
        <Navigate to='/login' />
      )}
    </>
  )
}

export default AuthContainer
