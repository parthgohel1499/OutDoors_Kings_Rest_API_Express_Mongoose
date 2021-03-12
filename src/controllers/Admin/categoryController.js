import { hordingsCategory } from '../../models/models';
import {
    addCategoryService,
    viewCategoryService,
    editCategoryService,
    deleteCategoryService
} from '../../services/category.service';
require('dotenv').config();


async function addcategory(req, res) {

    try {
        console.log("image path : ", req.file);

        const { categoryname, description, hordingsize } = req.body;
        const imagePath = req.file ? req.file.path : null

        const insertCategory = await addCategoryService(categoryname, description, hordingsize, imagePath)
        res.status(200).send({ message: "Category Added Success !", status: 200, data: insertCategory })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400, data: null });
    }
}

async function viewCategory(req, res) {

    try {
        const { categoryId } = req.query;
        const viewCategory = await viewCategoryService(categoryId);
        res.status(200).send({ message: "Success !", status: 200, data: viewCategory })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 });
    }
}

async function editCategory(req, res) {

    try {
        const { categoryId } = req.params;
        var findId = await hordingsCategory.findOne({ _id: categoryId })
        const imageCondition = req.file ? req.file.path : findId.image
        const { categoryname, description, hordingsize } = req.body;

        const updateCategory = await editCategoryService(categoryId, imageCondition, categoryname, description, hordingsize)
        res.status(200).send({ message: updateCategory, status: 200 })


    } catch (error) {
        res.status(error.status || 400).send({ message: error.message, status: process.env.FAILED });
    }
}

async function deleteCategory(req, res) {

    try {
        const { categoryId } = req.params;
        const categoryDelete = await deleteCategoryService(categoryId);
        res.status(200).send({ message: categoryDelete, status: 200 })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 })
    }
}

export { addcategory, viewCategory, editCategory, deleteCategory }