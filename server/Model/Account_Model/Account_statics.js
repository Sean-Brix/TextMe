export default function addStatics(schema){

    schema.statics.findByName = async function (name){
        return this.findOne({ name: name });
    }

    schema.statics.newAccount = async function (account){

        try {

            if (!account){
                throw new Error('Account data is required');
            }
            
            const newAccount = await this(account);
            return await newAccount.save();

        } 
        
        catch (err){

            throw new Error(`Error creating account: ${err.message}`);

        }

    }
    
}
