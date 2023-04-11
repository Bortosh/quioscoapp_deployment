import { formatearDinero } from "@/helpers";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const Orden = ({ orden }) => {

    const { id, nombre, pedido, total } = orden

    const completarOrden = async () => {

        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden Lista', { autoClose: 3000 })
        } catch (error) {
            toast.error('Hubo un error', { autoClose: 3000 })
        }

    }

    return (
        <div className="border p-10 space-y-5 mb-3">
            <h3 className="text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre}</p>

            <div>
                {
                    pedido && pedido?.map(({ id, cantidad, imagen, nombre, precio }) => (
                        <div key={id} className="py-3 flex border-b last-of-type:border-0 items-center">
                            <div className="w-32">
                                <Image
                                    width={400}
                                    height={500}
                                    src={`/assets/img/${imagen}.jpg`}
                                    alt={`Imagen platillo ${nombre}`}
                                />
                            </div>

                            <div className="p-5 space-y-2">
                                <h4 className="text-xl font-bold text-amber-500">{nombre}</h4>
                                <p className="text-lg font-bold">Cantidad: {cantidad}</p>
                            </div>

                        </div>
                    ))
                }
            </div>
            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-4xl text-amber-500">
                    Total a Pagar: {formatearDinero(total)}
                </p>

                <button 
                className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
                type="button"
                onClick={() => completarOrden(id)}
                >
                    Completar Orden
                </button>
            </div>

        </div>
    )
}

export default Orden;