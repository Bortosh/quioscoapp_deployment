import React from "react";
import useSWR from 'swr'
import AdminLayout from "@/layout/AdminLayout";
import axios from "axios";
import Orden from "@/Components/Orden";

const Admin = () => {

    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)

    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 100 })

    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className="text-4xl font-black">Panel de Administracion</h1>
            <p className="text-2xl my-10">Administra las Ordenes</p>

            {
                data && data.length
                    ? (
                        data?.map(orden => (
                            <Orden orden={orden} key={orden.id}/>
                        )))
                    : (
                        <p>No Hay Ordenes Pendientes</p>
                )
            }

        </AdminLayout>
    )
}

export default Admin;