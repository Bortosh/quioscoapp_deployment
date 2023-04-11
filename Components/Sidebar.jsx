import React from "react";
import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {

    const { categorias } = useQuiosco()

    return (
        <>
            <div className="flex justify-center items-center mt-5">
                <Image
                    width={200}
                    height={100}
                    src='/assets/img/logo.svg' alt='imagen logotipo'
                />
            </div>

            <nav className="mt-10">
                {
                    categorias.map(categoria => (
                        <div key={categoria.id}>
                            <Categoria categoria={categoria} />
                        </div>
                    ))
                }
            </nav>

        </>
    )
}

export default Sidebar;