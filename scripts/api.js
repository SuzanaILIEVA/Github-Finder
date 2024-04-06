 export class Github { //js de Class yapilarini kullanacagimiz yerde cagirabilmek icin export ediyoruz ve new keywordu ile cagiriyoruz.
    constructor(){
        this.client_id = ""; //buna gore istek aticaz
        this.client_secret = ""; //github ile iletisim kurmamizi saglayacak key.
        this.per_page = 10 
        this.sort = "asc"
    }
    //! API 'dan kullanici bilgilerini alma ** api'den bilgiler hemen gelmedigi icin async- await yapisini kullaniriz 
     async fetchUserData(username){
        //* Parametre olarak gelen kullanici adina gore istek attik .
        const profileRespons =await fetch(`https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`
        )
        
        //kullanici repolarini almak icin istek attik 
        const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?cliend_id${this.client_id}&client_secret${this.client_secret}&per_page=${this.per_page}&sort=${this.sort}`
        )

        // API'den aldigimiz cevabi (profileRespons'u)  json'a cevirip data degiskenine atayacagiz.
       const data =await profileRespons.json()
       const repos = await repoRes.json()     
           
       return {data,repos }; // fonksiyonun cagirildigi yere bilgileri gonderir.
      
    }
}
