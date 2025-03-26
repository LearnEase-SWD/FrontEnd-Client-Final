//create_payout
//get_payout
//update_status_payout
const API_BASE_URL = "/api/payout";

export const PAYOUT_API = {
  CREATE_PAYOUT: `${API_BASE_URL}`,
  GET_PAYOUT: `${API_BASE_URL}/search`,
  UPDATE_PAYOUT_STATUS: `${API_BASE_URL}/update-status`,
};