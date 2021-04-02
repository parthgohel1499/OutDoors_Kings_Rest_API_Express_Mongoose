import { hordingsCategory } from '../models/models';
import { verifyObjectId } from '../utils/verifyId';

const addCategoryService = async (categoryname, description, hordingsize, categoryImage) => {
    const category = new hordingsCategory({
        categoryname: categoryname,
        description: description,
        hordingsize: hordingsize,
        image: categoryImage
    });

    const isExsist = await hordingsCategory.FindCategoryByName({ categoryname: categoryname });


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
            const viewCategory = await hordingsCategory.FindCategoryById({ _id: categoryId })

            if (!viewCategory) {
                throw new Error("Not Found !")
            }
            return viewCategory
        }
        throw new Error("incorrect Category Id !")
    }
    else {
        const viewAllCategory = await hordingsCategory.FindAllCategory()
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
            var findId = await hordingsCategory.FindCategoryById({ _id: categoryId })
            const path = imageCondition

            if (!findId) {
                throw new Error("Not Exist !")
            }
            const filter = { _id: categoryId }
            const update = { categoryname: categoryname, description: description, hordingsize: hordingsize, image: path }

            await hordingsCategory.UpdateCategory(filter, update)

            return "Update Successfull !";
        }
        throw new Error("Enter Valid Id !")
    }
    throw new Error("Incorrect Id !")
}

const deleteCategoryService = async (categoryId) => {
    if (categoryId) {
        if (verifyObjectId(categoryId)) {

            const query = { _id: categoryId }
            const isExist = await hordingsCategory.FindCategoryById(query);

            if (!isExist) {
                throw new Error("This Category Is Not Exist !")
            }
            await hordingsCategory.DeleteCategory({ _id: categoryId })

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