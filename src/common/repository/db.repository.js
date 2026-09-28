// database.repository.service.js

export const create = async ({
    model,
    data = [],
    options = {}
}) => {

    return await model.create(data, options)

}


export const createOne = async ({
    model,
    data,
    options = {}
}) => {

    const [doc] = await model.create([data], options)

    return doc

}


export const find = async ({
    model,
    filter = {},
    options = {}
}) => {

    const query = model.find(filter)
    if (options.select) {
        query.select(options.select)
    }

    if (options.populate) {
        query.populate(options.populate)
    }

    if (options.sort) {
        query.sort(options.sort)
    }

    if (options.skip) {
        query.skip(options.skip)
    }

    if (options.limit) {
        query.limit(options.limit)
    }

    if (options.lean) {
        query.lean()
    }

    if (options.session) {
        query.session(options.session)
    }

    return await query.exec()

}


export const findOne = async ({
    model,
    filter = {},
    
    options = {}
}) => {

    const query = model.findOne(filter)
    if (options.select) {
        query.select(options.select)
    }

    if (options.populate) {
        query.populate(options.populate)
    }

    if (options.sort) {
        query.sort(options.sort)
    }

    if (options.lean) {
        query.lean()
    }

    if (options.session) {
        query.session(options.session)
    }

    return await query.exec()

}


export const findById = async ({
    model,
    id,
    
    options = {}
}) => {

    const query = model.findById(id)
    if (options.select) {
        query.select(options.select)
    }

    if (options.populate) {
        query.populate(options.populate)
    }

    if (options.lean) {
        query.lean()
    }

    if (options.session) {
        query.session(options.session)
    }

    return await query.exec()

}


export const insertMany = async ({
    model,
    data = [],
    options = {}
}) => {

    return await model.insertMany(data, options)

}


export const updateOne = async ({
    model,
    filter = {},
    update = {},
    options = {}
}) => {

    return await model.updateOne(
        filter,
        update,
        options
    )

}


export const updateMany = async ({
    model,
    filter = {},
    update = {},
    options = {}
}) => {

    return await model.updateMany(
        filter,
        update,
        options
    )

}


export const findOneAndUpdate = async ({
    model,
    filter = {},
    update = {},
    options = {}
}) => {

    return await model.findOneAndUpdate(
        filter,
        update,
        {
            new: true,
            runValidators: true,
            ...options
        }
    )

}


export const findByIdAndUpdate = async ({
    model,
    id,
    update = {},
    options = {}
}) => {

    return await model.findByIdAndUpdate(
        id,
        update,
        {
            new: true,
            runValidators: true,
            ...options
        }
    )

}


export const findOneAndReplace = async ({
    model,
    filter = {},
    replacement = {},
    options = {}
}) => {

    return await model.findOneAndReplace(
        filter,
        replacement,
        {
            returnDocument: "after",
            runValidators: true,
            ...options
        }
    )

}


export const findByIdAndDelete = async ({
    model,
    id,
    options = {}
}) => {

    return await model.findByIdAndDelete(
        id,
        options
    )

}


export const findOneAndDelete = async ({
    model,
    filter = {},
    options = {}
}) => {

    return await model.findOneAndDelete(
        filter,
        options
    )

}


export const deleteOne = async ({
    model,
    filter = {},
    options = {}
}) => {

    return await model.deleteOne(
        filter,
        options
    )

}


export const deleteMany = async ({
    model,
    filter = {},
    options = {}
}) => {

    return await model.deleteMany(
        filter,
        options
    )

}



export const countDocuments = async ({
    model,
    filter = {},
    options = {}
}) => {

    return await model.countDocuments(
        filter,
        options
    )

}

export const exists = async ({
    model,
    filter = {}
}) => {

    return await model.exists(filter)

}


export const distinct = async ({
    model,
    field,
    filter = {},
    options = {}
}) => {

    return await model.distinct(
        field,
        filter,
        options
    )

}


export const aggregate = async ({
    model,
    pipeline = [],
    options = {}
}) => {

    return await model.aggregate(
        pipeline,
        options
    )

}

