const CompanyModule = {
    state: {
      companies: []
    },
    mutations: {
      setCompanies(state, payload) {
        state.companies = payload
      },
      createCompany(state, payload) {
        state.companies.push(payload);
      },
      updateCompany(state, payload) {
        let companyForUpdate = state.companies.find( company => {
          return company.id === payload.id;
        });

        
        companyForUpdate.name =  payload.name;
        companyForUpdate.address =  payload.address;
        companyForUpdate.phone =  payload.phone;
     
      },
      deleteCompany(state, id) {
        state.companies = state.companies.filter(function (company) { 
          return company.id != id;
        });
      },
    },
    actions: {
      setCompanies(context, payload) {
        context.commit('setCompanies', payload);
      },
      createCompany(context, payload) {
        context.commit('createCompany', payload);
      },
      updateCompany (context, payload) {
        context.commit('updateCompany', payload);
      }
    },
    getters: {
      getCompanies: state => {
        return state.companies;
      },
      getCcompanyById: (state) => (id) => {
        return state.companies.find(car => car.id === id)
      }

    }
  }
  
export default CompanyModule;
  