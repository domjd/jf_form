let companyArray = [];
let selectedCompany = [];

function showResults(val) {
    let res = document.getElementById("result");

    if(document.getElementById('q').value === ''){
     res.style.display = "none";
     console.log("true") 
    }


    res.innerHTML = '';
    if (val == '') {
      return;
    }
    let list = '';
    fetch(`http://localhost:3000/companies/getCompanies?companyname=${val}`, {method: 'GET', crossDomain: true}).then(
     function (response) {
       return response.json();
     }).then(function (data) {
        for (let i=0; i<data.items.length; i++) {
         list += `<li class="company" onclick=setCompany(${i})>` + 
         data.items[i].title + ' | ' + data.items[i].company_number + '<div class="companyAddress">' + data.items[i].address_snippet + "</div>" +
         '</li>'; 
       }
       res.style.border = '1px dotted #ccc'
       res.innerHTML = '<ul>' + list + '</ul>';
       res.style.display = "block"
       companyArray = data.items;
       console.log(companyArray);
       return true;
     }).catch(function (err) {
       console.warn('Something went wrong.', err);
       return false;
     });


  }

  function setCompany (index){
   
    selectedCompany = companyArray[index];
    console.log(selectedCompany)
    let companyNameField = document.getElementById("cname");
    let companyAddressField = document.getElementById("caddress");
    if(companyNameField && companyAddressField){
      companyNameField.value = formatTitle(selectedCompany.title);
      companyAddressField.value = selectedCompany.address_snippet;
    }


    document.getElementById("q").value = ""; 
    let res = document.getElementById("result");
    res.innerHTML = '';
    res.style.display = "none"
  }

  function formatTitle(sentence) {

  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
      console.log(words[i])
  }
  return words.join(" ");
}




window.onload = function() {
  let leadForm = document.getElementById("leadform");
  let loader = document.getElementById("loader");

  console.log(document.getElementById('chouse').checked)

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    leadForm.style.display = "none";
    loader.style.display = "inline-block"
    const formData = {
      "firstName": document.getElementById("fname").value,
      "lastName": document.getElementById("lname").value,
      "email": document.getElementById("email").value,
      "mobilenumber":document.getElementById("mobilenumber").value,
      "title": selectedCompany.title,
      "companyNumber": selectedCompany.company_number,
      "companyurl": "https://find-and-update.company-information.service.gov.uk" + selectedCompany.links.self,
      "addressSnippet": selectedCompany.address_snippet,
      "amountRequired": document.getElementById("amountrequired").value,
      "confirmations": [document.getElementById('chouse').checked,document.getElementById('bankaccount').checked,document.getElementById('property').checked]
    }
    console.log(JSON.stringify(formData)  );
  
    // handle submit
    const request = fetch(`http://localhost:3000/jotform/submitform`,
    {headers: {"Content-Type":"application/json"},method: "POST",body: JSON.stringify(formData)}).then((response) => {
      console.log(response);
      alert("SUCCESS");
      leadForm.reset();
      leadForm.style.display = "block";
      loader.style.display = "none"
    }) 
  });
  

}


