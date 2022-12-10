import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Route from "next/router";
import toast from "react-hot-toast";
import ApiMiddleware from "../../utils/ApiMiddleware";

const initialState = {
  isLoading: false,
  eventList: [],
  currentPage: 1,
  totalPages: 1,
  totalEvents: 0,
  limit: 20,
  error: "",
  addOrganizationData: [],
  deleteIsLoading: false,
  deleteShowModal: false,
  editIsLoading: false,
};
export const fetchManageEventData = createAsyncThunk(
  "allData/fetchEventData",
  async (data) => {
    try {
      const apidata = await ApiMiddleware.get(
        `/organization/events?search=${data?.search || ""}&status=${
          data?.status || ""
        }&limit=4&page=${data?.page || "1"}`
      );
      return apidata?.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const deleteEventData = createAsyncThunk(
  "allData/deleteEventData",
  async (data, { dispatch }) => {
    try {
      const apidata = await ApiMiddleware.delete(`/event/${data.eventId}`);
      if (apidata.status === 200) {
        toast.success(apidata.data?.message);
      }
      dispatch(fetchManageEventData());
      return apidata?.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const editEventData = createAsyncThunk(
  "allData/editEventData",
  async (data) => {
    try {
      const apidata = await ApiMiddleware.patch(
        `/event/${data.slug}`,
        data.data
      );

      if (apidata.status === 200) {
        toast.success(apidata.data?.message);
        Route.replace("/events/manage");
      }
      return apidata;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const manageEventSlice = createSlice({
  name: "ManageEventPage",
  initialState,
  reducers: {
    setDeleteShowModal: (state, action) => {
      state.deleteShowModal = action.payload;
    },
  },
  extraReducers: {
    [fetchManageEventData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchManageEventData.fulfilled]: (state, action) => {
      const { data, page, totalPages, totalEvents, limit } = action.payload;
      state.isLoading = false;
      state.eventList = [...data];
      state.currentPage = page;
      state.totalPages = totalPages;
      state.limit = limit;
      state.totalEvents = totalEvents;
    },
    [fetchManageEventData.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteEventData.pending]: (state, action) => {
      state.deleteIsLoading = true;
    },
    [deleteEventData.fulfilled]: (state, action) => {
      state.deleteIsLoading = false;
      state.deleteShowModal = false;
    },
    [deleteEventData.rejected]: (state, action) => {
      state.deleteIsLoading = false;
    },
    [editEventData.pending]: (state, action) => {
      state.editIsLoading = true;
    },
    [editEventData.fulfilled]: (state, action) => {
      state.editIsLoading = false;
    },
    [editEventData.rejected]: (state, action) => {
      state.editIsLoading = false;
    },
  },
});

export const { setDeleteShowModal } = manageEventSlice.actions;
export default manageEventSlice.reducer;
