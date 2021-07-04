import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    userData: null,
    companies: null,
    companyData: null,
    products: null,
  },
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
    },
    logout: state => {
      state.userData = null;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
  },
});

export const { login, logout, setCompanies, setProducts, setCompanyData } = appSlice.actions;

export const selectUserData = state => state.app.userData;
export const selectCompanies = state => state.app.companies;
export const selectCompanyData = state => state.app.companyData;
export const selectProducts = state => state.app.products;

export default appSlice.reducer;