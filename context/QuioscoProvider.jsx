import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [categoriaActual, setCategoriaActual] = useState({})
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const url = '/api/categorias'

    const obtenerCategorias = async () => {
        const { data } = await axios(url)
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = (producto) => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {

        if (pedido.some(productoState => productoState.id === producto.id)) {

            const productoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)

            setPedido(productoActualizado)
            toast.success('Guardado Correctamente', { autoClose: 3000 })
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido', { autoClose: 3000 })
        }
        setModal(false)
    }

    const handleEditarCantidades = (id) => {
        const actualizarProducto = pedido.filter(producto => producto.id === id)
        setProducto(actualizarProducto[0])
        setModal(true)
    }

    const handleEliminarProducto = (id) => {
        const filtrarProductos = pedido.filter(producto => producto.id !== id)
        setPedido(filtrarProductos)
    }

    const calcularTotal = () => {
        if (pedido.length === 0) return
        const totalPagar = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(totalPagar)
    }

    useEffect(() => {
        calcularTotal()
    }, [pedido])


    const colocarOrden = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })

            // RESETEAR PEDIDO
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)
            
            toast.success('Pedido Ordenado Exitosamente', { autoClose: 2000 })

            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <QuioscoContext.Provider value={{
            categorias,
            handleClickCategoria,
            categoriaActual,
            producto,
            handleSetProducto,
            modal,
            handleChangeModal,
            pedido,
            handleAgregarPedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total,
            calcularTotal
        }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext;