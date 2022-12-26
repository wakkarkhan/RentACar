import store from "../store"

const UserModule = {
    state: {
      currentUser: null
    },
    mutations: {
      setUser: ( state, user) => {
        state.currentUser = user;
      }
       
    },
    actions: {
      initUser: ( context, user) => {
        user = user || JSON.parse(localStorage.getItem('user'));
        context.commit('setUser', user);
      },
      removeUser: ({dispatch, commit}) => {
        context.commit('setUser', null);
      },
      autoSignIn (context) {
        if(localStorage.getItem('user')) {
          let user = JSON.parse(localStorage.getItem('user'));
          context.commit('setUser', user);
        }
        
      },
      logout ( context) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        store.dispatch('clearError');
        store.dispatch('clearSuccess');
        context.commit('setUser', null);
        
      },
    },
    getters: {
      currentUser: state => {
        return state.currentUser;
      }
    }
  };
  
  export default UserModule;
  