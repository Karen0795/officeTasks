import { createSlice } from "@reduxjs/toolkit";

const stationSlice = createSlice({
  name: "station",
  initialState: {
    strArr: [],
  },
  reducers: {

    setStationGateCount(state, { payload}) { 
      state.strArr.push(payload)      
    }
  
    }
  },
);

export const stationReducer = stationSlice.reducer;
export const {setStationGateCount} = stationSlice.actions;
export const selectStation = (state) => state.station;
