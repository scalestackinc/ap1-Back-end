"use strict";

const connectToDatabase = require('./db');

function HTTPError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

module.exports.create = async (event) => {
    try {
        const {
            User
        } = await connectToDatabase()
        const user = await User.create(JSON.parse(event.body))
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(user)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Data cannot be created'
        }
    }
}

module.exports.getOne = async (event) => {
    try {
        const {
            User
        } = await connectToDatabase()
        const user = await User.findById(event.pathParameters.id)
        if (!user) throw new HTTPError(404, `User with id: ${event.pathParameters.id} was not found`)
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(user)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not fetch the user.'
        }
    }
}

module.exports.getAll = async () => {
    try {
        const {
            User
        } = await connectToDatabase()
        const user = await User.findAll()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(user)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Could not fetch the all users'
        }
    }
}

module.exports.update = async (event) => {
    try {
        const input = JSON.parse(event.body)
        const {
            User
        } = await connectToDatabase()
        const user = await User.findById(event.pathParameters.id)
        if (!user) throw new HTTPError(404, `User with id: ${event.pathParameters.id} was not found`)
        if (input.username) user.username = input.username
        if (input.device) user.device = input.device
        await user.save()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(user)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not update the user.'
        }
    }
}

module.exports.destroy = async (event) => {
    try {
        const {
            User
        } = await connectToDatabase()
        const user = await User.findById(event.pathParameters.id)
        if (!user) throw new HTTPError(404, `User with id: ${event.pathParameters.id} was not found`)
        await user.destroy()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(user)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could destroy fetch the user.'
        }
    }
}
