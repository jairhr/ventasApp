import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { fetchProductos, deleteProducto, updateProducto, createProducto } from '../api/productos';
import { MainLayout } from '../components/layout/MainLayout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import type { Producto } from '../types';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export const Productos = () => {
    const token = useAuthStore(state => state.token);
    const [productos, setProductos] = useState<Producto[]>([]);
    const toast = useRef<Toast>(null);
    const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
    const [productoNuevo, setProductoNuevo] = useState<Omit<Producto, 'id'>>({ nombre: '', precio: 0, stock: 0 });
    const [dialogVisible, setDialogVisible] = useState(false);

    const openNuevoProducto = () => {
        setProductoNuevo({ nombre: '', precio: 0, stock: 0 });
        setProductoEditando(null);
        setDialogVisible(true);
    };

    const openEditarProducto = (producto: Producto) => {
        setProductoNuevo({ nombre: producto.nombre, precio: producto.precio, stock: producto.stock });
        setProductoEditando(producto);
        setDialogVisible(true);
    };

    const loadProductos = () => {
        if (!token) return;
        fetchProductos(token)
            .then(setProductos)
            .catch(() => toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar productos' }));
    };

    const handleDelete = async (id: number) => {
        if (!token) return;
        try {
            await deleteProducto(id, token);
            toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Producto eliminado' });
            loadProductos();
        } catch (err) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar' });
        }
    };

    const guardarProducto = async () => {
        if (!token) return;
        try {
            if (productoEditando) {
                await updateProducto(productoEditando.id, productoNuevo, token);
                toast.current?.show({ severity: 'success', summary: 'Actualizado', detail: 'Producto actualizado correctamente' });
            } else {
                await createProducto(productoNuevo, token);
                toast.current?.show({ severity: 'success', summary: 'Creado', detail: 'Producto creado correctamente' });
            }
            setDialogVisible(false);
            loadProductos();
        } catch (err) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el producto' });
        }
    };

    useEffect(loadProductos, [token]);

    const actionTemplate = (row: Producto) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" onClick={() => openEditarProducto(row)} />
            <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => handleDelete(row.id)} />
        </div>
    );


    return (
        <MainLayout>
            <Dialog header={productoEditando ? 'Editar Producto' : 'Nuevo Producto'}
                visible={dialogVisible}
                style={{ width: '30rem' }}
                modal
                onHide={() => setDialogVisible(false)}
                footer={
                    <div className="flex justify-content-end gap-2">
                        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setDialogVisible(false)} />
                        <Button label="Guardar" icon="pi pi-check" onClick={guardarProducto} />
                    </div>
                }
            >
                <div className="flex flex-column gap-3">
                    <div>
                        <label htmlFor="nombre" className="block mb-1">Nombre</label>
                        <InputText id="nombre" className="w-full" value={productoNuevo.nombre} onChange={(e) => setProductoNuevo({ ...productoNuevo, nombre: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="precio" className="block mb-1">Precio</label>
                        <InputNumber id="precio" className="w-full" value={productoNuevo.precio} onValueChange={(e) => setProductoNuevo({ ...productoNuevo, precio: e.value ?? 0 })} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block mb-1">Stock</label>
                        <InputNumber id="stock" className="w-full" value={productoNuevo.stock} onValueChange={(e) => setProductoNuevo({ ...productoNuevo, stock: e.value ?? 0 })} />
                    </div>
                </div>
            </Dialog>

            <Toast ref={toast} />
            <Card title="Productos">
                <Button label="Nuevo Producto" icon="pi pi-plus" className="mb-3" onClick={openNuevoProducto} />
                <DataTable value={productos} paginator rows={5} stripedRows responsiveLayout="scroll">
                    <Column field="id" header="ID" sortable />
                    <Column field="nombre" header="Nombre" sortable />
                    <Column field="precio" header="Precio" sortable body={(row) => `$${row.precio.toFixed(2)}`} />
                    <Column field="stock" header="Stock" sortable />
                    <Column body={actionTemplate} header="Acciones" />
                </DataTable>
            </Card>
        </MainLayout>
    );


};
