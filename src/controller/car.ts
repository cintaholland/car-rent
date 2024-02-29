import { PrismaClient } from "@prisma/client";
import { Request, Response, } from "express";

const prisma: PrismaClient = new PrismaClient()
const createcar = async (request: Request, response: Response) => {
    try {
        const merk_mobil: string = (request.body.merk_mobil)
        const harga_perhari: number = Number(request.body.harga_perhari)
        const nopol: string = (request.body.nopol)
        const newdata = await prisma.car.create(
            {
                data: {
                    merk_mobil,
                    harga_perhari,
                    nopol
                }
            })

        return response.status(200).json({
            status: true,
            message: "BERHASIL MAMANG",
            data: newdata

        })
    } catch (error) {
        return response.status(500).json({
            status: false, message: `no smoking`,
        })
    }
}

const readcar = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1
        const qty = Number(request.query.qty) || 10
        const keyword = request.query.keyword?.toString() || ""
        const dataadmin = await prisma.car.findMany({
            take: qty, //untuk mendefinisikan jumlah data yang diambil
            skip: (page - 1) * qty,
            where: {
                OR: [
                    { nopol: { contains: keyword } },
                    { merk_mobil: { contains: keyword } },
                ]
            },
            orderBy: { Id: "asc" }
        })
        return response.status(200).json({
            status: true,
            message: "KESIMPAN YAKKK",
            data: dataadmin

        })
    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}


const updatecar = async (request: Request, response: Response) => {
    try {
        const Id = Number(request.params.Id)
        const merk_mobil: string = (request.body.merk_mobil)
        const harga_perhari: number = Number(request.body.harga_perhari)
        const nopol: string = (request.body.nopol)

        const status = (request.body.status)
        const findcar = await prisma.car.findFirst({ where: { Id: Id } })
        if (!findcar) return response.status(200).json({
            status: false,
            message: "TIDAK KETEMU",
        })

        const updatecar = await prisma.car.update({
            data: {
                Id, merk_mobil, harga_perhari, nopol
            },
            where: { Id: Id }
        })

        return response.status(200).json({
            status: true,
            message: "SLEBEW MAMANG",
        })

    }
    catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }

}
const deletecar = async (request: Request, response: Response) => {
    try {
        const Id = Number(request.params.Id)
        const findcar = await prisma.car.findFirst({ where: { Id: Id } })
        if (!findcar) return response.status(200).json({
            status: false,
            message: "TIDAK BISA HARUS DAMKAR",
        })
        const deletecar = await prisma.car.delete({
            where: { Id: Id }
        })
        return response.status(200).json({
            status: true,
            message: "WAHHH DAMKAR GAK NGATASI",
        })

    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}
export { createcar, readcar, updatecar, deletecar } 