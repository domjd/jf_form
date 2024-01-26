

// Function to check if an email is valid using a regular expression
function isValidEmail(email) {
    // Regular expression for a simple email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Initialize the error object
const errorsObject = {
    firstname: false,
    lastname: false,
    email: false,
    mobilenumber: false,
    amountrequired: false,
    propertytype: false,
    propertyvalue: false,
    companyname: false,
    bankaccount: false,
    property: false,
};

function validateCompany(){
    const companyLookUp = document.getElementById("companyname");
    const companyLookUpError = document.getElementById("companynameerror");
    console.log("errorsObject");

    if(Object.keys(selectedCompany).length === 0){
        errorsObject.companyname = true;
        companyLookUpError.textContent = 'Please select a company from the drop down box';
        companyLookUpError.style.display="inline-block";
        companyLookUp.classList.add("input-error");
    }
    
}

// Real-time validation function for individual fields
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}error`);
    const errorHeader = document.getElementById('error-header');
    const cname = document.getElementById("cname");
    const companyResults = document.getElementById("result")


    if (fieldId === 'firstname') {
        if (field.value.length < 2 || !/^[a-zA-Z]+$/.test(field.value)) {
            errorsObject.firstname = true;
            errorElement.textContent = 'Invalid first name.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errorsObject.firstname = false;
            errorElement.textContent = '';
            errorElement.style.display="none";

            field.classList.remove("input-error");
        }
    }

    if (fieldId === 'lastname') {
        if (field.value.length < 2 || !/^[a-zA-Z]+$/.test(field.value)) {
            errorsObject.lastname = true;
            errorElement.textContent = 'Invalid Last name.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errorsObject.lastname = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

        // Example validation for the "fname" field (you can adapt it for other fields)
    if (fieldId === 'email') {
        if (!isValidEmail(field.value)) {
            errorsObject.email = true;
            errorElement.textContent = 'Invalid Email.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errorsObject.email = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

    if (fieldId === 'mobilenumber') {
        if (field.value.length < 11 || !/^\d{11}$/.test(field.value)) {
            errorsObject.mobilenumber = true;
            errorElement.textContent = 'Invalid Mobile Number.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errorsObject.mobilenumber = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

    if (fieldId === 'amountrequired') {
        if (field.value == null || field.value === "") {
            errorsObject.amountrequired = true;
            errorElement.textContent = 'Invalid Mobile Number.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errorsObject.amountrequired = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

    if (fieldId === 'propertytype') {
        if (field.value == null || field.value === "") {
            errorsObject.propertytype = true;
            errorElement.textContent = 'Invalid Property Type.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errorsObject.propertytype = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

        
    if (fieldId === 'propertyvalue') {
        let propertyValue = document.getElementsByName("propertyvalue")[0].value;
        // Call the validateEmail function and store the result
        propertyValue= propertyValue.replace(/\,/g,'')
        propertyValue=Number(propertyValue);

        if (propertyValue < 100000 || /^[a-zA-Z]+$/.test(field.value)) {
            errorsObject.propertyvalue = true;
            errorElement.textContent = 'Property Value Must Be Over £100,000.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errorsObject.propertyvalue = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

     if (fieldId === 'companyname') {
        const companyLookUp = document.getElementById("companyname");
        const companyLookUpError = document.getElementById("companynameerror");
        console.log("BLUR: " + Object.keys(selectedCompany).length)

        if (field.value === "") {
            errorsObject.companyname = true;
            companyLookUpError.textContent = 'Please select a company from the drop down box';
            companyLookUpError.style.display="inline-block";
            companyLookUp.classList.add("input-error");
            //companyResults.style.display = "none";
        } else {
            errorsObject.companyname = false;
            companyLookUpError.textContent = '';
            companyLookUpError.style.display="none";
            companyLookUp.classList.remove("input-error");
        }

    } 

    if (fieldId === 'bankaccount') {
        if (field.checked === false) {
            errorsObject.bankaccount = true;
            errorElement.textContent = 'Bank Account Confirmation is required Charge';
            errorElement.style.display="inline-block";
        } else {
            errorsObject.bankaccount = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
        }
    }
    
    if (fieldId === 'property') {
        if (field.checked === false) {
            errorsObject.property = true;
            errorElement.textContent = 'Property Confirmation is required';
            errorElement.style.display="inline-block";
        } else {
            errorsObject.property = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
        }
    } 


    // Enable/disable submit button based on errors
    const submitButton = document.querySelector('button[type="submit"]');
    console.log(errorsObject);
    let hasErrors = Object.values(errorsObject).some(error => error);
    submitButton.disabled = hasErrors;
    if(hasErrors){
        submitButton.textContent = "Please Fix Your Errors";
       // errorHeader.style.display = "inline-block";
        
    } else {
        submitButton.textContent = "Submit";
        //errorHeader.style.display = "none";
    } 
    
    resizeIframe();   
}

// Attach real-time validation to each input's "input" event
/* document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('input', function () {
        validateField(this.id);
    });
}); */

// Additional event listeners or functions as needed...


