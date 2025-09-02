const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const User = require('../models/userModel');
const Country = require('../models/country');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        countryid: { type: GraphQLInt },
        CountryName: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.findAll();
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(_, args) {
                return User.findByPk(args.id);
            }
        },
        countries: {
            type: new GraphQLList(CountryType),
            resolve() {
                return Country.findAll();
            }
        },
        country: {
            type: CountryType,
            args: { countryid: { type: GraphQLInt } },
            resolve(_, args) {
                return Country.findByPk(args.countryid);
            }
        }
    }
});

// Mutation for adding and deleting users and countries
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(_, args) {
                return await User.create(args);
            }
        },
        addCountry: {
            type: CountryType,
            args: {
                CountryName: { type: GraphQLString }
            },
            async resolve(_, args) {
                return await Country.create(args);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: GraphQLInt }
            },
            async resolve(_, args) {
                const user = await User.findByPk(args.id);
                if (!user) throw new Error("User not found");
                await user.destroy();
                return user;
            }
        },
        deleteCountry: {
            type: CountryType,
            args: {
              countryid: { type: GraphQLInt }
            },
            async resolve(_, args) {
              const country = await Country.findByPk(args.countryid);
              if (!country) throw new Error("Country not found");
              await country.destroy();
              return country;
            }
          }
          
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
