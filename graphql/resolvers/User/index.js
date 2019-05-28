// The User Schema
import User from "../../../server/models/User";

export default {
    Query: {
        user: (root, args) => {
            return new Promise((resolve, reject) => {
                User.findOne(args).exec((err, res) => {
                    err? reject(err): resolve(res);
                });
            });
        },
        users: () => {
            return new Promise((resolve, reject) => {
                User.find({}).populate().exec((err, res) => {
                    err? reject(err): resolve(res);
                });
            });
        }
    },
    Mutation: {
        addUser: (root, { id, name, email }) => {
            const newUser = new User({ id, name, email });

            return new Promise((resolve, reject) => {
                newUser.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        editUser: (root, { id, name, email }) => {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ id }, { $set: { name, email } }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res);
                    }
                );
            });
        },
        deleteUser: (root, args) => {
            console.log(args.id);
            return new Promise((resolve, reject) => {
                User.findByIdAndDelete(args.id).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }
    }
}
