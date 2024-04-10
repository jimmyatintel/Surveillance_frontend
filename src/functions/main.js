import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const headers = {
    'Content-Type': 'application/json'
  }

export function get_kvm_list(){
    return axios.get(`${baseURL}/api/kvm/list`, headers);
}
export function get_kvm_message(hostname){
    return axios.get(`${baseURL}/api/kvm/get_message?hostname=${hostname}`, headers);
}
export function get_floors(){
    return axios.get(`${baseURL}/api/kvm/floor`, headers);
}
export function get_hostnames_by_floor(floor){
    return axios.get(`${baseURL}/api/kvm/hostnames?floor=${floor}`, headers);
}
export function get_dut_list(){
    return axios.get(`${baseURL}/api/dut/list`, headers);
}
export function get_freedut_list(){
    return axios.get(`${baseURL}/api/dut/freelist`, headers);
}
export function get_freedbh_list(){
    return axios.get(`${baseURL}/api/dbg/freelist`, headers);
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
export function get_project_unit(project){
    return axios.get(`${baseURL}/api/dbgunit/project_info?project=${project}`, headers);
}
export async function submitmapping(kvm,dbg,dut,project){
    let res = window.confirm(`Please confirm you want to add this commit.`)
    if(res){
        let postform = {
            "kvm_hostname": kvm,
            "dbghost_ip": dbg, 
            "dut_machine": dut,
            "project": project
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
    let postform = {
        "kvm_hostname": kvm
    }
    return axios.post(`${baseURL}/api/kvm/delete_mapping`,postform, headers).catch((reason) => {
        console.log(reason.message)
        }).then(
        window.confirm(`Success`)
        );

}
export function Insert_kvm_message(hostname, message){
    // let res = window.confirm(`Please confirm you want to delete this mapping.`)
    let postform = {
        "hostname": hostname,
        "message": message
    }
    return axios.post(`${baseURL}/api/kvm/insert_message`,postform, headers)
}
export function Delete_kvm_message(hostname, message){
    // let res = window.confirm(`Please confirm you want to delete this mapping.`)
    let postform = {
        "hostname": hostname,
        "message": message
    }
    return axios.post(`${baseURL}/api/kvm/delete_message`,postform, headers)
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
export function dut_modify(name,ssim,threshold){
    let postform = {
        "machine": name,
        "ssim": ssim,
        "threshold": threshold
    }
    return axios.get(`${baseURL}/api/dut/modify`, {params: postform}, headers);
}
export function dut_info(name){
    let postform = {
        "machine": name,
    }
    return axios.get(`${baseURL}/api/dut/info`, {params: postform}, headers);
}
export function dbg_modify(name,owner){
    let postform = {
        "ip": name,
        "owner": owner
    }
    return axios.get(`${baseURL}/api/dbg/modify`, {params: postform}, headers);
}
export function dbg_info(name){
    let postform = {
        "ip": name,
    }
    return axios.get(`${baseURL}/api/dbg/info`, {params: postform}, headers);
}
export function kvm_modify(hostname,owner, ip, nas){
    let postform = {
        "hostname": hostname,
        "owner": owner,
        "ip": ip,
        "nas_ip": nas,
    }
    return axios.get(`${baseURL}/api/kvm/modify`, {params: postform}, headers);
}
export function kvm_info(hostname){
    let postform = {
        "hostname": hostname
    }
    return axios.get(`${baseURL}/api/kvm/info`, {params: postform}, headers);
}
export function lock_screen(hostname){
    let postform = {
        "machine": hostname
    }
    return axios.get(`${baseURL}/api/dut/lockframe`, {params: postform}, headers);
}
export function unlock_screen(hostname){
    let postform = {
        "machine": hostname
    }
    return axios.get(`${baseURL}/api/dut/unlockframe`, {params: postform}, headers);
}
export function cutURLTail(url) {
    // Create a new URL object
    const parsedURL = new URL(url);

    // Reconstruct the URL with only the protocol and host
    return `${parsedURL.protocol}//${parsedURL.hostname}`;
}