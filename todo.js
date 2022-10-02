var username = document.getElementById("username");
var password = document.getElementById("password");
var usernameSpan = document.getElementById("usernameSpan");
var passwordSpan = document.getElementById("passwordSpan");
var contents = document.getElementById("items");

// ---------------------------------------------for login---------------------------------------
function validate(callback){
    console.log("hi");
    usernameSpan.innerHTML = "";
    passwordSpan.innerHTML = "";
    if(username.value == "admin" && password.value == "12345"){
        // submitForm();
        // return false
        return callback()   // calling callback function
    }
                                            
    if(username.value != "admin"){
        usernameSpan.innerHTML = "Enter valid username";
        return false;

    }
    if(password.value != "12345"){
        passwordSpan.innerHTML = "Enter valid password";
        return false;
    }
    
    
}


function submitForm(){
    return true;                    //callback function for login
}



// -------------------------------------------login ends--------------------------------------------

// -------------------------------------------todo page---------------------------------------------

function addContent(){                   //function for API calling using AJAX
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            var output ="";                                 //creating an empty string for adding checkbox and content
            
            for(var i=0; i<response.length; i++){
                // console.log(response.length);
                if(response[i].completed == true){
                    // console.log("disabled")
                    output += "<input type='checkbox'  checked disabled class='btn-info' mr-2>" + response[i].title + "<br><hr>"; // creating checkbox and content for disabled checkbox  ie. title = true
                    

                }
                output += "<input type='checkbox' id='myCheck"+[i]+"' onclick='promiseFunction(this.id);' mr-2>" + response[i].title + "<br><hr>"; //creating checkbox and content   ie. title = false
            }
            contents.innerHTML= output; // adding checkbox and content in webpage
            
        }
    };

    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
    xhttp.send();



}



addContent();  //function call for API calling using AJAX







var count = 0;   // for counting the numbers of checking

function promiseFunction(id){          //function for counting the checks using promise . function call of this function is happening while user clicks the checkbox


    var promise = new Promise(function (resolve, reject){
        var myCheck = document.getElementById(id);    //getting access of particular ids that recently got checked
        
        if(myCheck.checked == true){                  //if the checkbox is checked this resolve function activates
            console.log("RES")
            count += 1;                               //adding counts per checks
            resolve("resolve")
        }
        else if(myCheck.checked == false){            //if the checkbox is not checked this reject function activates
            console.log("REJ")
            count -= 1;                               //decreasing counts per unchecks
            reject("reject")
        }
        
    
       
    });
    promise
    .then(function(value){
        alertBox(value);        
    })
    .catch(function(error){
        alertBox(error);
    })
    }
    
    function alertBox(some){
        if(count == 5){
            alert("Congrats. 5 Tasks have been Successfully Completed")
        }
        console.log(`${count}..${some}`);
    }
