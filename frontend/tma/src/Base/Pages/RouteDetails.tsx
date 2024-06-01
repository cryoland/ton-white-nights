import { Chip } from 'primereact/chip';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import { useNavigate } from 'react-router-dom';

export const RouteDetails: FC = () => {
    const currentRouteName = "Отсюда и до фонтана";
    const checkPoints = [
      { 
          name: "Памятник",
          description: "Описание памятника",
          passed: true,
      },
      { 
          name: "Парк",
          description: "Описание парка",
          passed: false,
      },
      { 
          name: "Площадь",
          description: "Описание площади",
          passed: false,
      },
      { 
          name: "Фонтан",
          description: "Описание фонтана",
          passed: false,
      },
    ];

    const navigate = useNavigate();
    return (
        <div className="block border-round-smtext-left py-2 mb-3" style={{ background: 'var(--gray-400)'}}>        
            <div className="flex justify-content-start ml-2">
                <Chip onClick={() => navigate(-1)} label="Назад" icon="pi pi-chevron-circle-left" />
            </div>
            <div className="px-3 py-2">
                <Panel header={<><span className="text-base text-white">Текущий маршрут</span><br /><div className="text-xl text-white mt-1">{currentRouteName}</div></>}>
                    <p className="m-0">
                    Длинное описание маршрута, по которому следуем
                    </p>
                </Panel>

                <Panel className="mt-3" header={<div className="text-xl text-white mt-1">Достопримечательности на маршруте</div>}>
                    {checkPoints.map((x, index) => (
                        <p key={'p-'+index} className='mt-0'>
                            <div className="text-lg text-white">{x.name}</div>
                            <div>{x.description}</div>
                        </p>
                    ))} 
                </Panel>
            </div>
        </div>
    )
}