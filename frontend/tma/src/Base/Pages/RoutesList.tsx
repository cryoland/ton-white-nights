import { Chip } from 'primereact/chip';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import { getRoutesList } from '../../ApiClient';

export const RoutesList: FC = () => {
    const [routesList, setRoutesList] = useState<any[]>([]);

    useEffect(() => {
        getRoutesList()
            .then(res => {
                return (res as Response).json();
            })
            .then((data) => {
                setRoutesList(data);
            })
          .catch(err => console.warn(err));
          return () => {};
        }, [routesList]);

    return (
        <div className="block border-round-smtext-left py-2 mb-3" style={{ background: 'var(--gray-400)'}}>        
            <div className="flex justify-content-start ml-2">
                <Link to={'/'}><Chip label="Назад" icon="pi pi-chevron-circle-left" /></Link>
            </div>
            <div className="px-2 py-1">
                {(routesList as any[]).length === 0 ? 'Loading..' : routesList.map((x, index) => (
                    <Panel className="mt-3" header={null} key={'panel-'+index}>
                        <div className="text-lg text-white">{(x as any).name}</div>
                        <div>{(x as any).description}</div>
                        <div>Баллов за прохождение: {(x as any).cost}</div>
                        <div className="flex justify-content-end mt-2">
                            <Link to={'/routes/'+(x as any).id}><Chip label="Перейти" icon="pi pi-chevron-circle-right" /></Link>
                        </div>
                    </Panel>
                ))}
            </div>
        </div>
    )
}