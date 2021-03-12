import { hordingsCategory } from '../models/models';
import { verifyObjectId } from '../services/verifyId';

const addCategoryService = async (categoryname, description, hordingsize, imagePath) => {
    const category = new hordingsCategory({
        categoryname: categoryname,
        description: description,
        hordingsize: hordingsize,
        image: imagePath
    });

    const isExsist = await hordingsCategory.findOne({ categoryname: categoryname });
    // console.log("is exists : ", isExsist);

    if (!isExsist) {
        const addCategory = await category.save()

        if (!addCategory) {
            throw new Error("something went wrong !")
        }
        return addCategory
    }
    throw new Error("This Category Is Already Exist !")
}

const viewCategoryService = async (categoryId) => {
    if (categoryId) {
        if (verifyObjectId(categoryId)) {
            const viewCategory = await hordingsCategory.findById({ _id: categoryId })

            if (!viewCategory) {
                throw new Error("Not Found !")
            }
            return viewCategory
        }
        throw new Error("incorrect Category Id !")
    }
    else {
        const viewAllCategory = await hordingsCategory.find()
        console.log(viewAllCategory);

        if (!viewAllCategory) {
            throw {
                status: process.env.FAILED,
                message: "unable to show category !",
                data: null
            }
        }
        return viewAllCategory;
    }
}

const editCategoryService = async (categoryId, imageCondition, categoryname, description, hordingsize) => {
    if (categoryId) {
        if (verifyObjectId(categoryId)) {
            var findId = await hordingsCategory.findOne({ _id: categoryId })
            const path = imageCondition

            if (!findId) {
                throw new Error("Not Exist !")
            }

            const filter = { _id: categoryId }
            const update = { categoryname: categoryname, description: description, hordingsize: hordingsize, image: path }

            await hordingsCategory.updateOne(filter, update)

            return "category is updated successfully !";
        }
        throw new Error("Enter Valid Id !")
    }
    throw new Error("Incorrect Id !")
}

const deleteCategoryService = async (categoryId) => {
    if (categoryId) {
        if (verifyObjectId(categoryId)) {

            const isExist = await hordingsCategory.findById({ _id: categoryId });

            if (!isExist) {
                throw new Error("This Category Is Not Exist !")
            }
            await hordingsCategory.deleteOne({ _id: categoryId })

            return "Category Delete Successfull !"
        }
        throw new Error("This category not exist!")
    }
    throw new Error("Incorrect Id !")

}

export {
    addCategoryService,
    viewCategoryService,
    editCategoryService,
    deleteCategoryService
}