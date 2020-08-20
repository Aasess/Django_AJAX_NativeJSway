const createbtn = document.querySelector(".js-create-user");
const modal = document.querySelector(".modal-content");
const table = document.querySelector(".user-table tbody")
let csrf = '';

//function
//function to open create modal
function UserCreate(){
    //ajax call
    let request = new XMLHttpRequest();
    new BSN.Modal('#modal-user', { backdrop: true }).show();
    request.open("GET","/create/",true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/json','charset=UTF-8');
    request.onload = function (){
        let formpage = JSON.parse(this.responseText).html_form;
        modal.innerHTML = formpage;  
        let form = modal.querySelector("#form");
        csrf = document.querySelector("input[name=csrfmiddlewaretoken]").value;
        form.addEventListener("submit",(e)=>{
            UserSubmit(e,'/create/');
        });
         
    }
    request.send();
}


//function to open edit modal
function EditDetail(e){
    
    const rows = e.target.parentElement.parentElement;
    const id = rows.querySelector("#id").innerText;
    //ajax call
    let request = new XMLHttpRequest();
    new BSN.Modal('#modal-user', { backdrop: true }).show();
    request.open("GET",`/update/${id}`,true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/json','charset=UTF-8');
    request.onload = function (){
        let formpage = JSON.parse(this.responseText).html_form;
        modal.innerHTML = formpage;  
        let form = modal.querySelector("#form");
        //csrf token from input(can be done with cookies too)
        csrf = document.querySelector("input[name=csrfmiddlewaretoken]").value;
        //when submit button is clicked
        form.addEventListener("submit",(e)=>{
            UserSubmit(e,`/update/${id}/`);
        });
         
    }
    request.send();

};



//function when submit is clicked in create and edit modal
function UserSubmit(e,url){
    
    const name = document.querySelector("#id_name");
    const email = document.querySelector("#id_email");
    const age = document.querySelector("#id_age");
    const gender = document.getElementsByName("gender");

    //logic to find the gender value
    let gendervalue = '';
    for(i = 0; i < gender.length; i++) { 
        if(gender[i].checked){
            gendervalue = gender[i].value; 
        } 
    }
    e.preventDefault();
    //let solve this by json approach
    const UserDetail = {
        'name':name.value,
        'email':email.value,
        'age':age.value,
        'gender':gendervalue
    } ;
    //ajax call
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/json','charset=UTF-8');
    request.setRequestHeader('X-CSRFToken',`${csrf}`);
    request.onload = function(){
        let result = JSON.parse(this.responseText).data;
        table.innerHTML = result;
        
        //close the form
        new BSN.Modal('#modal-user', { backdrop: true }).hide();
  }
  request.send(JSON.stringify(UserDetail));
};


//function to open delete modal
function DeleteDetail(e){
    
    const rows = e.target.parentElement.parentElement;
    const id = rows.querySelector("#id").innerText;
    //ajax call
    let request = new XMLHttpRequest();
    new BSN.Modal('#modal-user', { backdrop: true }).show();
    request.open("GET",`/delete/${id}`,true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/json','charset=UTF-8');
    request.onload = function(){
        let formpage = JSON.parse(this.responseText).html_form;
        modal.innerHTML = formpage;
        let form = modal.querySelector("#form");
        //csrf token from input(can be done with cookies too)
        csrf = document.querySelector("input[name=csrfmiddlewaretoken]").value;
        //when submit button is clicked
        form.addEventListener("submit",(e)=>{
            UserSubmitDelete(e,`/delete/${id}/`);
        });

    }
    request.send();
};


//function when submit button is clicked in delete modal
function UserSubmitDelete(e,url){
    e.preventDefault();
    //ajax call
    let request = new XMLHttpRequest();
    request.open('POST',url,true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/json','charset=UTF-8');
    request.setRequestHeader('X-CSRFToken',`${csrf}`);
    request.onload= function(){
        let result = JSON.parse(this.responseText).data;
        table.innerHTML = result;
        //close the form
        new BSN.Modal('#modal-user', { backdrop: true }).hide();
    }
    request.send();    
};

//eventlistener
//create new detail event listener
createbtn.addEventListener("click",UserCreate);
//edit detail and delete event listener
table.addEventListener("click",(e)=>{
    if(e.target.classList.contains("edit")){
        EditDetail(e);
    }
    if(e.target.classList.contains("delete")){
        DeleteDetail(e);
    }
});


