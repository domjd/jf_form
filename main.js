let companyArray = [];
let selectedCompany = {};
let addressOne = "";
let addressTwo = "";
let addressThree = "";
let postcode = "";

function resizeIframe() {
  var bodyHeight = document.body.scrollHeight;
  window.parent.postMessage({ height: bodyHeight }, '*');
}

function showResults(val) {
  let res = document.getElementById("result");
  let companyNameField = document.getElementById("companyname");

  if(document.getElementById('companyname').value === ''){
    res.style.display = "none";
  }


  res.innerHTML = '';
  if (val == '') {
    return;
  }
  let list = '';
  fetch(`https://sea-lion-app-lccwh.ondigitalocean.app/companies/getCompaniesMain?companyname=${val}`, {method: 'GET', crossDomain: true}).then(
    function (response) {
      return response.json();
    }).then(function (data) {
      for (let i=0; i<data.items.length; i++) {
        list += `<li class="company" onclick=setCompany(${i})>` + 
        data.items[i].title + ' | ' + data.items[i].company_number + '<div class="companyAddress">' + data.items[i].address_snippet + "</div>" +
        '</li>'; 
      }
      res.style.border = '2px solid #ccc';
      res.innerHTML = '<ul>' + list + '</ul>';
      res.style.display = "block";
      selectedCompany = {};
      companyNameField.style.border = "2px solid orange"
      resizeIframe();
      companyArray = data.items;
      return true;
    }).catch(function (err) {
      console.warn('Something went wrong.', err);
      return false;
    });


}

function setCompany (index){
  
  selectedCompany = companyArray[index];
  let companyNameField = document.getElementById("companyname");

  if(companyNameField){
    companyNameField.value = formatTitle(selectedCompany.title);
    companyNameField.style.border = "2px solid lightgreen"
    //companyAddressField.value = selectedCompany.address_snippet;
  }

  addressOne = selectedCompany.address.premises + " " + selectedCompany.address.address_line_1;
  addressTwo = selectedCompany.address.address_line_2 == null ? selectedCompany.address.locality : selectedCompany.address.address_line_2;
  addressThree = selectedCompany.address.region == null ? (selectedCompany.address.country == null ? "" : selectedCompany.address.country) 
    : selectedCompany.address.region; 
  postcode = selectedCompany.address.postal_code;


  console.log(selectedCompany)
  let res = document.getElementById("result");
  res.innerHTML = '';
  res.style.display = "none";
  resizeIframe();
}

function formatTitle(sentence) {

  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
  }
  return words.join(" ");
}

const capitalizeFirstLetter=  (input) =>{
  const textInput = document.getElementById(input);
  const inputValue = textInput.value.trim();

  // Check if the input value is not empty
  if (inputValue.length > 0) {
      // Capitalize the first letter and concatenate the rest of the string
      const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      return capitalizedValue;
     
  }

  return inputValue;
}

// Error handling function
function handleValidationErrors(errors) {
  const errorNames = Object.keys(errorsObject)
  errors.forEach((error, index) => {
    if(errorNames.includes(error.field)){
      errorsObject[error.field] = true;
    }
    const field = document.getElementById(`${error.field}`);
      const fieldError = document.getElementById(`${error.field}error`);
      console.log(fieldError);
      if (fieldError) {
          fieldError.style.display = "inline-block";
          field.classList.add("input-error");
          fieldError.textContent = error.message;
      }
  });
      const errorHeader = document.getElementById('error-header');
      const submitButton = document.querySelector('button[type="submit"]');
      //errorHeader.style.display = "inline-block";
      submitButton.disabled = true;
      submitButton.textContent = "Please Fix Your Errors"
      resizeIframe();
      document.getElementById(errors[0].field).parentElement.parentElement.scrollIntoView({ behavior: "smooth", block: "start"});
    //updateSubmitButtonState();
}


window.onload = function() {
  let leadForm = document.getElementById("leadform");

  resizeIframe();

  easyNumberSeparator({
    selector: '.number-separator',
    separator: ','
})

const submitForm = async () => {

  const companyUrl = selectedCompany.links && selectedCompany.links.self
  ? "https://find-and-update.company-information.service.gov.uk" + selectedCompany.links.self
  : "";


  const formData = {
    "firstname": capitalizeFirstLetter("firstname"),
    "lastname": capitalizeFirstLetter("lastname"),
    "email": document.getElementById("email").value,
    "mobilenumber":document.getElementById("mobilenumber").value,
    "amountrequired": document.getElementById("amountrequired").value,
    "propertytype": document.getElementById("propertytype").value,
    "propertyvalue": Number(document.getElementById("propertyvalue").value.replace(/\,/g,'')),
    "companyname": selectedCompany.title ?? "",
    "companynumber": selectedCompany.company_number ?? "",
    "companystatus": selectedCompany.company_status ?? "",
    "companytype": selectedCompany.company_type,
    "companydescription": selectedCompany.description ?? "",
    "companyurl": companyUrl,
    "addressone": addressOne,
    "addresstwo": addressTwo,
    "addressthree": addressThree,
    "natureofbusiness":"",
    "companypostcode": postcode,
    "confirmations": [document.getElementById('bankaccount').checked,document.getElementById('property').checked]
  } 

  try {
      const response = await fetch('https://sea-lion-app-lccwh.ondigitalocean.app/jotform/submitminiform', {headers: {"Content-Type":"application/json"},
      method: "POST",body: JSON.stringify(formData)});

      if (!response.ok) {
          if (response.status === 400) {
              const errorResponse = await response.json();
              handleValidationErrors(errorResponse.errors);
              //document.getElementById("error-header").scrollIntoView();
          } else {
              throw new Error(`Server responded with ${response.status}`);
          }
      } else {
          const successMessage = await response.text();
          window.top.location.href = 'https://equiddy.com/thank-you/';
          //alert(successMessage);
      }
  } catch (error) {
      console.error('Error:', error.message);
  }

  return false; // Prevent the form from submitting in the traditional way

}

 
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button pressed");
    submitForm();
  }); 
  

}


