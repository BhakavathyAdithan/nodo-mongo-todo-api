const request=require('supertest');
const expect = require('expect');
const {ObjectID}=require('mongodb');
const mongoose=require('mongoose');

const {app}=require('./../server');
const {Todo}=require('./../models/todo');
const {User}=require('./../models/user');
const {todos,populateTodos,users,populateUsers}=require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('Delay to Resolve Promise',()=>{

    it(' creates a delay to make testcases work',(done)=>{
        setTimeout(()=>{
            done();
        },1000);
        
    });
});

describe('POST /todos',()=>{

    it('should create a new todo',(done)=>{
        var text='Run Test from Mocha';
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect(
            (res)=>{
                expect(res.body.todo.text).toBe(text);
            })
        .end((err,res)=>{
            if(err)
            {
                return done(err);
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });

    });

    it('should not create todo with invalid data',(done)=>{

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{

            if(err)
            {
                return done(err);
            }

            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>done(e));
        });

    });

});

describe('GET /todos',()=>{

    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });

});

describe('GET /todos/:id',()=>{

    it('should fetch a todo doc',(done)=>{

        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo doc not found',(done)=>{

        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for in valid object id',(done)=>{

        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
    });

});


describe('DELETE /todos/:id',()=>{

    it('should remove a todo doc',(done)=>{

        var hexId=todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err,res)=>{

            if(err)
            {
                return done(err);
            }

            Todo.findById(hexId).then((todo)=>{
                expect(todo).toBeFalsy();
                done();
            }).catch((e)=>{
                done(e);
            });
        });
    });

    it('should return 404 if todo doc not found',(done)=>{

        request(app)
        .delete(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for in valid object id',(done)=>{

        request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done);
    });

 });

describe('PATCH /todos/:id',()=>{

    it('should update the todo',(done)=>{

        var hexId=todos[0]._id.toHexString();

        request(app)
        .patch(`/todos/${hexId}`)
        .send({"text":"Propose Love","completed":true})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).not.toBe(todos[0].text);
            expect(res.body.todo.completed).toEqual(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);

    });

    it('should clear completedAt when it\'s not completed',(done)=>{

        var hexId=todos[1]._id.toHexString();
        request(app)
        .patch(`/todos/${hexId}`)
        .send({text:"Accept Love",completed:false})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).not.toBe(todos[1].text);
            expect(res.body.todo.completed).toEqual(false);
            expect(res.body.todo.completedAt).toBeNull();
        })
        .end(done);

    });


});

describe('GET /users/me',()=>{

    it('should return a user when authenticated',(done)=>{

        request(app)
        .get('/users/me')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('should return 401 if not authenticated',(done)=>{

        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });

})

describe('POST /users',()=>{

    it('should create an user',(done)=>{

        var email='adithan2013@hotmail.com';
        var password='abc123%';

        request(app)
        .post('/users')
        .send({email,password})
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toBeTruthy();
            expect(res.body.email).toBe(email);
            expect(res.headers['x-auth']).toBeTruthy();
        })
        .end((err)=>{

            if(err)
            {
                return done(err);
            }

            User.findOne({email}).then((user)=>{

                expect(user).toBeTruthy();
                expect(user.password).not.toBe(password);
                done();
            }).catch(()=>done(e));

        });
    });

    it('should return validation errors if request invalid',(done)=>{

        request(app)
        .post('/users')
        .send({email:'and',password:123})
        .expect(400)
        .end(done);
        
    });

});