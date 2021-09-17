//Object literal
var saloon={
    name:"The Fashion Pet",
    address:{
        state:"Baja California",
        city:"Tijuana",
        street:"Universidad 1245",
        zip:"25669"
    },
    hours:{
        opening:"9:00 am",
        closing:"9:00 am"
    },
    pets:[]
}

//name,age,gender,breed,service,owner,phone
var counter=0;
class Pet{
    constructor(name,age,gender,breed,service,owner,phone,email){
        this.name=name;
        this.age=age;
        this.gender=gender;
        this.breed=breed;
        this.service=service;
        this.owner=owner;
        this.phone=phone;
        this.email=email;
        this.id=counter++;
    }
}
//create pets
var scooby=new Pet("Scooby",60,"Male","Dane","666-666-6666","Grooming","Shaggy","abc@gmail.com");
saloon.pets.push(scooby);
var scrappy=new Pet("Scrappy",50,"Male","Mixed","666-666-6666","Nails cut","Shaggy","abc@gmail.com");
saloon.pets.push(scrappy);
var tweety=new Pet("Tweety bird",60,"Male","Bird","555-555-5555","Shower","Buggs bunny","123@gmail.com");
saloon.pets.push(tweety);
// getting tha values from the inputs
var txtName=document.getElementById('petName');
var txtAge=document.getElementById('petAge');
var txtGender=document.getElementById('petGender');
var txtBreed=document.getElementById('petBreed');
var txtService=document.getElementById('petService');
var txtOwner=document.getElementById('ownerName');
var txtPhone=document.getElementById('ownerPhone');
var txtEmail=document.getElementById('ownerEmail')

function register(){
    if(txtName.value!=""&& txtPhone.value!=""){
        var thePet = new Pet(txtName.value,txtAge.value,txtGender.value,txtBreed.value,txtService.value,txtOwner.value,txtPhone.value,txtEmail.value);
        console.log(thePet);
        saloon.pets.push(thePet);
        clear();
        displayTable()
        var alertElement=document.getElementById("alert");
        alertElement.classList.remove('hide');
        setTimeout(function(){
            alertElement.classList.add("hide");
        },3000);
    }else{
        alert("Please enter the required field.")
    }
}

function clear(){
    txtName.value="";// clearing the input
    txtAge.value="";
    txtGender.value="";
    txtBreed.value="";
    txtOwner.value="";
    txtPhone.value="";
    txtEmail.value="";
} 
function display(){
     const petSection=document.getElementById('pets');
     var tmp="";
     for(var i=0;i<saloon.pets.length;i++){
        tmp+=`<div class="pet">
            <h3>🐾${saloon.pets[i].name}</h3>
            <p>Age:${saloon.pets[i].age}</p>
            <p>Gender:${saloon.pets[i].gender}</p>
            <p>Breed:${saloon.pets[i].breed}</p>
            <p>Owner:${saloon.pets[i].owner}</p>
            <p>Phone:${saloon.pets[i].phone}</p>
            <p>Service:${saloon.pets[i].service}</p>
            <P>Email:${saloon.pets[i].email}</p>
        </div>`;
     }
     petSection.innerHTML=tmp;
}
function displayTable(){
    //select the tbody section
    var table=document.getElementById("pets");
    //create a var tr
    var tr="";
    //travel the array
    for(var i=0;i<saloon.pets.length;i++){
        tr+=`
            <tr id=${saloon.pets[i].id}>
                <td>🐾${saloon.pets[i].name}</td>
                <td>${saloon.pets[i].age}</td>
                <td>${saloon.pets[i].gender}</td>
                <td>${saloon.pets[i].breed}</td>
                <td>${saloon.pets[i].owner}</td>
                <td>${saloon.pets[i].phone}</td>
                <td>${saloon.pets[i].service}</td>
                <td>${saloon.pets[i].email}</td>
                <td><button onclick="deletePet(${saloon.pets[i].id})">🗑️</button></td>
            </tr>
        `;
        console.log(tr);
    }
    //insert the tr into the table
    table.innerHTML=tr;
}
function deletePet(id){
    var row=document.getElementById(id);//select the element from the html using the id
    row.remove();//remove the element from the html
    for(var i=0;i<saloon.pets.length;i++){
        var indexDelete;//variable to store the position
        if(saloon.pets[i].id===id){//search for the id
            indexDelete=i;//update the position value
        }
    }
    saloon.pets.splice(indexDelete,1);//delete the element from the array
}
function searchPet(){//by name
    //create a var, get the element, use .value
    var txtSearch = document.getElementById("searchInput").value;
    var searchString=txtSearch.toLowerCase();
    //travel the array to search the string
    saloon.pets.forEach(pet=>{
        //compare the txtsearch with all the names
        if(pet.name.toLowerCase()===searchString){
                //highlight the result
                document.getElementById(pet.id).classList.add('highlight');
            }else{
                document.getElementById(pet.id).classList.remove('highlight');
            }
    });
}

function init(){
    console.log("app.js");
    displayTable();
    //hook events
    document.querySelector(".btn-register").addEventListener("click",register);
    document.querySelector(".btn-search").addEventListener("click",searchPet)
}
window.onload=init;