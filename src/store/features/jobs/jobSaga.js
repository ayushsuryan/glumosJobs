import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
} from "./jobSlice";

// API call function
function fetchJobsAPI(query, location) {
  const options = {
    method: "GET",
    url: "https://jobs-api14.p.rapidapi.com/list",
    params: {
      query: query,
      location: location,
      distance: "1.0",
      language: "en_GB",
      remoteOnly: "false",
      datePosted: "month",
      employmentTypes: "fulltime;parttime;intern;contractor",
      index: "0",
    },
    headers: {
      "x-rapidapi-key": "b36f8dc57emsh387cad055594df7p1458a3jsn3142e0085d3f",
      "x-rapidapi-host": "jobs-api14.p.rapidapi.com",
    },
  };

  return axios.request(options);
}

// Saga worker function
function* fetchJobsSaga(action) {
  try {
    const { query, location } = action.payload;
    const response = yield call(fetchJobsAPI, query, location);
    yield put(fetchJobsSuccess(response.data));
  } catch (error) {
    yield put(fetchJobsFailure(error.message));
  }
}

// Root saga
export default function* jobsSaga() {
  yield takeLatest(fetchJobsRequest.type, fetchJobsSaga);
}
