import express from 'express'
import data from '../../../database.json'
import { IProduct, ProductNoID } from '../../types'
import { v4 } from 'uuid'
import { getAll, saveData } from '../../services/ProductServices'
import {Product} from '../../models/ProductModel'

export const router = express.Router()

//@Get All
router.get('/', async (req, res) => {
    // const products = await getAll(data.products)
    const products = await Product.find()
    if (products) {
        res.status(200).json(products)
    } else {
        res.status(404).json('There are no products')
    }

})

//@Get by ID
router.get('/:id', async (req, res) => {
    
    // const product = await findByID(req.params.id, data.products)
    const product = await Product.findById(req.params.id)

    if (product) {
        res.status(200).json(product)
    } else {
        res.status(400).json(`There is no product with id: ${req.params.id}`)
    }
})

//@Create product
router.post('/', async (req, res) => {

    const newProduct: IProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }
    // if (req.body) {
    //     newProduct = { id: v4(), ...req.body }
    // }



    if (newProduct.description && newProduct.name && newProduct.price) {
        // const products = await getAll(data.products)
        // products.push(newProduct)
        // await saveData(data, data.products, products)
        const product = await Product.create(newProduct)
        res.status(201).json(product)
    } else {
        res.status(400).json('Enter a valid  product')
    }
})

//@Update product
router.put('/:id', async (req, res) => {
    const newProduct: IProduct= {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    // const oldProduct = await findByID(req.params.id, data.products)
    const oldProduct = await Product.findById(req.params.id)

    if (oldProduct) {
        const updProduct: IProduct = {
            name: newProduct.name || oldProduct.name,
            description: newProduct.description || oldProduct.description,
            price: newProduct.price || oldProduct.price
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updProduct)

        // const products = await getAll(data.products)
        // const updatedProducts = products.map((par) => {
        //     if (par.id === req.params.id) {
        //         return updProduct
        //     }
        //     return par
        // })


        // await saveData(data, data.products, updatedProducts)

        res.status(200).json(product)
    } else {
        res.status(400).json(`There is no product with id: ${req.params.id}`)
    }
})

//@Delete product
router.delete('/:id', async (req, res) => {
    // const delProduct = await findByID(req.params.id, data.products)
    const delProduct = await Product.findByIdAndDelete(req.params.id)

    if (delProduct) {
    //     const products = await getAll(data.products)
    //     const newProducts = products.filter((par) => {
    //         if (par.id !== req.params.id) {
    //             return par
    //         }
    //     })

        
    //     await saveData(data, data.products, newProducts)

        res.status(200).json({id: req.params.id})
    } else {
        res.status(400).json(`There is no product with id: ${req.params.id}`)
    }
})