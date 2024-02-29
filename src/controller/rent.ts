import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


/**create an object of Prisma */

const prisma: PrismaClient = new PrismaClient()
/** create a function to "create" new event  */
/** asyncronus = fungsi yang berjalan sesuai paralel */

const createrent = async (request: Request, response: Response) => {
    try {
        /** read a request from body */
        const car_Id: number = Number(request.body.car_Id)
        const nama_pengguna: string = (request.body.nama_pengguna)
        // const tanggal: string = new Date(request.body.tanggal).toISOString()
        const lama_sewa = Number (request.body.lama_sewa)
        
        /** insert to events table  using prisma */
        const car = await prisma.car.findFirst({ where: { Id: car_Id } })

        if (!car) {
            return response.status(400).json({
                status: false,
                message: " Data can not found"
            })
        }

        const total_bayar = car.harga_perhari * lama_sewa
        
        const newdata = await prisma.rent.create(
            {
                data: {
                    car_Id,
                    nama_pengguna,
                    lama_sewa,
                    total_bayar
                }
            }
        );

        return response.status(200).json({
            status: true,
            message: "TERSIMPAN IHIYYY",
            data: newdata
        });
        
    } catch (error) {
        return response.status(500).json({
            status: false, 
            message: `no smoking`,
        })
    }
}

/** create to function to READ events */
const readrent = async (request: Request, response: Response) => {
    try {
        const dataadmin = await prisma.rent.findMany()
        return response.status(200).json({
            status: true,
            message: "Terimakasih Ya Allah",
            data: dataadmin
        })
    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}
const updaterent = async (request: Request, response: Response) => {
    try {
        const rent_Id = Number(request.params.idrent);

        const car_Id = Number(request.body.car_Id)
        const nama_pengguna: string = (request.body.nama_pengguna)
        // const tanggal: string = new Date(request.body.tanggal).toISOString()
        const lama_sewa: number = Number(request.body.lama_sewa)

        const findrent = await prisma.rent.findFirst({ where: { idrent: rent_Id } })

        if (!findrent) return response.status(200).json({
            status: false,
            message: "TIDAK KETEMU",
        });

        const car = await prisma.car.findFirst({
            where: {
                Id: car_Id
            }
        });

        const total_bayar = Number(car?.harga_perhari) * lama_sewa;

        const updaterent = await prisma.rent.update({
            data: {
                car_Id: car_Id || findrent.car_Id,
                nama_pengguna: nama_pengguna || findrent.nama_pengguna,
                lama_sewa: lama_sewa || findrent.lama_sewa,
                total_bayar: total_bayar
            },
            where: { idrent: car_Id }
        })

        return response.status(200).json({
            status: true,
            message: "BISA LEKK",
            updaterent
        });

    }
    catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}

const deleterent = async (request: Request, response: Response) => {
    try {
        const idrent = Number(request.params.idrent)
        const car_Id = Number(request.body.car_Id)
        const findrent = await prisma.rent.findFirst({ where: { idrent: car_Id } })
        if (!findrent) return response.status(200).json({
            status: false,
            message: "GAK NEMU WOYYY",
        })
        const deleterent = await prisma.rent.delete({
            where: { idrent: car_Id }
        })
        return response.status(200).json({
            status: true,
            message: "KEDELETE YAWWW",
        })

    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}


export { createrent, readrent, updaterent, deleterent } 