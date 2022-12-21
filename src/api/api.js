class APIService {
   constructor(provider){
      this.provider =provider
      this.token= '',
      this.client=provider.getClient()
   }
   async login(login,password){
    const {data} = await this.client.post('allUsers',{
      login, password
    })

    this._setToken(data.token)
   }
   _setToken(token){
      if(token){
         return
      }
      this.token = token
      this.client.setAuthHeader(token)
   }
}

