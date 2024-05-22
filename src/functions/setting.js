import axios from "axios";


const baseURL = process.env.REACT_APP_API_BASE_URL;
const url = process.env.REACT_APP_BACKEND_BASE_URL;
const emailURL = process.env.REACT_APP_API_EMAIL_URL;
const headers = {
  'Content-Type': 'application/json'
}
export function getallproject() {
    
  return axios.get(`${baseURL}/api/project?status=0&project_name=all`);
}
 export function getCurrentDate(separator='-'){

  let newDate = new Date()
  let date = newDate.getDate()+1;
  let month = newDate.getMonth()+1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }
 export async function uploadfile(file,projetctname) {
  console.log(file)
  var formData = new FormData();
  formData.append('file', file);
  formData.append('project_name', projetctname);
  const customHeader = {
    headers: {
      // Authorization: `Bearer ${getLocalStorageToken()}`,
      "Content-Type": 'multipart/form-data',
    },
  };
  return axios.post(`${emailURL}/api/uploadtemplate`, formData, customHeader).then(Response => Response.data).catch(function (error){
    console.log(error);
    if (error.response){
      console.log("!");
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status
    }
    return "network error"
  });
 }
 export async function checktemplate(filename,projetctname,code) {
  let postform = {
    "project": projetctname,
    "filename": filename,
    "code": code
  }
  return axios.post(`${emailURL}/api/checkreport`, (postform), headers).then(Response => Response.data).catch(function (error){
    console.log(error);
    if (error.response){
      console.log("!");
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status
    }
    return "network error"
  });
 }

export async function addProject(project, short_name,owner,email,alert,reporttime) {
  let mail=[]
  email.forEach(address=>{
    mail = [...mail,address.label];
  })
  let almail=[]
  alert.forEach(address=>{
    almail = [...almail,address.label];
  })
  let postform = {
    "project_name": project,
    "short_name": short_name, 
    "owner": owner,
    "Email_list": Object.values(mail),
    "alert_list": Object.values(almail)
  }
  let postform2 = {
    "project": project,
    "code": short_name, 
    "time": reporttime
  }
  console.log(postform2)
  let res = window.confirm(`Please confirm you want to add ${postform.project_name}.`)
  console.log(postform)
  if(res){
    axios.post(`${baseURL}/api/project/set_project_setting`, JSON.stringify(postform), headers);
    res = await axios.post(`${emailURL}/api/setreport`, postform2, headers);
    console.log(res)
    if (res.data==="OK"){
      window.location.replace("/");
    }
  }
}
export function getNUCstatus() {
  return axios.get(`${baseURL}/api/host_owner`);
}
export function removeProject(project){
  let res = window.confirm(`Please confirm you want to delete ${project}.`)
  if(res){
    axios.get(`${baseURL}/api/project?status=2&project_name=${project}`);
    window.location.replace("/");
  }
}
export function projectstatuschange(project_name,op){
  let postform = {
    "project_name": project_name,
    "operation": op
  }
  return axios.post(`${baseURL}/api/project/project_exec`, JSON.stringify(postform), headers);

    //window.location.replace("/");
}
export function get3strike(project_name){
  return axios.get(`${baseURL}/api/email/enable_mail_constraint?enable=-1&project=${project_name}`);
}
export function modify3strike(project_name,mode){
  if(mode){
    return axios.get(`${baseURL}/api/email/enable_mail_constraint?enable=1&project=${project_name}`);
  }else{
    return axios.get(`${baseURL}/api/email/enable_mail_constraint?enable=0&project=${project_name}`);
  }
}
export function getfreeze(project_name){
  return axios.get(`${baseURL}/api/project/freeze_switch?action=search&switch=-1&project_name=${project_name}`);
}
export function modifyfreeze(project_name,mode){
  if(mode){
    return axios.get(`${baseURL}/api/project/freeze_switch?action=update&switch=open&project_name=${project_name}`);
  }else{
    return axios.get(`${baseURL}/api/project/freeze_switch?action=update&switch=close&project_name=${project_name}`);
  }
}
export function getStates(host) {
  if ( host === undefined )
    return
    
  return axios.get(`${baseURL}/api/monitor/state?host=${host}`);
}
export function getproject(project) {
    
  return axios.get(`${baseURL}/api/project/get_project_setting?project_name=${project}`);
}
export function getmode(host) {
    
  return axios.get(`${baseURL}/api/change_mode?host=${host}&mode=-1`);
}
export function geturl() {
    
  return url;
}
export function modifymode(host,mode){
  if(mode){
    return axios.get(`${baseURL}/api/change_mode?host=${host}&mode=1`);
  }else{
    return axios.get(`${baseURL}/api/change_mode?host=${host}&mode=0`);
  }
}
export function getreport(code) {
  return axios.get(`${emailURL}/api/reportstate?project=${code}`);
}