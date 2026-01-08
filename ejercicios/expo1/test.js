const obj={
    name:"juanes",
    greet: function(){
        setTimeout(function(){
            console.log("hola "+ this.name)
        },100)
    }
}
obj.greet()