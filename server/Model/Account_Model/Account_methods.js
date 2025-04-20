export default function addMethods(schema){

    schema.methods.changeName = function (newName){
        this.name = newName;
        return this.save();
    }
    
}
