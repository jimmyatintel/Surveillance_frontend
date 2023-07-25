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
    return axios.get(`${baseURL}/api/kvm/list?kmv=${kvm}`, headers);
}