import { PackageAdd, PackageView, PackageEdit, PackageDelete } from '../../services/package.service'

async function addPackage(req, res, next) {
    try {
        const { Packagename, Price, Duration } = req.body;
        const { id } = req.query

        const Package = await PackageAdd(Packagename, Price, Duration, id)
        res.status(200).send({ message: "Package Added !", status: 200, data: Package })

    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED, data: null });
    }
}

async function viewPackage(req, res, next) {
    try {
        const { packageId } = req.query;

        const getPackage = await PackageView(packageId);
        res.status(200).send({ message: "success", status: 200, data: getPackage })

    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED });
    }
}

async function deletePackage(req, res, next) {
    try {
        const { packageId } = req.params;

        const PackageDel = await PackageDelete(packageId)
        res.status(200).send({ message: "Package Deleted !", status: 200, data: PackageDel })


    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED, data: null });
    }
}

async function editPackage(req, res, next) {
    try {
        const { packageId } = req.params;
        const { Packagename, Price, Duration } = req.body;

        const PackageUpdate = await PackageEdit(packageId, Packagename, Price, Duration)
        res.status(200).send({ message: "Package Update Successfull !", status: 200, data: PackageUpdate })

    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED, data: null })
    }
}

export { addPackage, viewPackage, deletePackage, editPackage }