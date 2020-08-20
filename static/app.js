const createbtn = document.querySelector(".js-create-user");
let modal = document.querySelector(".modal-content");
let csrf = '';

//function
function UserCreate(){
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
        form.addEventListener("submit",UserSubmit);
         
    }
    request.send();
}

function UserSubmit(e){
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
    //lets use uriencoded approach as it works well with django form
    const namevalue= encodeURIComponent(name.value);
    const emailvalue= encodeURIComponent(email.value);
    const agevalue= encodeURIComponent(parseInt(age.value));
    const gendervalued= encodeURIComponent(gendervalue);
    e.preventDefault();
    let request = new XMLHttpRequest();
    request.open("POST","/create/",true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/X-www-form-urlencoded','charset=UTF-8');
    request.setRequestHeader('X-CSRFToken',`${csrf}`);
    request.onload = function(){
        let result = JSON.parse(this.responseText);
        console.log(result);
        //close the form
        new BSN.Modal('#modal-user', { backdrop: true }).hide();
  }
  request.send(`name=${namevalue}&email=${emailvalue}&age=${agevalue}&gender=${gendervalued}`);
};

//eventlistener
createbtn.addEventListener("click",UserCreate);

