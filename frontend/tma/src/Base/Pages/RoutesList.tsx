import { Chip } from 'primereact/chip';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Panel } from 'primereact/panel';

export const RoutesList: FC = () => {

    const routesList = [
        { 
            name: "Отсюда и до фонтана",
            description: "Краткое описание",
            id: 1,
            cost: 10,
        },
        { 
            name: "От фонтана до моста",
            description: "Краткое описание",
            passed: false,
            cost: 15,
        },
        { 
            name: "От Петроградки до Можайки",
            description: "Краткое описание",
            passed: false,
            cost: 20,
        },
      ];

    return (
        <div className="block border-round-smtext-left py-2 mb-3" style={{ background: 'var(--gray-400)'}}>        
            <div className="flex justify-content-start ml-2">
                <Link to={'/'}><Chip label="Назад" icon="pi pi-chevron-circle-left" /></Link>
            </div>
            <div className="px-2 py-1">
                {routesList.map((x, index) => (
                    <Panel className="mt-3" header={null} key={'panel-'+index}>
                        <div className="text-lg text-white">{x.name}</div>
                        <div>{x.description}</div>
                        <div>Баллов за прохождение: {x.cost}</div>
                        <div className="flex justify-content-end mt-2">
                            <Link to={'/routes/'+x.id}><Chip label="Перейти" icon="pi pi-chevron-circle-right" /></Link>
                        </div>
                    </Panel>
                ))}
            </div>
        </div>
    )
}