import React from "react"
import AmplifyClient from "./amplifyContext/client"
import OAuthProvider from "./OAuthContext"

export const wrapRootElement = ({ element }) => (
  <AmplifyClient>
    <OAuthProvider>{element}</OAuthProvider>
  </AmplifyClient>
)
