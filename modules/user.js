const user = {
	namespaced: true,
	state: {
		isLogin: true,
		phone: ""
	},
	mutations: {
		setStatus(state, status) {
			state.status = status;
		},
		removeStatus(state) {
			state.status = '';
		},
		setUser(state, user) {
			state.user = user;
		},
		removeUser(state) {
			state.user = '';
		},


	},
	actions: {

	},
	getters: {
		getbaseUserInfo: state => state.user,
		// getUsername:state=>state.username,

		// getUserpassword:state=>state.userpassword
	},


}

export default user
