
const ip='http://127.0.0.1:8000/';

export const apiSignup = user =>
  fetch(`${ip}codeunravel/users/`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },

    body: JSON.stringify(user)
  }).then(res => res.json());

export const apiLogIn = user =>
  fetch(`${ip}codeunravel/login/`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => data);

export const apiCreateQuestion = questionObj =>
  fetch(`${ip}codeunravel/questions/`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(questionObj)
  }).then(data => data);


export const apiEditQuestion = questionObj =>
  fetch(
    `${ip}codeunravel/question/${questionObj.question_id}/`,
    {
      method: "PUT",
      headers: 
      {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(questionObj)
    }
  ).then(data => data);

export const apiGetQuestion = () =>
  fetch(`${ip}codeunravel/questions/`, 
  {
    method: "GET",
    headers: 
    {
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .then(data => data);

export const apiUpdateQuestion = question =>
  fetch(`${ip}codeunravel/questions/`, 
  {
    method: "PUT",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .then(data => data);

export const apiCompile = sourceCode =>
  fetch(`https://api.judge0.com/submissions/?base64_encoded=true&wait=true`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sourceCode)
  })
    .then(res => res.json())
    .then(data => data);

export const apiRun = token =>
  fetch(`https://api.judge0.com/submissions/${token}?base64_encoded=false`, 
  {
    method: "GET",
    headers: 
    {
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .then(data => data);

export const getLanguages = () =>
  fetch(`https://api.judge0.com/languages`, 
  {
    method: "GET",
    headers: 
    {
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .then(data => data);

export const apiAssignTask = assignTaskObj =>
  fetch(`${ip}codeunravel/assigned_tasks/`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(assignTaskObj)
  }).then(res => res.json())
    .then(data => data);

export const apiDeleteQuestion = id => {
  fetch(`${ip}codeunravel/question/${id}`, 
  {
    method: "DELETE"
  }).then(res => 1);
};

export const apiCreateProfile = candidateObj =>
  fetch(`${ip}codeunravel/candidates/`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(candidateObj)
  }).then(data => data);

export const apiGetProfile = id =>
  fetch(`${ip}codeunravel/candidate/${id}`, 
  {
    method: "GET",
    headers: 
    {
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .then(data => data);

export const apiGetCandidate = idObj =>
  fetch(`${ip}codeunravel/getcandidate/`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(idObj)
  }).then(data => data);



  export const apiSubmitTestResult = (resultObj) =>
  fetch(`${ip}codeunravel/result/`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(resultObj)
  }).then(data => data);


  export const apiGetTestResult = idObj =>
  fetch(`${ip}codeunravel/getcandidate/`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(idObj)
  }).then(data => data);

  export const apiCreateTestResut = resultObject =>
  fetch(`${ip}codeunravel/results/`, 
  {
    method: "POST",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(resultObject)
  }).then(data => data);


export const apiGetRecruiter = () =>
fetch(`${ip}codeunravel/recruiters/`, 
{
  method: "GET",
  headers: 
  {
    Accept: "application/json"
  }
})
  .then(res => res.json())
  .then(data => data);

  export const apiGetAllCandidate = () =>
  fetch(`${ip}codeunravel/all-candidates/`, 
  {
    method: "GET",
    headers: 
    {
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .then(data => data);
  export const apiSendEmail = (UserObj) => 
  fetch(`${ip}codeunravel/mail/`, 
  {
    method: 'POST',
    headers: 
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(UserObj)
  }).then(data => data)

export const apiGetTask = () =>
  fetch(`${ip}codeunravel/assigned_tasks/`,
    { 
     method:'GET',headers: 
     {
          'Accept': 'application/json'
     } })
    .then(res => res.json())