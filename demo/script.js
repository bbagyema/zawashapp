Vue.createApp(
{
data(){
	return{
		greet:"Hello"
		}
	},
	methods: {
	greetMethod:function(){
			alert(this.greet);
		}
	}
}
).mount("#demo")