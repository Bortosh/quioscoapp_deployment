import React from "react";
import { useRouter } from "next/router";
import useQuiosco from "@/hooks/useQuiosco";

const pasos = [
    { paso: 1, nombre: 'Menú', url: '/' },
    { paso: 2, nombre: 'Resumen', url: '/Resumen' },
    { paso: 3, nombre: 'Datos y Total', url: '/Total' }
]

const Pasos = () => {
    
    const router = useRouter()

    const calcularProgreso = () => {
        let valor;

        if(router.pathname === '/') {
            valor = 3
        }else if( router.pathname === '/Resumen') {
            valor = 47
        }else {
            valor = 100
        }
        return valor
    }

    return (
        <>
            <div className="flex justify-between mb-5">
                {
                    pasos.map(paso => (
                        <button onClick={() => {
                            router.push(paso.url)
                        }} key={paso.paso} className="text-2xl font-bold">
                            {paso.nombre}
                        </button>
                    ))
                }
            </div>

                <div className="bg-gray-100 mb-10">
                    <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white" style={{width: `${calcularProgreso()}%`}}>

                    </div>
                </div>

        </>
    )
}

export default Pasos;