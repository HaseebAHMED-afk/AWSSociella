import React , {useEffect , useState} from 'react'
import { Auth , Hub } from 'aws-amplify'


export const OAuthContext = React.createContext({})


const OAuthProvider = (props) =>{
    const [user , setUser] = useState()


    useEffect(() => {
        Hub.listen("auth", ({ payload: { event } }) => {
          switch (event) {
            case "signIn":
            case "cognitoHostedUI":
              getUser().then(userData => setUser(userData))
              break
            case "signOut":
              setUser(null)
              break
            case "signIn_failure":
            case "cognitoHostedUI_failure":
              break
              default:
                console.log('something went wrong')
          }
        })
    
        getUser().then(userData => {
          setUser(userData)
        })
      }, [])

      function getUser() {
        return Auth.currentAuthenticatedUser()
          .then(userData => userData)
          .catch(() => console.log("Not signed in"))
      }

      return <OAuthContext.Provider value={{user}} >
        {props.children}
    </OAuthContext.Provider>

}

export default OAuthProvider
