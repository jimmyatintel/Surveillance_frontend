import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const headers = {
    'Content-Type': 'application/json'
  }

export function get_kvm_list(){
    return axios.get(`${baseURL}/api/kvm/list`, headers);
}
export function get_dut_list(){
    return axios.get(`${baseURL}/api/dut/list`, headers);
}
export function get_dbg_list(){
    return axios.get(`${baseURL}/api/dbg/list`, headers);
}
export function get_kvm_detail(kvm){
    return axios.get(`${baseURL}/api/kvm/info?hostname=${kvm}`, headers);
}
export function get_dut_detail(kvm){
    return axios.get(`${baseURL}/api/dut/info?machine=${kvm}`, headers);
}
export function get_dbg_detail(kvm){
    return axios.get(`${baseURL}/api/dbg/info?ip=${kvm}`, headers);
}
export function get_kvm_map(kvm){
    return axios.get(`${baseURL}/api/kvm/search?hostname=${kvm}`, headers);
}
export function get_dut_map(machine){
    return axios.get(`${baseURL}/api/dut/search?machine=${machine}`, headers);
}
export function get_dbg_map(ip){
    return axios.get(`${baseURL}/api/dbg/search?ip=${ip}`, headers);
}
export function get_ptoject_list(){
    return axios.get(`${baseURL}/api/dbgunit/project_list`, headers);
}
export function get_project_dut(project){
    return axios.get(`${baseURL}/api/dbgunit/project_info?project=${project}`, headers);
}
export async function submitmapping(kvm,dbg,dut){
    let res = window.confirm(`Please confirm you want to add this commit.`)
    if(res){
        let postform = {
            "kvm_hostname": kvm,
            "dbghost_ip": dbg, 
            "dut_machine": dut
        }
        let err = false
        await axios.post(`${baseURL}/api/kvm/kvm_mapping`,postform, headers).catch((reason) => {
            if (reason.response.status === 403) {
              // Handle 400
              window.confirm(`Your mapping list has some target which already has mapping relationship. Please check it and try to send it again.`)
            }
            console.log(reason.message)
            err = true
          });
        if(!err){
            window.confirm(`Success`)
        }
        
        
        
    }
}
export function deletemapping(kvm){
    let res = window.confirm(`Please confirm you want to delete this mapping.`)
    if(res){
        let postform = {
            "kvm_hostname": kvm
        }
        axios.post(`${baseURL}/api/kvm/delete_mapping`,postform, headers).catch((reason) => {
            console.log(reason.message)
          }).then(
            window.confirm(`Success`)
          );
    }
    return res
}
export function uploadfile(dutfile,kvmfile,dbgfile,mapfile){
    var formData = new FormData();
    formData.append('dutfile', dutfile);
    formData.append('kvmfile', kvmfile);
    formData.append('dbgfile', dbgfile);
    formData.append('mapfile', mapfile);
//   formData.append('filename', filename);
    const customHeader = {
        headers: {
        // Authorization: `Bearer ${getLocalStorageToken()}`,
        "Content-Type": 'multipart/form-data',
        },
    };
    return axios.post(`${baseURL}/api/upload`, formData, customHeader);
}
export function gen_self_define_video(device,hour,minute,duration){
    if (hour==""){
        return window.alert("Please select hour")
    }
    if (minute==""){
        return window.alert("Please select minute")
    }
    let postform = {
        "kvm_hostname": device,
        "hour": hour,
        "minute": minute,
        "duration": duration
    }
    return axios.get(`${baseURL}/api/kvm/gen_video`, {params: postform}, headers);
}
export function project_start(project){
    let postform = {
        "project": project,
        "operation": "start"
    }
    axios.post(`${baseURL}/api/kvm/project_status`, postform, headers);
    window.alert("Project " + project + " has been started")
}

export function project_stop(project){
    let postform = {
        "project": project,
        "operation": "stop"
    }
    axios.post(`${baseURL}/api/kvm/project_status`, postform, headers);
    window.alert("Project " + project + " has been stopped")
}
export function get_kvm_status(kvm){
    return axios.get(`${baseURL}/api/kvm/stream_status?action=${kvm}`, headers);
}