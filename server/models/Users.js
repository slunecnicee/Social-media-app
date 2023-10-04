const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:20,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:"",
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },

    description:{
        type:String,
        max:50,
        default:""
    },

    isAdmin:{
        type:Boolean,
        default:false
    },
 
    city:{
        type:String,
        max:20,
        default:""
    },
    from:{
        type:String,
        max:20,
        default:""

    },
    relationship:{
       type:Number,
       enum:[1,2,3],
       default:1,
    }
},
{timestamps:true}
);


module.exports=mongoose.model("users",userSchema);

