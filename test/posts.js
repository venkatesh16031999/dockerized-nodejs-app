const except =  require("chai").expect;
const { MongoClient } = require("mongodb");

const postController = require("../controllers/posts");

let db;
let client;

describe("Posts controller test",()=>{

    before((done)=>{

        client = new MongoClient("mongodb://mongo:27017",{useUnifiedTopology:true});
        client.connect().then((client)=>{
            db = client.db("testing-database");
            done();
        })
    })

    it("adding post should return error response because of not handled external db service",(done)=>{
        const res = {
            statusCode: 200,
            responseData: null,
            status: function(code){
                this.statusCode = code;
                return this;
            },
            send: function(data){
                this.responseData = data.data;
            }
        }

        postController.addPost({},res).then(() => {
            except(res.statusCode).to.equal(500);
            done();
        })

    })

    after((done)=>{
        client.close().then(()=>{
            done();
        });
    })

})