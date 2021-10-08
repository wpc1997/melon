const city={
    namespaced:true,
    state:{
        city:[
			{
				icon:'',
				name:'安徽',
			},
			{
				icon:'',
				name:'澳门',
			},
			{
				icon:'',
				name:'北京',
			},
			{
				icon:'',
				name:'重庆',
			},
		]
    },
    mutations:{
        
    },
    actions:{

    },
    getters:{
        getbaseUserInfo:state=>state.city,
        // getUsername:state=>state.username,
        
        // getUserpassword:state=>state.userpassword
    },
	

}

export default city