import { Chip } from 'primereact/chip';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import { useNavigate } from 'react-router-dom';

const getRouteDetails = async (routeId: number) => {
    try {
      return await fetch(`https://${import.meta.env.VITE_API_DOMAIN}/routes/${routeId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`
        }
      });
    } catch (err) {
        console.warn(JSON.stringify(err))
    }
}

export const RouteDetails: FC = () => {
    const { routeId } = useParams();
    const [routeDetails, setRouteDetails] = useState<any>(null);

    useEffect(() => {
        getRouteDetails(parseInt(routeId as string))
        .then(res => {
            return (res as Response).json();
        })
        .then((data) => {
            setRouteDetails(data);
        })
          .catch(err => console.warn(err));
          return () => {};
        }, [routeDetails]);

    const navigate = useNavigate();
    return (
        <div className="block border-round-smtext-left py-2 mb-3" style={{ background: 'var(--gray-400)'}}>        
            <div className="flex justify-content-start ml-2">
                <Chip onClick={() => navigate(-1)} label="Назад" icon="pi pi-chevron-circle-left" />
            </div>
            <div className="px-3 py-2">
                <Panel header={<><span className="text-base text-white">Текущий маршрут</span><br /><div className="text-xl text-white mt-1">{!routeDetails ? 'Loading..' : (routeDetails as any).name}</div></>}>
                    <p className="m-0">
                    Длинное описание маршрута, по которому следуем
                    </p>
                </Panel>

                {!!routeDetails && <Panel className="mt-3" header={<div className="text-xl text-white mt-1">Достопримечательности на маршруте</div>}>
                    {((routeDetails as any).checkPoints as any[]).map((x, index) => (
                        <div key={'p-'+index} className='mt-0'>
                            <div className="text-lg text-white">{x.name}</div>
                            <div>{x.description}</div>
                        </div>
                    ))} 
                </Panel>}
            </div>
        </div>
    )
}