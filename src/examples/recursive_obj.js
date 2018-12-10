let {Codec,TypeFactory,Utils, Types, WireTypes} = require('../index')

let codec = new Codec();

let SubA = TypeFactory.create('SubA', [{
    name: "a",
    type: Types.String
},
{
    name: "b",
    type: Types.Int8
},
{
    name: "sub2",
    type: Types.Struct
}])

let SubA2 = TypeFactory.create('SubA2', [ {
   name: "a",
    type: Types.String
},
{
    name: "b",
    type: Types.Int8
}
])


let A = TypeFactory.create('A', [{
        name: "a",
        type: Types.Int8
    },
    {
        name: "b",
        type: Types.String
    },
    {
        name: "sub",
        type: Types.Struct
    }
])

let B = TypeFactory.create('B', [{
    name: "a",
    type: Types.String
},
{
    name: "b",
    type: Types.Int8
},
{
    name: "c",
    type: Types.Int8
},

{
    name: "d",
    type: Types.Struct
}
])
let subC = TypeFactory.create('SubC', [ {
     name: "a",
     type: Types.String
 }
 ])

let C = TypeFactory.create('C', [{
    name: "a",
    type: Types.Int64
},
{
    name: "b",
    type: Types.Int8
},
{
    name: "c",
    type: Types.String
},
{
    name: "d",
    type: Types.Struct
},
{
    name: "e",
    type: Types.ByteSlice
}
])

let Slice = TypeFactory.create('Slice', [{
    name: "a",
    type: Types.ByteSlice
}
],Types.ByteSlice)

codec.registerConcrete(new A(), "SimpleStruct", {}) 
codec.registerConcrete(new C(), "shareledger/MsgSend", {}) 
codec.registerConcrete(new Slice(), "shareledger/PubSecp256k1", {})
//codec.registerConcrete(new subC(),"shareledger/SubStruct",{})
let subObj = new SubA(10)
let subObj2 = new SubA2("Do Ngoc Tan",21)
let aObj = new A(23,"Sanh la tin", new SubA("Toi la Tan",12,subObj2))    

let arr =[100,221,124,1,35]
let slice = new Slice(arr)
let c = new C(100,10,"Toi La Tan", new subC("Truong Huynh Anh Thu"),slice)


let binary = codec.marshalBinary(c)
 //console.log("binary=",binary.toString())
 //console.log("fullObj=",aObj.type)
let bObj = new A()
codec.unMarshalBinary(binary,bObj)
if( Utils.isEqual(aObj,bObj)) {
    console.log("equal")
}
else console.log("Not equal")





/*
codec1.registerConcrete(new B(), "SimpleStruct", {})  
let obj  = new B("Tan",1,2,new SubA2("sanh la tin",21));
let obj2 = new B();
let obj3 = new B()
let binary = codec1.marshalBinary(obj)
//console.log(binary)    
console.log(obj)
codec1.unMarshalBinary(binary,obj2)
console.log("obj2=",obj2)
console.log(Utils.isEqual(obj,obj2))

*/