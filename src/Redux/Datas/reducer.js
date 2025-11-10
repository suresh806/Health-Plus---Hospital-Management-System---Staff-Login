import * as types from "./types";

const initialState = {
  loading: false,
  error: false,
  reports: [],
  beds: [],
  doctors: [],
  patients: [],
  nurses: [],
  dashboard: [],
  Appointments: [],
};

export default function dataReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_BED_REQUEST:
    case types.GET_PATIENT_REQUEST:
    case types.GET_ALLDATA_REQUEST:
    case types.DISCHARGE_PATIENT_REQUEST:
    case types.DELETE_APPOINTMENT_REQUEST:
    case types.GET_APPOINTMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };

    case types.GET_BED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        beds: payload,
      };

    case types.GET_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        patients: payload,
      };

    case types.GET_ALLDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        dashboard: payload,
      };

    case types.DISCHARGE_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        beds: state.beds.map((ele) => 
          ele._id === payload.bed._id ? payload.bed : ele
        ),
      };

    case types.DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        Appointments: state.Appointments.filter((ele) => ele._id !== payload),
      };

    case types.GET_APPOINTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        Appointments: payload,
      };

    case types.GET_BED_ERROR:
    case types.GET_PATIENT_ERROR:
    case types.DISCHARGE_PATIENT_ERROR:
    case types.GET_APPOINTMENT_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload || true,
      };

    default:
      return state;
  }
}
