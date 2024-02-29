import { PrismaClient } from "@prisma/client";
import { Request, Response, request } from "express";
import md5 from "md5"
import { sign } from "jsonwebtoken";

/**create an object of Prisma */

const prisma: PrismaClient = new PrismaClient()
/** create a function to "create" new event  */
/** asyncronus = fungsi yang berjalan sesuai paralel */
const createadmin = async (request: Request, response: Response) => {
    try {
        /** read a request from body */
        const nama_admin: string = (request.body.nama_admin)
        const email: string = (request.body.email)
        const password: string = md5(request.body.password)

        /** insert to events table  using prisma */
        const newdata = await prisma.admin.create(
            {
                data: {
                    nama_admin,
                    email,
                    password,
                }
            }
        )
        return response.status(200).json({
            status: true,
            message: "KELEBONNN OYYYY",
            data: newdata

        })
    } catch (error) {
        return response.status(500).json({
            status: false, message: `no smoking`,
        })
    }
}
/** create to function to READ events */
const readadmin = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1
        const qty = Number(request.query.qty) || 10
        const keyword = request.query.keyword?.toString() || ""
        const dataadmin = await prisma.admin.findMany({
            take: qty, //untuk mendefinisikan jumlah data yang diambil
            skip: (page - 1) * qty,
            where: {
                OR: [
                    { nama_admin: { contains: keyword } },
                    { password: { contains: keyword } },
                ]
            },
            orderBy: { nama_admin: "asc" }
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


const updateadmin = async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id)
        const nama_admin: string = (request.body.nama_admin)
        const email: string = (request.body.email)
        const password: string = md5(request.body.password)
        const findadmin = await prisma.admin.findFirst({ where: { id: id } })
        if (!findadmin) return response.status(200).json({
            status: false,
            message: "GAK KETEMU OYYY ",
        })

        const updateadmin = await prisma.admin.update({
            data: {
                id, nama_admin, email, password
            },
            where: { id: id }
        })

        return response.status(200).json({
            status: true,
            message: "WES KE UPDATE SAYANK",
        })

    }
    catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }

}

const deleteadmin = async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id)
        const findadmin = await prisma.admin.findFirst({ where: { id: id } })
        if (!findadmin) return response.status(200).json({
            status: false,
            message: "GAK KEHAPUS",
        })
        const deleteadmin = await prisma.admin.delete({
            where: { id: id }
        })
        return response.status(200).json({
            status: true,
            message: "BISA DIHAPUS LEKKK",
        })

    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}

const login = async (request: Request, response: Response) => {
    try {
        const email = request.body.email
        const password = md5(request.body.password)
        const admin = await prisma.admin.findFirst(
            {
                where: { email: email, password: password }
            }
        )
        if (admin) {
            const payload = admin
            const secretkey = 'lebonnn'
            const token = sign(payload, secretkey)
            return response.status(200).json({
                status: true,
                message: "login berhasil",
                token: token
            })
        }

        else {
            return response.status(200).json({
                status: false,
                message: "no smoking"
            })
        }
    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}
export { createadmin, readadmin, updateadmin, deleteadmin, login }


