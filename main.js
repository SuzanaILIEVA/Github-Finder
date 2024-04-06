import { Github } from "./scripts/api.js";
import { elements } from "./scripts/helpers.js";
import { UI } from "./scripts/ui.js";


const github = new Github() //github classinin ornegini olusturuyor(miras alma)
const ui = new UI()     // ui class' in ornegi
github.fetchUserData()


const getInput = (e) =>{
    e.preventDefault(); // butona tiklayinca console.log ta hemen kaybolmasini engelliyor.
   
  const value = elements.searchInput.value;
  if (value == ""){ 
    ui.showAlert("Lütfen formu doldurunuz.", "alert alert-warning")   
    return ;
  }
  if (value){
    github.fetchUserData(value).then((res)=>{
         // eger kullanici bulunamadiysa 
        if(res.message === "Not Found"){
            ui.showAlert("Aradığınız kullanıcı bulunamadı." ,"alert alert-danger");
        }
        else{
            // kullanici bulundu ise
            ui.showAlert("Kullanıcı bulundu." , "alert alert-success");
            ui.renderProfile(res.data);
            
            ui.renderProjects(res.repos)

        }
    }) 
    .catch((err)=> console.log(err));
    return;
  }
}


//! olay izleyicileri 
elements.searchBtn.addEventListener('click', getInput);

